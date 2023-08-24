import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

interface Item {
	value: any;
	name: string;
	active: boolean;
	total: number;
}
@Component({
	selector: 'app-dropdown-filter',
	templateUrl: './dropdown-filter.component.html',
	styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit, OnChanges {
	constructor() {}

	dropdownActive = true;
	@Input() title = '';
	@Input() listOptions: Item[] = [];
	@Input() isAirlines = false;
	@Output() clickedOption = new EventEmitter();
	@Output() selectedAirlines = new EventEmitter();
	isShowMoreAirlines = false;
	listOptionsAirlines: Item[] = [];
	countRestAirlines = 0;

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['listOptions'].currentValue.length > 8 && !this.isShowMoreAirlines) {
			this.listOptionsAirlines = this.listOptions.slice(0, 8);
			this.countRestAirlines = this.listOptions.filter((item) => item.total > 0).length - 8;
		} else {
			this.listOptionsAirlines = this.listOptions;
		}
	}
	clickOption(item: Item) {
		item.active = !item.active;
		this.clickedOption.emit(item);
	}

	showMoreOptions() {
		this.isShowMoreAirlines = !this.isShowMoreAirlines;
		this.listOptionsAirlines = this.isShowMoreAirlines ? this.listOptions : this.listOptions.slice(0, 8);
	}

	clickSelectedAirlines(isClean: boolean) {
		const arrayAirlines: string[] = [];
		this.listOptionsAirlines = this.listOptionsAirlines.map((item) => {
			if (item.value !== 'MT' && item.total > 0) {
				item.active = isClean ? false : true;
				if (!isClean) arrayAirlines.push(item.value);
			}
			return item;
		});
		this.selectedAirlines.emit(arrayAirlines);
	}
}
