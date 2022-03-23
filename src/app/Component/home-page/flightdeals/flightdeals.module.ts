import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightDealsComponent } from './flightdeals.component';



@NgModule({
  declarations: [FlightDealsComponent],
  exports: [FlightDealsComponent],
  imports: [
    CommonModule
  ]
})
export class AirfareModule { }
