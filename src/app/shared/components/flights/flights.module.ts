import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { MaterialModule } from '../../material.module';
import { FareBreakPipe } from './pipes/fare-break-downs.pipe';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FlightsComponent,FareBreakPipe ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ FlightsComponent ],
})
export class FlightsModule { }
