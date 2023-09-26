import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dataFiltersInit } from '../utils';
import { Router } from '@angular/router';
interface Filter {
	arrayAirline: string[];
	arrayBaggage: string[];
	arrayScales: string[];
	minPrice: number;
	maxPrice: number;
	isMultiticket: boolean;
	isPrices: boolean;
	isDurationDeparture: boolean;
	isDurationReturn: boolean;
}
@Component({
	selector: 'app-not-results',
	templateUrl: './not-results.component.html',
	styleUrls: ['./not-results.component.scss']
})
export class NotResultsComponent implements OnInit {
	constructor(private router: Router) {}
	@Input() title = 'Se produjo un error.';
	@Input() subtitle = 'Intenta buscar de nuevo más tarde.';
	@Input() type = 'error'; //not-result //not-result-filter
	@Input() filters: Filter;
	@Output() cleanFilters = new EventEmitter();
	ngOnInit(): void {}

	resetFilters(indexFilter: string) {
		let currentFilters = this.filters;
		switch (indexFilter) {
			case '0':
				currentFilters.arrayBaggage = [];
				break;
			case '1':
				currentFilters.arrayScales = [];
				break;
			case '2': {
				currentFilters.arrayAirline = [];
				currentFilters.isMultiticket = false;
				break;
			}
			case '3':
				currentFilters.isPrices = false;
				break;
			case '4': {
				currentFilters.isDurationDeparture = false;
				currentFilters.isDurationReturn = false;
				break;
			}
			default: {
				console.log('defaulttt')
				currentFilters = {
					arrayAirline: [],
					arrayBaggage: [],
					arrayScales: [],
					minPrice: 0,
					maxPrice: 0,
					isMultiticket: false,
					isPrices: false,
					isDurationDeparture: false,
					isDurationReturn: false
				};
				break;
			}
		}
		this.cleanFilters.emit(currentFilters);
	}
}
