import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Options } from 'ng5-slider';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';

@Component({
	selector: 'app-price-filter',
	templateUrl: './price-filter.component.html',
	styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit, OnChanges {
	constructor(private _searchFiltersService: SearchFiltersService) {
		this._searchFiltersService.isResetFilterPrice.subscribe({
			next: () => {
				this.value = this.minPrice;
				this.options.floor = this.minPrice;
				this.highValue = this.maxPrice;
				this.options.ceil = this.maxPrice;
			}
		});
	}
	@Input() currency = 'USD';
	@Input() minPrice = 0;
	@Input() maxPrice = 0;
	@Output() resetPrice = new EventEmitter();
	@Output() filterPriceRange = new EventEmitter();

	dropdownActive = true;
	value: number = 0;
	highValue: number = 0;
	options: Options = {
		floor: 0,
		ceil: 0,
		step: 10
	};

	ngOnChanges(changes: SimpleChanges) {
		if (changes['minPrice']) {
			this.value = this.minPrice;
			this.options.floor = this.minPrice;
		}

		if (changes['maxPrice']) {
			this.highValue = this.maxPrice;
			this.options.ceil = this.maxPrice;
		}
	}

	ngOnInit(): void {}

	filterPrice($event: any) {
		this.filterPriceRange.emit($event);
	}

	resetFilter() {
		this.value = this.minPrice;
		this.highValue = this.maxPrice;
		this.filterPriceRange.emit({
			value: this.value,
			highValue: this.highValue
		});
	}
}
