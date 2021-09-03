import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FlightsComponent ],
  imports: [
    CommonModule
  ],
  exports: [ FlightsComponent ],
})
export class FlightsModule { }
