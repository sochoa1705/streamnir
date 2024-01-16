import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownFilterComponent } from 'src/app/shared/components/dropdown-filter/dropdown-filter.component';
import { GlobalComponent } from 'src/app/shared/global';
import { ModalCurrencyComponent } from '../modal-currency/modal-currency.component';
import { PriceFilterComponent } from 'src/app/shared/components/price-filter/price-filter.component';
import { DurationFilterComponent } from 'src/app/shared/components/duration-filter/duration-filter.component';
import { ModalSortComponent } from '../modal-sort/modal-sort.component';

interface Item {
	value: any;
	name: string;
	active: boolean;
	total: number;
}

interface IFilterDuration {
	minDurationDeparture: number;
	maxDurationDeparture: number;
	minDurationReturn: number;
	maxDurationReturn: number;
	waitingTimeDep: number;
	waitingTimeRet: number;
	minWaitingTimeDep: number;
	minWaitingTimeRet: number;
}

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
	@Input() dataAirlines: Item[] = [];
	@Input() dataScaleFilter: Item[] = [];
	@Input() dataBagFilter: Item[] = [];
	@Input() totalResults: number;
	@Input() totalResultsFilter: number;
	@Input() exchangeRate: number | null;
	@Input() isNotResult = false;
	@Input() valuesFilterDuration: IFilterDuration;
	@Input() minPrice = 0;
	@Input() maxPrice = 0;
	@Input() theCheapest: any;
	@Input() betterOption: any;
	@Input() shorterDuration: any;
	@Input() indexSortBy = 0;
	@Input() currentFilters: any;
	@Input() valuesFilterDurationInit:IFilterDuration;

	@Output() changeArrayFilters = new EventEmitter();
	@Output() updateArrayAirlinesFilter = new EventEmitter();
	@Output() changeExchangeRate = new EventEmitter();
	@Output() filterByPrice = new EventEmitter();
	@Output() filterByDuration = new EventEmitter();
	@Output() filterByDurationScale = new EventEmitter();
	@Output() resetFilterByDuration = new EventEmitter();
	@Output() changeArrayFiltersMobile = new EventEmitter();
	@Output() clickTabSort = new EventEmitter();
	@Output() filterDurationMobile = new EventEmitter();

	formGroup: FormGroup;
	currency = 'USD';

	formObject = {
		currency: new FormControl('0')
	};
	hiddenBaggage = false;

	filtersMobile = [
		{
			id: 0,
			name: 'Precio más bajo'
		},
		{
			id: 1,
			name: 'Moneda'
		},
		{
			id: 2,
			name: 'Equipaje'
		},
		{
			id: 3,
			name: 'Escalas'
		},
		{
			id: 4,
			name: 'Aerolíneas'
		},
		{
			id: 5,
			name: 'Precio'
		},
		{
			id: 6,
			name: 'Duración'
		}
	];

	constructor(private _modalService: NgbModal) {
		this.formGroup = new FormGroup(this.formObject);
	}

	ngOnInit(): void {
		this.updateStepName();
	}

	clickedOption($event: Item, type: string) {
		switch (type) {
			case 'typeBag':
				this.changeArrayFilters.emit({ key: 'typeBag', item: $event });
				break;
			case 'scales':
				this.changeArrayFilters.emit({ key: 'scale', item: $event });
				break;
			default: //default es filtro aerolineas
				this.changeArrayFilters.emit({ key: 'airlineCodeFilter', item: $event });
				break;
		}
	}

	selectedItemCurrency($event: any) {
		this.currency = $event == 'Soles' ? 'PEN' : 'USD';
		GlobalComponent.currency = this.currency;
		this.changeExchangeRate.emit($event);
	}

	selectedAirlines($event: string[]) {
		this.updateArrayAirlinesFilter.emit($event);
	}

	filterPriceRange($event: any) {
		this.filterByPrice.emit($event);
	}

	filterDurationRange($event: any) {
		this.filterByDuration.emit($event);
	}

	filterDurationScale($event: any) {
		this.filterByDurationScale.emit($event);
	}

	resetFilterDuration() {
		this.resetFilterByDuration.emit();
	}

	openModalFilter(id: number) {
		if (this.minPrice !== 0) {
			switch (id) {
				case 0:
					this.openModalSortBy();
					break;
				case 1:
					this.openModalCurrency();
					break;
				case 2:
					this.openModalBaggage();
					break;
				case 3:
					this.openModalScale();
					break;
				case 4:
					this.openModalAirline();
					break;
				case 5:
					this.openModalPrice();
					break;
				default:
					this.openModalDuration();
					break;
			}
		}
	}

	openModalCurrency() {
		const modalRef = this._modalService.open(ModalCurrencyComponent, {
			centered: true,
			backdrop: 'static',
		});
		modalRef.componentInstance.currencySelected = this.currency;
		modalRef.componentInstance.changeCurrency.subscribe(($event: any) => {
			this.selectedItemCurrency($event);
		});
	}

	openModalBaggage() {
		const modalRef = this._modalService.open(DropdownFilterComponent, {
			centered: true,
			backdrop: 'static',
		});
		modalRef.componentInstance.title = 'Equipaje';
		modalRef.componentInstance.listOptions = this.dataBagFilter;
		modalRef.componentInstance.isMobile = true;
		modalRef.componentInstance.clickedOption.subscribe(($event: any) => {
			this.changeArrayFiltersMobile.emit({ key: 'typeBag', item: $event });
		});
	}

	openModalScale() {
		const modalRef = this._modalService.open(DropdownFilterComponent, {
			centered: true,
			backdrop: 'static',
		});
		modalRef.componentInstance.title = 'Escalas';
		modalRef.componentInstance.listOptions = this.dataScaleFilter;
		modalRef.componentInstance.isMobile = true;
		modalRef.componentInstance.clickedOption.subscribe(($event: any) => {
			this.changeArrayFiltersMobile.emit({ key: 'scale', item: $event });
		});
	}

	openModalAirline() {
		const modalRef = this._modalService.open(DropdownFilterComponent, {
			centered: true,
			backdrop: 'static',
		});
		modalRef.componentInstance.title = 'Aerolínea';
		modalRef.componentInstance.listOptions = this.dataAirlines;
		modalRef.componentInstance.isMobile = true;
		modalRef.componentInstance.clickedOption.subscribe(($event: any) => {
			this.changeArrayFiltersMobile.emit({ key: 'airlineCodeFilter', item: $event });
		});
	}

	openModalPrice() {
		const modalRef = this._modalService.open(PriceFilterComponent, {
			centered: true,
			backdrop: 'static',
		});
		modalRef.componentInstance.isMobile = true;
		modalRef.componentInstance.currency = this.currency;
		modalRef.componentInstance.minPrice = this.minPrice;
		modalRef.componentInstance.maxPrice = this.maxPrice;
		modalRef.componentInstance.currentMinPrice = this.currentFilters.minPrice;
		modalRef.componentInstance.currentMaxPrice = this.currentFilters.maxPrice;
		modalRef.componentInstance.filterPriceRange.subscribe(($event: any) => {
			this.filterByPrice.emit($event);
		});
	}

	openModalDuration() {
		const modalRef = this._modalService.open(DurationFilterComponent, {
			centered: true,
			backdrop: 'static',
		});
		modalRef.componentInstance.isMobile = true;
		modalRef.componentInstance.valuesFilterDuration = this.valuesFilterDuration;
		modalRef.componentInstance.valuesFilterDurationInit = this.valuesFilterDurationInit;
		modalRef.componentInstance.filterDurationMobile.subscribe(($event: any) => {
			this.filterDurationMobile.emit($event);
		});
	}

	openModalSortBy() {
		const modalRef = this._modalService.open(ModalSortComponent, {
			centered: true,
			backdrop: 'static',
		});
		modalRef.componentInstance.theCheapest = this.theCheapest;
		modalRef.componentInstance.betterOption = this.betterOption;
		modalRef.componentInstance.shorterDuration = this.shorterDuration;
		modalRef.componentInstance.currency = this.currency;
		modalRef.componentInstance.currentIndexTab = this.indexSortBy;
		modalRef.componentInstance.clickTabSort.subscribe(($event: number) => {
			this.filtersMobile[0].name = $event == 0 ? 'Precio más bajo' : $event == 1 ? 'Mejor Opción' : 'Más rápido';
			this.clickTabSort.emit($event);
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.updateStepName();
	}

	private updateStepName() {
		if (window.innerWidth < 575) this.filtersMobile[1].name = '$';
		else this.filtersMobile[1].name = 'Moneda';
	}

	get currencyField(): AbstractControl {
		return this.formGroup.get('currency')!;
	}
}
