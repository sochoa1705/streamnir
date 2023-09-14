import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Options } from 'ng5-slider';
import { GlobalComponent } from '../../global';

interface IFilterDuration{
	minDurationDeparture:number,
	maxDurationDeparture:number,
	minDurationReturn:number,
	maxDurationReturn:number
}

@Component({
  selector: 'app-duration-filter',
  templateUrl: './duration-filter.component.html',
  styleUrls: ['./duration-filter.component.scss']
})
export class DurationFilterComponent implements OnInit, OnChanges {

  @Input() valuesFilterDuration:IFilterDuration;
  flightType=0;
  codesFlight:string[]=[];

  constructor() { }
  
  dropdownActive=true;

  valueDurationDep: number = 0;
	highValueDurationDep: number = 100;

  valueDurationRet: number = 0;
	highValueDurationRet: number = 100;

  valueScale: number = 0;
	highValueScale: number = 100;

	optionsDurationDep: Options = {
		floor: 0,
		ceil: 100,
		step: 10
	};

  optionsDurationRet: Options = {
		floor: 0,
		ceil: 100,
		step: 10
	};

  optionsScale: Options = {
		floor: 0,
		ceil: 100,
		step: 10
	};

  isFilterDeparture=true;
  
  ngOnChanges(changes: SimpleChanges) {
		if (changes['valuesFilterDuration']) {
			this.valueDurationDep = this.valuesFilterDuration.minDurationDeparture;
			this.optionsDurationDep.floor = this.valuesFilterDuration.minDurationDeparture;
      this.highValueDurationDep = this.valuesFilterDuration.maxDurationDeparture;
      this.optionsDurationDep.ceil = this.valuesFilterDuration.maxDurationDeparture;

      this.valueDurationRet = this.valuesFilterDuration.minDurationReturn;
			this.optionsDurationRet.floor = this.valuesFilterDuration.minDurationReturn;
      this.highValueDurationRet = this.valuesFilterDuration.maxDurationReturn;
      this.optionsDurationRet.ceil = this.valuesFilterDuration.maxDurationReturn;
		}
	}

  ngOnInit(): void {
    const paramsSearch=GlobalComponent.paramsSearch;
    this.flightType=paramsSearch.flightType;
    if(this.flightType !== 2) this.codesFlight.push(paramsSearch.departureLocation,paramsSearch.arrivalLocation)
			else this.codesFlight.push(paramsSearch.multicity[0].departureLocation)
  }
  

  resetFilter(){

  }

  filterDuration($event:any){

  }

  filterScale($event:any){

  }

  changeFilterDuration(){
    this.isFilterDeparture=!this.isFilterDeparture;
  }

}
