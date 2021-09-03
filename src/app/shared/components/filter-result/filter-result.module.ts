import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterResultComponent } from './filter-result.component';
import { Ng5SliderModule } from 'ng5-slider';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FilterResultComponent ],
  imports: [
    CommonModule,
    Ng5SliderModule,
  ],
  exports: [ FilterResultComponent ],

})
export class FilterResultModule { }
