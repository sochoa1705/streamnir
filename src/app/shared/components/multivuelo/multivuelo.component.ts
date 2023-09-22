import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputPassengersComponent } from '../input-passengers/input-passengers.component';
import { InputClassComponent } from '../input-class/input-class.component';
import { InputSearchFlightComponent } from '../input-search-flight/input-search-flight.component';
import { InputRangeComponent } from '../input-range/input-range.component';

export interface Search {
	flightClass: number;
	adults: number;
	children: number;
	infants: number;
	arrivalLocation: string | null;
	departureLocation: string | null;
	arrivalDate: string;
	departureDate?: string;
}

@Component({
  selector: 'app-multivuelo',
  templateUrl: './multivuelo.component.html',
  styleUrls: ['./multivuelo.component.scss']
})
export class MultivueloComponent implements OnInit {
  
	arrayMulti = [0];
	indexCounter = 0;

  constructor() { }

  @ViewChildren(InputSearchFlightComponent) inputsComponent: QueryList<InputSearchFlightComponent>;
  @ViewChildren(InputRangeComponent) datesComponent: QueryList<InputRangeComponent>;

  ngOnInit(): void {
  }

  searchMulti(){
    const arrayData:Search[]=[]
    this.inputsComponent.forEach(component => {
      // arrayData.push(component.getValues())
    });
  }

  addMulti() {
		this.indexCounter++;
		this.arrayMulti.push(this.indexCounter);
	}

	deleteRow(index: number) {
		this.arrayMulti = this.arrayMulti.filter((item) => item !== index);
	}

}
