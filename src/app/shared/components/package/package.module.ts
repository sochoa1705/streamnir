import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageComponent } from './package.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ PackageComponent ],
  imports: [
    CommonModule
  ],
  exports: [ PackageComponent ]
})
export class PackageModule { }
