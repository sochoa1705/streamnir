import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageComponent } from './coverage.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ CoverageComponent ],
  imports: [
    CommonModule
  ],
  exports: [ CoverageComponent ],
})
export class CoverageModule { }
