import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Options } from 'ng5-slider';
import { GlobalComponent } from '../../global';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';

interface IFilterDuration{
	minDurationDeparture:number,
	maxDurationDeparture:number,
	minDurationReturn:number,
	maxDurationReturn:number,
  waitingTimeDep:number,
	waitingTimeRet:number,
  minWaitingTimeDep:number,
	minWaitingTimeRet:number,
}

@Component({
  selector: 'app-duration-filter',
  templateUrl: './duration-filter.component.html',
  styleUrls: ['./duration-filter.component.scss']
})
export class DurationFilterComponent implements OnInit, OnChanges {

  @Input() valuesFilterDuration:IFilterDuration;
  @Output() filterDurationRange = new EventEmitter();
  @Output() filterDurationScale = new EventEmitter();
  @Output() resetFilterDuration  = new EventEmitter();
  flightType=0;
  codesFlight:string[]=[];

  constructor(private _searchFiltersService: SearchFiltersService){
		this._searchFiltersService.isResetFilterDuration.subscribe({
			next: () => {
        this.valueDurationDep = this.valuesFilterDuration.minDurationDeparture;
        this.optionsDurationDep.floor = this.valuesFilterDuration.minDurationDeparture;
        this.highValueDurationDep = this.valuesFilterDuration.maxDurationDeparture;
        this.optionsDurationDep.ceil = this.valuesFilterDuration.maxDurationDeparture;
  
        this.valueDurationRet = this.valuesFilterDuration.minDurationReturn;
        this.optionsDurationRet.floor = this.valuesFilterDuration.minDurationReturn;
        this.highValueDurationRet = this.valuesFilterDuration.maxDurationReturn;
        this.optionsDurationRet.ceil = this.valuesFilterDuration.maxDurationReturn;

        this.highValueScaleDep = this.valuesFilterDuration.waitingTimeDep;
        this.highValueScaleRet = this.valuesFilterDuration.waitingTimeRet;
        this.valueScaleDep=0;
        this.valueScaleRet=0;
        this.optionsScaleDep.floor = 0;
        this.optionsScaleRet.floor = 0;
        this.optionsScaleDep.ceil = this.valuesFilterDuration.waitingTimeDep;
        this.optionsScaleRet.ceil = this.valuesFilterDuration.waitingTimeRet;
			}
		});
	}
  
  dropdownActive=true;

  valueDurationDep: number = 0;
	highValueDurationDep: number = 100;

  valueDurationRet: number = 0;
	highValueDurationRet: number = 100;

  valueScaleDep: number = 0;
	highValueScaleDep: number = 100;

  valueScaleRet: number = 0;
	highValueScaleRet: number = 100;

	optionsDurationDep: Options = {
		floor: 0,
		ceil: 100,
		step: 60
	};

  optionsDurationRet: Options = {
		floor: 0,
		ceil: 100,
		step: 60
	};

  optionsScaleDep: Options = {
		floor: 0,
		ceil: 100,
		step: 60
	};

  optionsScaleRet: Options = {
		floor: 0,
		ceil: 100,
		step: 60
	};

  isFilterDeparture=true;

  
  ngOnChanges(changes: SimpleChanges) {
		if (changes['valuesFilterDuration'].currentValue) {
      this.valueDurationDep = this.valuesFilterDuration.minDurationDeparture;
      this.optionsDurationDep.floor = this.valuesFilterDuration.minDurationDeparture;
      this.highValueDurationDep = this.valuesFilterDuration.maxDurationDeparture;
      this.optionsDurationDep.ceil = this.valuesFilterDuration.maxDurationDeparture;
      this.optionsDurationDep.step=this.highValueDurationDep <= 120 ? 10:60; 

      this.valueDurationRet = this.valuesFilterDuration.minDurationReturn;
      this.optionsDurationRet.floor = this.valuesFilterDuration.minDurationReturn;
      this.highValueDurationRet = this.valuesFilterDuration.maxDurationReturn;
      this.optionsDurationRet.ceil = this.valuesFilterDuration.maxDurationReturn;
      this.optionsDurationRet.step=this.highValueDurationRet <= 120 ? 10:60; 

      this.highValueScaleDep = this.valuesFilterDuration.waitingTimeDep;
      this.highValueScaleRet = this.valuesFilterDuration.waitingTimeRet;
      this.optionsScaleDep.ceil = this.valuesFilterDuration.waitingTimeDep;
      this.optionsScaleRet.ceil = this.valuesFilterDuration.waitingTimeRet;

      this.optionsScaleDep.step=this.highValueScaleDep <= 120 ? 10:60; 
      this.optionsScaleRet.step=this.highValueScaleRet <= 120 ? 10:60; 


      this.valueScaleDep=0;
      this.valueScaleRet=0;
      this.optionsScaleDep.floor = 0;
      this.optionsScaleRet.floor = 0;
      
      const paramsSearch={...GlobalComponent.paramsSearch};
      if(Object.keys(paramsSearch).length !== 0){
        this.flightType=paramsSearch.flightType;
        if(this.flightType !== 2) this.codesFlight.push(paramsSearch.arrivalLocation,paramsSearch.departureLocation)
          else this.codesFlight.push(paramsSearch.multicity[0].arrivalLocation)
      }
		}
	}

  ngOnInit(): void {
  }
  

  resetFilter() {
      this.resetFilterDuration.emit();
	}



  filterDuration($event:any,isDeparture:boolean){
     this.filterDurationRange.emit({...$event,isDeparture});
  }

  filterScale($event:any,isDeparture:boolean){
     this.filterDurationScale.emit({...$event,isDeparture})
  }

  changeFilterDuration(){
    this.isFilterDeparture=!this.isFilterDeparture;
  }

}
