import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailFlyComponent } from './card-detail-fly.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { FormDatePipe } from '../../pipes/date.pipe';
import { FlightDurationPipe } from '../../pipes/flight-duration.pipe';
import { AirportPipe } from '../../pipes/name-airport.pipe';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [CardDetailFlyComponent, CapitalizePipe, FormDatePipe, FlightDurationPipe, AirportPipe],
  imports: [
    CommonModule
  ],
  exports: [CardDetailFlyComponent, CapitalizePipe, FormDatePipe, FlightDurationPipe, AirportPipe],
})
export class CardDetailFlyModule { }
