import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ICardAutocomplete } from '../card-autocomplete/card-autocomplete.interface';
import { IGeoTree } from '../filter-tabs/tab-vuelos/tab-vuelos.interfaces';
import { GlobalComponent } from '../../global';

@Component({
	selector: 'app-input-search-flight',
	templateUrl: './input-search-flight.component.html',
	styleUrls: ['./input-search-flight.component.scss']
})
export class InputSearchFlightComponent implements OnInit {
	private destroyDep$ = new Subject<unknown>();
	private destroyArr$ = new Subject<unknown>();
	@Input() typeFlight = 0;
	@Input() indexRowMulti = 0;
	constructor(private _destinyService: DestinyService) {}

	rotate = false;
	valueSearchDeparture = new FormControl('Lima');
	valueSearchArrival = new FormControl('');

	listResultDep: ICardAutocomplete[] = [];
	listResultRet: ICardAutocomplete[] = [];

	isClickSuggestionDep = false;
	isClickSuggestionArr = false;
	isParamsRet = false;
	isParamsDep = false;

	origin: string | null = 'LIM%20Lima,%20Perú';
	destination: string | null;

	showResultDep = false;
	showResultArr = false;

	showLoaderDep = false;
	showLoaderRet = false;

	notResultDep = false;
	notResultRet = false;

	isReverse = false;

	ngOnInit(): void {
		this.onChangeSearchDep();
		this.onChangeSearchRet();
		if (window.location.href.includes('resultados')) {
			this.setValuesInit();
		}
	}

	setValuesInit() {
		const dataSearch = GlobalComponent.searchData;
		if (dataSearch.flightType !== 2 && this.indexRowMulti == 0) {
			this.isParamsDep = true;
			this.isParamsRet = true;
			if(dataSearch.arrivalLocation!=='' && dataSearch.departureLocation!==''){
				this.valueSearchDeparture.setValue(this.extractCityName(dataSearch.fullDepartureLocation!));
				this.valueSearchArrival.setValue(this.extractCityName(dataSearch.fullArrivalLocation!));
				this.origin = dataSearch.fullDepartureLocation?.replace(/ /g,"%20") || '';
				this.destination = dataSearch.fullArrivalLocation?.replace(/ /g,"%20") || '';
			}else{
				//El link es de kayak
				this.valueSearchDeparture.setValue(dataSearch.fullDepartureLocation!);
				this.valueSearchArrival.setValue(dataSearch.fullArrivalLocation!);
			}			
		}
		if (dataSearch.multicity) {
				this.isParamsDep = true;
				this.isParamsRet = true;
				this.valueSearchDeparture.setValue(
					dataSearch.multicity[this.indexRowMulti].departureLocation.replace(/,\s*$/, '')
				);
				this.valueSearchArrival.setValue(dataSearch.multicity[this.indexRowMulti].arrivalLocation.replace(/,\s*$/, ''));
				this.origin = dataSearch.multicity[this.indexRowMulti].fullDepartureLocation?.replace(/ /g,"%20") || '';
				this.destination = dataSearch.multicity[this.indexRowMulti].fullArrivalLocation?.replace(/ /g,"%20") || '';
		}
	}

	private onChangeSearchDep(): void {
		this.valueSearchDeparture.valueChanges
			.pipe(
				map((search) => search?.toLowerCase().trim()),
				tap((search) => {
					if (search == undefined || search?.length < 3) {
						this.listResultDep = [];
						this.notResultDep = false;
					}
					return search;
				}),
				filter((search) => search !== '' && search !== undefined && search?.length > 2),
				debounceTime(400),
				tap((search) => this.onSearchServiceDep(search)),
				takeUntil(this.destroyDep$)
			)
			.subscribe();
	}

	private onChangeSearchRet(): void {
		this.valueSearchArrival.valueChanges
			.pipe(
				map((search) => search?.toLowerCase().trim()),
				tap((search) => {
					if (search == undefined || search?.length < 3) {
						this.listResultRet = [];
						this.notResultRet = false;
					}
					return search;
				}),
				filter((search) => search !== '' && search !== undefined && search?.length > 2),
				debounceTime(400),
				tap((search) => this.onSearchServiceRet(search)),
				takeUntil(this.destroyArr$)
			)
			.subscribe();
	}

	onSearchServiceDep(word: string) {
		if (!this.isClickSuggestionDep && !this.isReverse) {
			this.listResultDep = [];
			if (!this.isParamsDep || (this.isParamsDep && word.length <= 3)) this.showLoaderDep = true;
			if (this.showLoaderDep) {
				this.origin = null;
				this._destinyService.getGeoTree(word).subscribe({
					next: (res) => {
						this.showLoaderDep = false;
						if (!this.isParamsDep) {
							this.listResultDep = this.formatArrayResult(res);
							this.notResultDep = this.listResultDep.length > 0 ? false : true;
						} else {
							const listResult = this.formatArrayResult(res);
							this.clickItemDep(listResult[0]);
							this.isParamsDep = false;
						}
					}
				});
			} else this.isParamsDep = false;
		} else {
			this.isClickSuggestionDep = false;
		}
	}

	onSearchServiceRet(word: string) {
		if (!this.isClickSuggestionArr && !this.isReverse) {
			this.listResultRet = [];
			if (!this.isParamsRet || (this.isParamsRet && word.length <= 3)) this.showLoaderRet = true;
			if (this.showLoaderRet) {
				this.destination = null;
				this._destinyService.getGeoTree(word).subscribe({
					next: (res) => {
						this.showLoaderRet = false;
						if (!this.isParamsRet) {
							this.listResultRet = this.formatArrayResult(res);
							this.notResultRet = this.listResultRet.length > 0 ? false : true;
						} else {
							const listResult = this.formatArrayResult(res);
							this.clickItemRet(listResult[0]);
							this.isParamsRet = false;
						}
					}
				});
			} else this.isParamsRet = false;
		} else {
			this.isClickSuggestionArr = false;
			this.isReverse = false;
		}
	}

	formatArrayResult(response: IGeoTree[]) {
		const nuevoArray: ICardAutocomplete[] = [];
		response.forEach((x: IGeoTree) => {
			const elementFind = nuevoArray.find((item) => item.id == x.aerocodiata);
			if (!elementFind && x.tn_iata_padre_fn == '0') {
				const obj: ICardAutocomplete = {
					id: x.aerocodiata,
					codigo: x.city_code,
					title: x.city,
					country: x.country,
					children: []
				};
				nuevoArray.push(obj);
			} else if (!elementFind && x.tn_iata_padre_fn == '2') {
				const obj = {
					id: x.aerocodiata,
					country: '',
					codigo: '',
					title: '',
					children: [
						{
							id: x.aerocodiata,
							codigo: x.city_code,
							title: x.city,
							country: x.country,
							children: []
						}
					]
				};
				nuevoArray.push(obj);
			} else if (elementFind && x.tn_iata_padre_fn == '2')
				elementFind.children.push({
					id: x.aerocodiata,
					codigo: x.city_code,
					title: x.city,
					country: x.country,
					children: []
				});
		});
		return nuevoArray;
	}

	reverseInputs() {
		if (this.origin && this.destination) {
			this.isReverse = true;
			this.rotate = !this.rotate;
			const valueSearchDeparture = this.valueSearchDeparture.value;
			const valueSearchArrival = this.valueSearchArrival.value;
			const origin = this.origin;
			const destination = this.destination;

			this.valueSearchDeparture.setValue(valueSearchArrival);
			this.valueSearchArrival.setValue(valueSearchDeparture);

			this.origin = destination;
			this.destination = origin;
		}
	}

	resetInput() {
		this.valueSearchDeparture.setValue('');
		this.origin = null;
		this.notResultDep = false;
	}

	resetInput2() {
		this.valueSearchArrival.setValue('');
		this.destination = null;
		this.notResultRet = false;
	}

	clickItemDep(item: ICardAutocomplete) {
		this.isClickSuggestionDep = true;
		this.valueSearchDeparture.setValue(item.title);
		this.listResultDep = [];
		this.destroyDep$;
		this.origin = `${item.codigo}%20${item.title},%20${item.country}`;
	}

	clickItemRet(item: ICardAutocomplete) {
		this.isClickSuggestionArr = true;
		this.valueSearchArrival.setValue(item.title);
		this.listResultRet = [];
		this.destroyArr$;
		this.destination = `${item.codigo}%20${item.title},%20${item.country}`;
	}

	getValues() {
		return {
			departureLocation: this.origin,
			arrivalLocation: this.destination
		};
	}

	@ViewChild('inputOrigin') inputOrigin: ElementRef;
	@ViewChild('inputDestiny') inputDestiny: ElementRef;
	@HostListener('document:click', ['$event'])
	blurRange(event: MouseEvent) {
		if (
			this.inputOrigin &&
			!this.inputOrigin.nativeElement.contains(event.target) &&
			(this.listResultDep.length > 0 || this.notResultDep)
		) {
			this.resetInput();
		}

		if (
			this.inputDestiny &&
			!this.inputDestiny.nativeElement.contains(event.target) &&
			(this.listResultRet.length > 0 || this.notResultRet)
		) {
			this.resetInput2();
		}
	}

	private extractCityName(inputString: string) {
		let parts = inputString.split(',');
		parts = parts[0].split(' ');

		// slice first part ex: LIM, LBP
		if (parts.length) parts = parts.slice(1, parts.length);
		console.log(parts);

		const cityName = parts.join(' ').trim();
		console.log('cityName', cityName);
    const capitalizedCityName = cityName.replace(/\b\w/g, char => char.toUpperCase());

    return capitalizedCityName;
}
}
