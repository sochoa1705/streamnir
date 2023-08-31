import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-duration-filter',
  templateUrl: './duration-filter.component.html',
  styleUrls: ['./duration-filter.component.scss']
})
export class DurationFilterComponent implements OnInit {

  constructor() { }
  dropdownActive=true;

  value: number = 0;
	highValue: number = 100;

  valueScale: number = 0;
	highValueScale: number = 100;

	options: Options = {
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
  
  ngOnInit(): void {
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
