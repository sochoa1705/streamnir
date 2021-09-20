import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersafeComponent } from './filtersafe.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FiltersafeComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    FilterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ FiltersafeComponent ],

})
export class FiltersafeModule { }