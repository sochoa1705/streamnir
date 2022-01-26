import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { MaterialModule } from '../../material.module';
import { FareBreakPipe } from './pipes/fare-break-downs.pipe';
import { DirectivesModule } from '../../directives/directives.module';
import { HoraPipe } from './pipes/hora.pipe';
import { EscalasPipe } from './pipes/escalas.pipe';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FlightsComponent,FareBreakPipe,HoraPipe,EscalasPipe ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [ FlightsComponent ],
})
export class FlightsModule { }
