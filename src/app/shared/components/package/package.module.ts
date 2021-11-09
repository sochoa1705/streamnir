import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageComponent } from './package.component';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ PackageComponent ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ PackageComponent ],
})
export class PackageModule { }
