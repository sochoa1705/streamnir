import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Airline, Group, ISearchResponse } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { TokenService } from 'src/app/api/api-nmviajes/services/token.service';
import { GlobalComponent } from 'src/app/shared/global';
import { getParams } from 'src/app/shared/utils/getParams';
import { environment } from 'src/environments/environment';
import { dataAirlineMulti, dataBagFilterInit, dataScaleFilterInit } from './utils';

interface Item {
	value: any;
	name: string;
	active: boolean;
	total: number;
}

interface Filter{
	arrayAirline:string[],
	arrayBaggage:string[],
	arrayScales:string[]
}
@Component({
	selector: 'app-results-search-page',
	templateUrl: './results-search-page.component.html',
	styleUrls: ['./results-search-page.component.scss']
})
export class ResultsSearchPageComponent implements OnInit {
	constructor(
		private _searchService: SearchService,
		private _tokenService: TokenService,
		private route: ActivatedRoute
	) {}

	allDataGroups: Group[] = [];
	dataGroupsPaginate: Group[] = [];
	indexPaginate = 8;
	indexTabSelect = 0;
	selectedOptionFilter = -1;
	dataBagFilter: Item[] = [];
	dataScaleFilter: Item[] = [];
	dataAirlines: Item[] = [];
	totalResults = 0;
	filters:Filter[]=[];

	ngOnInit() {
		this.getToken();
	}

	showMoreResults() {
		this.dataGroupsPaginate = this.dataGroupsPaginate.concat(
			this.allDataGroups.slice(this.dataGroupsPaginate.length, this.indexPaginate)
		);
		this.indexPaginate = this.indexPaginate + 8;
	}

	getToken() {
		this._tokenService.getAndSaveToken('Chrome').subscribe({
			next: (response) => {
				GlobalComponent.tokenMotorVuelo = response.accessToken;
				GlobalComponent.appReglasVentaAnticipada = response.reglasVentaAnticipada;
				GlobalComponent.appConfigurations = response.configuraciones;
				this.getObjectParams();
			}
		});
	}

	getObjectParams() {
		this.route.queryParamMap.subscribe((params) => {
			const objParams = getParams(params);
			if (environment.urlApiMotorVuelos.includes('qa')) this.getAllDataSearch(objParams);
			else this.getAllDataAnterior(objParams);
		});
	}

	getAllDataSearch(objSearch: any) {
		const timeStamp = new Date().getTime();
		const searchId = timeStamp + ('' + Math.random()).substring(2, 8);
		this._searchService.getAllDataSearch(objSearch, searchId.toString()).subscribe({
			next: (res) => {
				//agregar contador referente a los GDS, si no hay nada cuando se llego a los GDS, LoaderService Contador
				if (res.groups) {
					this.allDataGroups = this.allDataGroups.concat(res.groups);
					this.allDataGroups.sort((a, b) => a.pricingInfo.totalFare - b.pricingInfo.totalFare);
					this.allDataGroups.forEach((item, index) => {
						item.sequenceNumber = index;
					});
					console.log(this.allDataGroups, 'order');
					this.dataGroupsPaginate = this.allDataGroups.slice(0, 8);
				}
				if (!GlobalComponent.appExchangeRate) GlobalComponent.appExchangeRate = res.exchangeRate;
				GlobalComponent.appResponseGroups = this.allDataGroups;
			},
			error: (err) => {
				console.log(err);
			}
		});
	}

	getAllDataAnterior(objSearch: any) {
		this._searchService.getAllDataGroups(objSearch).subscribe({
			next: (res) => {
				this.allDataGroups = res.groups.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
				this.dataGroupsPaginate = this.allDataGroups.slice(0, 8);
				this.totalResults = this.allDataGroups.length;
				this.getDataFilters(res);
			},
			error: (err) => {
				console.log(err, 'err');
			}
		});
	}

	getDataFilters(res: ISearchResponse) {
		const dataAirlines = res.airlinesFilter.map((item) => {
			return {
				value: item.code,
				name: item.name,
				active: false,
				total: 0
			};
		});

		dataAirlines.push(dataAirlineMulti);
		const dataBagFilter = dataBagFilterInit;
		const dataScaleFilter = dataScaleFilterInit;

		res.groups.forEach((item) => {
			if(item.airline.code=='MT') dataAirlines[dataAirlines.length-1].total++;
			
			const codeMarketing=item.departure[0].segments[0].flightSegments[0].marketingAirline.code;
			const isAllCodeMarketing = item.departure.every((departure)=>departure.segments[0].flightSegments[0].marketingAirline.code==codeMarketing) && (item.returns ? item.returns.segments[0].flightSegments[0].marketingAirline.code==codeMarketing : true)
			
			if(isAllCodeMarketing){
				const indexAirline = dataAirlines.findIndex((obj) => {
					return obj.value === codeMarketing;
				});
				if (indexAirline !== -1) dataAirlines[indexAirline].total++;
			}
			
			item.airlineCodeFilter=isAllCodeMarketing ? codeMarketing : 'MT';

			const isBagHold =
				item.departure.every((departure) => departure.segments[0].equipaje.piezas > 0) &&
				(item.returns ? item.returns.segments[0].equipaje.piezas > 0 : true);
			const isBagHand =
				item.departure.every((departure) => departure.segments[0].equipaje.cabina || false) &&
				(item.returns ? item.returns.segments[0].equipaje.cabina || false : true) &&
				!isBagHold;

			item.typeBag = isBagHold ? 'holdbag' : isBagHand ? 'handbag' : 'backpack';
			if (isBagHand) dataBagFilter[0].total++;
			if (isBagHold) dataBagFilter[1].total++;

			item.isDirect =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops == 0)) &&
				(item.returns ? item.returns.segments.some((segment) => segment.stops == 0) : true);
			item.isOneScale =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops == 1)) ||
				(item.returns ? item.returns.segments.some((segment) => segment.stops == 1) : true);
			item.isMultiScale =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops >= 2)) ||
				(item.returns ? item.returns.segments.some((segment) => segment.stops >= 2) : true);

			if (item.isDirect) dataScaleFilter[0].total++;
			if (item.isOneScale) dataScaleFilter[1].total++;
			if (item.isMultiScale) dataScaleFilter[2].total++;
		});
		this.dataAirlines=dataAirlines;
		this.dataBagFilter=dataBagFilter;
		this.dataScaleFilter=dataScaleFilter;
	}

	changeArrayFilters($event:any){
		/*const item = $event.item;
		const key = $event.key.split('.')[0];
		if(item.active){
			
		}else{
			
		}*/
	}

	applyFilters(){
		//repaginacion y repintar results 
	}
}
