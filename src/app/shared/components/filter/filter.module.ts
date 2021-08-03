import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FilterComponent ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ FilterComponent ]
})
export class FilterModule { }
