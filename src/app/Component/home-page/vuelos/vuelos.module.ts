import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VuelosComponent } from './vuelos.component';

@NgModule({
  declarations: [ VuelosComponent ],
  imports: [
    CommonModule,
  ],
  exports: [ VuelosComponent ]
})
export class VuelosModule { }
