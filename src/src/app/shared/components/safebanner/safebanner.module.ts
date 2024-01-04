import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafebannerComponent } from './safebanner.component';
import { FiltersafeModule } from '../filtersafe/filtersafe.module';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ SafebannerComponent ],
  imports: [
    CommonModule,
    FiltersafeModule,
  ],
  exports: [ SafebannerComponent ],

})
export class SafebannerModule { }
