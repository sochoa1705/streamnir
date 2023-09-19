import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';

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
	constructor(private _searchFiltersService: SearchFiltersService) {
		this._searchFiltersService.isFinishGDS.subscribe({
			next: () => {
			   setTimeout(() => {
				 if(this.showLoader){
					this.showLoader=false;
					this.notFilter = this.listOptions.some(item=>item.total > 0) ? false : true;
					if(this.notFilter) this.hiddenSection.emit();
				 }
			   }, 200);
			}
		});
	}

	dropdownActive = true;
	@Input() title = '';
	@Input() listOptions: Item[]=[];
	@Input() isAirlines = false;
	@Output() clickedOption = new EventEmitter();
	@Output() selectedAirlines = new EventEmitter();
	@Output() hiddenSection = new EventEmitter();
	isShowMoreAirlines = false;
	listOptionsAirlines: Item[] = [];
	countRestAirlines = 0;
	showLoader=true;
	notFilter=false;

	ngOnInit(): void {
		this.listOptions=[];
		this.listOptionsAirlines=[];
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['listOptions'] && !this.isShowMoreAirlines) {
			if(changes['listOptions'].currentValue.length > 8){
				this.listOptionsAirlines = this.listOptions.slice(0, 8);
				this.countRestAirlines = this.listOptions.filter((item) => item.total > 0).length - 8;
				if(this.listOptions.some(item=>item.total > 0)){
					this.showLoader=false;
				}
			}else{
				this.listOptionsAirlines = this.listOptions;
				if(this.listOptions.some(item=>item.total > 0)){
					this.showLoader=false;
				}
			}
		} else {
			this.listOptionsAirlines = this.listOptions;
			if(this.listOptions.some(item=>item.total > 0)){
				this.showLoader=false;
			}
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
		 const listOptionsAirlines= this.listOptions.map((item) => {
			if (item.value !== 'MT' && item.total > 0) {
				item.active = isClean ? false : true;
				if (!isClean) arrayAirlines.push(item.value);
			}
			return item;
		});
		this.listOptions=[...listOptionsAirlines];
		this.listOptionsAirlines = this.isShowMoreAirlines ? listOptionsAirlines : listOptionsAirlines.slice(0, 8);
		this.selectedAirlines.emit(arrayAirlines);
	}
}
