import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { InputPassengersComponent } from '../input-passengers/input-passengers.component';
import { InputClassComponent } from '../input-class/input-class.component';
import { InputSearchFlightComponent } from '../input-search-flight/input-search-flight.component';
import { InputRangeComponent } from '../input-range/input-range.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';
import { Params } from 'src/app/api/api-nmviajes/models/ce-metasearch';

export interface Search {
	arrivalLocation: string | null;
	departureLocation: string | null;
	arrivalDate?: string;
	departureDate?: string;
}

@Component({
	selector: 'app-multivuelo',
	templateUrl: './multivuelo.component.html',
	styleUrls: ['./multivuelo.component.scss']
})
export class MultivueloComponent implements OnInit, OnChanges {
	now = new Date();
	minDateDefault: NgbDateStruct = {
		year: this.now.getFullYear(),
		month: this.now.getMonth() + 1,
		day: this.now.getDate()
	};
	arrayMulti = [{ index: 0, minDate: this.minDateDefault }];
	indexCounter = 0;
	@Input() params:Params;

	constructor(private _searchFiltersService: SearchFiltersService) {
	}

	@ViewChildren(InputSearchFlightComponent) inputsComponent: QueryList<InputSearchFlightComponent>;
	@ViewChildren(InputRangeComponent) datesComponent: QueryList<InputRangeComponent>;
	@Output() searchDataMulti = new EventEmitter();
	
	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes.params && changes.params.currentValue){
			if (this.params.multicity) {
				this.arrayMulti=[];
				for (let index = 0; index < this.params.multicity.length; index++) {
					const date=this.params.multicity[index == 0 ? 0 : index - 1].departureDate.split('-');
					this.arrayMulti.push({
						index,
						minDate: index==0 ? this.minDateDefault : {year:Number(date[0]), month:Number(date[1]), day:Number(date[2])}
					})
				}
				setTimeout(() => {
					this._searchFiltersService.isSetParamsMulti.emit(this.params);
				}, 100);
			}
		}
	}

	searchMulti() {
		const arrayData: Search[] = [];
		this.inputsComponent.forEach((component) => {
			arrayData.push(component.getValues());
		});
		this.datesComponent.forEach((component, index) => {
			arrayData[index] = { ...arrayData[index], ...component.getValues() };
		});
		return this.searchDataMulti.emit(arrayData);
	}

	addMulti() {
		const childrenArray = this.datesComponent.toArray();
		this.indexCounter++;
		if (childrenArray.length > 0) {
			console.log(childrenArray.length)
			const lastDate = childrenArray[childrenArray.length - 1].getValues().departureDate;
			this.arrayMulti.push({
				index: this.indexCounter,
				minDate: lastDate == '' ? this.minDateDefault : this.convertMinDate(lastDate)
			});
		}
	}

	convertMinDate(date: string): NgbDateStruct {
		const split = date.split('/');
		return { year: Number(split[2]), month: Number(split[1]), day: Number(split[0]) };
	}

	deleteRow(index: number) {
		let prevComponent: InputRangeComponent | null = null;
		this.arrayMulti = this.arrayMulti.filter((item) => item.index !== index);
		const format = 'DD/MM/YYYY';
		this.datesComponent.forEach((component, index) => {
			if (index > 0) {
				const prevMinDate = prevComponent?.idRowMulti;
				const currentMinDate = component.idRowMulti;

				const prevValue = this.arrayMulti[prevMinDate || 0].minDate;
				const currentValue = this.arrayMulti[currentMinDate].minDate;

				const prevMoment = moment({ year: prevValue.year, month: prevValue.month - 1, day: prevValue.day });
				const currentMoment = moment({ year: currentValue.year, month: currentValue.month - 1, day: currentValue.day });

				if (currentMoment.diff(prevMoment, 'days') > 1 && prevComponent) {
					const prevDate = prevComponent?.getValues().departureDate;
					this.arrayMulti[component.idRowMulti].minDate = this.convertMinDate(prevDate);
				}
			} else {
				this.arrayMulti[0].minDate = this.minDateDefault;
			}
			prevComponent = component;
		});
	}
}
