import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownFilterComponent } from 'src/app/shared/components/dropdown-filter/dropdown-filter.component';

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

	@Output() changeArrayFilters = new EventEmitter();
	@Output() updateArrayAirlinesFilter = new EventEmitter();
	@Output() changeExchangeRate = new EventEmitter();
	@Output() filterByPrice = new EventEmitter();
	@Output() filterByDuration = new EventEmitter();
	@Output() filterByDurationScale = new EventEmitter();
	@Output() resetFilterByDuration = new EventEmitter();

	formGroup: FormGroup;
	currency = 'USD';

	formObject = {
		currency: new FormControl('0')
	};
	hiddenBaggage = false;

	filtersMobile = [
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

	ngOnInit(): void {}

	clickedOption($event: Item, type: string) {
		switch (type) {
			case 'typeBag':
				this.changeArrayFilters.emit({ key: 'typeBag', item: $event });
				break;
			case 'scales':
				this.changeArrayFilters.emit({ key: $event.value, item: $event });
				break;
			default: //default es filtro aerolineas
				this.changeArrayFilters.emit({ key: 'airlineCodeFilter', item: $event });
				break;
		}
	}

	seletedItemCurrency($event: string) {
		this.currency = $event == 'Soles' ? 'PEN' : 'USD';
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

  openModalFilter(id:number){
    switch (id) {
      case 2:
        this.openModalBaggage()
        break;
      default:
        break;
    }
  }

  openModalBaggage(){
    const modalRef = this._modalService.open(DropdownFilterComponent, {
			centered: true,
			backdrop: 'static',
		});
    console.log(this.dataBagFilter,'seee')
		modalRef.componentInstance.title = 'Equipaje';
    modalRef.componentInstance.listOptions = this.dataBagFilter;
    modalRef.componentInstance.isMobile=true;
    modalRef.componentInstance.clickedOption.subscribe(($event:any) => {
      this.clickedOption($event, 'typeBag');
    });
  }

	get currencyField(): AbstractControl {
		return this.formGroup.get('currency')!;
	}
}
