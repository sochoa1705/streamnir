import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterResultComponent } from './filter-result.component';
import { Ng5SliderModule } from 'ng5-slider';
import { MaterialModule } from '../../material.module';
import { FilterService } from 'src/app/Services/presenter/filter/filter.service';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FilterResultComponent],
  imports: [
    CommonModule,
    MaterialModule,
    Ng5SliderModule,
  ],
  exports: [FilterResultComponent],
  providers: [FilterService]

})
export class FilterResultModule { }
