import { Component, EventEmitter, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Options } from 'ng5-slider';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';


@Component({
	selector: 'app-price-filter',
	templateUrl: './price-filter.component.html',
	styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent implements OnInit, OnChanges{
	constructor(private _searchFiltersService: SearchFiltersService, @Optional() private _activeModal?: NgbActiveModal) {
		this._searchFiltersService.isResetFilterPrice.subscribe({
			next: () => {
				this.value = this.minPrice;
				this.options.floor = this.minPrice;
				this.highValue = this.maxPrice;
				this.options.ceil = this.maxPrice;
			}
		});

		this._searchFiltersService.isSetValuesPrices.subscribe({
			next: (res:any) => {
				this.hidden=true;
				this.value = res.minPrice;
				this.options.floor = res.minPrice;
				this.highValue = res.maxPrice;
				this.options.ceil = res.maxPrice;
				setTimeout(() => {
					this.hidden=false;
				}, 10);
			}
		})

		this._searchFiltersService.isLoader.subscribe({
			next: () => {
				this.value = 0;
				this.highValue = 0;
			}
		});
	}
	
	@Input() currency = 'USD';
	@Input() minPrice = 0;
	@Input() maxPrice = 0;
	@Input() currentMinPrice = 0;
	@Input() currentMaxPrice = 0;
	@Output() resetPrice = new EventEmitter();
	@Output() filterPriceRange = new EventEmitter();
	@Input() isMobile=false;

	dropdownActive = true;
	value: number = 0;
	highValue: number = 0;
	hidden=false;
	showLoader=false;
	options: Options = {
		floor: 0,
		ceil: 0,
		step: 10,
		enforceRange:false,
		enforceStep:false
	};

	ngOnChanges(changes: SimpleChanges) {
		if (changes['minPrice']) {
			this.options.floor = this.minPrice;
			this.value = this.minPrice;
		}

		if (changes['maxPrice']) {
			this.options.ceil =  this.maxPrice;
			this.highValue = this.maxPrice;
		}
	}

	ngOnInit(): void {
		if(this.isMobile) {
			this.showLoader=false;
			this.options.floor = this.minPrice;
			this.options.ceil =  this.maxPrice;
			this.value = this.currentMinPrice;
			this.highValue = this.currentMaxPrice;
		}
	}

	filterPrice($event: any) {
		if(!this.isMobile)
		this.filterPriceRange.emit($event);
	}

	applyFilterMobile(){
		this.filterPriceRange.emit({
			highValue:this.highValue,
			value: this.value
		})
		this.clickCloseModal();
	}

	resetFilter() {
		this.value = this.minPrice;
		this.highValue = this.maxPrice;
		this.filterPriceRange.emit({
			value: this.value,
			highValue: this.highValue
		});
	}

	clickCloseModal(){
		if (this._activeModal) {
			this._activeModal.close();
		}
	}
}