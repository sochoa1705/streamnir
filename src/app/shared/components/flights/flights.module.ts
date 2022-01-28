import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { MaterialModule } from '../../material.module';
import { FareBreakPipe } from './pipes/fare-break-downs.pipe';
import { DirectivesModule } from '../../directives/directives.module';
import { HoraPipe } from './pipes/hora.pipe';
import { EscalasPipe } from './pipes/escalas.pipe';
import { GetDaysPipe } from './pipes/get-days.pipe';
import { FormatPipe } from './pipes/format-day.pipe';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FlightsComponent,FareBreakPipe,HoraPipe,EscalasPipe,GetDaysPipe,FormatPipe ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [ FlightsComponent ],
  providers:[FareBreakPipe]
})
export class FlightsModule { }
