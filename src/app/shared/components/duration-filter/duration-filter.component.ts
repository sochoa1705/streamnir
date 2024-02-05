import { Component, EventEmitter, Input, OnInit, Optional, Output} from '@angular/core';
import { Options } from 'ng5-slider';
import { GlobalComponent } from '../../global';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  styleUrls: ['./duration-filter.component.scss'],
})
export class DurationFilterComponent implements OnInit{

  @Input() valuesFilterDuration:IFilterDuration;
  @Input() valuesFilterDurationInit:IFilterDuration;
  @Input() isMobile: boolean = false;
  @Output() filterDurationRange = new EventEmitter();
  @Output() filterDurationScale = new EventEmitter();
  @Output() resetFilterDuration  = new EventEmitter();
  @Output() filterDurationMobile = new EventEmitter();

  flightType=0;
  codesFlight:string[]=[];
  hidden=false;

  constructor(private _searchFiltersService: SearchFiltersService, @Optional() private _activeModal?: NgbActiveModal) {
		this._searchFiltersService.isResetFilterDuration.subscribe({
			next: () => {
        this.setValuesReset();
			}
		});
    this._searchFiltersService.isSetValuesDuration.subscribe({
      next: (res: any) => {
        this.hidden = true;
        this.setValues(res);
      }
    })

    this._searchFiltersService.isLoader.subscribe({
			next: () => {
				 this.valueDurationDep=0;
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
		step: 60,
    enforceRange:false,
		enforceStep:false
	};

  optionsDurationRet: Options = {
		floor: 0,
		ceil: 100,
		step: 60,
    enforceRange:false,
		enforceStep:false
	};

  optionsScaleDep: Options = {
		floor: 0,
		ceil: 100,
		step: 60,
    enforceRange:false,
		enforceStep:false
	};

  optionsScaleRet: Options = {
		floor: 0,
		ceil: 100,
		step: 60,
    enforceRange:false,
		enforceStep:false
	};

  isFilterDeparture=true;

  setValues(res:any){
    this.valueDurationDep = res.minDurationDeparture;
    this.optionsDurationDep.floor = res.minDurationDeparture;
    this.highValueDurationDep = res.maxDurationDeparture;
    this.optionsDurationDep.ceil = res.maxDurationDeparture;
    this.optionsDurationDep.step=this.highValueDurationDep <= 120 ? 10:60; 

    this.valueDurationRet = res.minDurationReturn;
    this.optionsDurationRet.floor = res.minDurationReturn;
    this.highValueDurationRet = res.maxDurationReturn;
    this.optionsDurationRet.ceil = res.maxDurationReturn;
    this.optionsDurationRet.step=this.highValueDurationRet <= 120 ? 10:60; 

    this.highValueScaleDep = res.waitingTimeDep;
    this.highValueScaleRet = res.waitingTimeRet;
    this.optionsScaleDep.ceil = res.waitingTimeDep;
    this.optionsScaleRet.ceil = res.waitingTimeRet;

    this.optionsScaleDep.step=this.highValueScaleDep <= 120 ? 10:60; 
    this.optionsScaleRet.step=this.highValueScaleRet <= 120 ? 10:60; 


    this.valueScaleDep=0;
    this.valueScaleRet=0;
    this.optionsScaleDep.floor = 0;
    this.optionsScaleRet.floor = 0;
    setTimeout(() => {
      this.hidden=false;
    }, 10);
    
    const paramsSearch={...GlobalComponent.paramsSearch};
    this.codesFlight = [];
    if (Object.keys(paramsSearch).length !== 0) {
      this.flightType=paramsSearch.flightType;
      if (this.flightType !== 2) {
        this.codesFlight.push(paramsSearch.arrivalLocation, paramsSearch.departureLocation)
      } else {
        this.codesFlight.push(paramsSearch.multicity[0].arrivalLocation)
      }
    }
  }

  ngOnInit(): void {
    if (this.isMobile) 
      this.setValuesReset();
  }

  setValuesReset(){
    this.hidden=true;
    this.valueDurationDep =  this.valuesFilterDuration.minDurationDeparture;
    this.optionsDurationDep.floor = this.valuesFilterDurationInit.minDurationDeparture;
    this.highValueDurationDep = this.valuesFilterDuration.maxDurationDeparture;
    this.optionsDurationDep.ceil = this.valuesFilterDurationInit.maxDurationDeparture;

    this.valueDurationRet = this.valuesFilterDuration.minDurationReturn;
    this.optionsDurationRet.floor = this.valuesFilterDurationInit.minDurationReturn;
    this.highValueDurationRet = this.valuesFilterDuration.maxDurationReturn;
    this.optionsDurationRet.ceil = this.valuesFilterDurationInit.maxDurationReturn;

    this.highValueScaleDep = this.valuesFilterDuration.waitingTimeDep;
    this.highValueScaleRet = this.valuesFilterDuration.waitingTimeRet;
    
    this.valueScaleDep= this.valuesFilterDuration.minWaitingTimeDep;
    this.valueScaleRet= this.valuesFilterDuration.minWaitingTimeRet;

    this.optionsScaleDep.floor = 0;
    this.optionsScaleRet.floor = 0;

    this.optionsScaleDep.ceil = this.valuesFilterDurationInit.waitingTimeDep;
    this.optionsScaleRet.ceil = this.valuesFilterDurationInit.waitingTimeRet;

    setTimeout(() => {
      this.hidden=false;
    }, 10);
  }

  resetFilter() {
      this.resetFilterDuration.emit();
	}

  filterDuration($event:any,isDeparture:boolean){
     if(!this.isMobile) this.filterDurationRange.emit({...$event,isDeparture});
  }

  filterScale($event:any,isDeparture:boolean){
    if(!this.isMobile) this.filterDurationScale.emit({...$event,isDeparture})
  }

  applyFiltersMobile(){
    this.filterDurationMobile.emit({
			highValueDurationDep:this.highValueDurationDep,
			valueDurationDep: this.valueDurationDep,
      highValueDurationRet:this.highValueDurationRet,
      valueDurationRet:this.valueDurationRet,
      highValueScaleDep:this.highValueScaleDep,
      valueScaleDep:this.valueScaleDep,
      highValueScaleRet:this.highValueScaleRet,
      valueScaleRet:this.valueScaleRet
		})
		this.clickCloseModal();
  }

  changeFilterDuration(){
    this.isFilterDeparture=!this.isFilterDeparture;
  }

  clickCloseModal(){
		if (this._activeModal) {
			this._activeModal.close();
		}
	}

}
