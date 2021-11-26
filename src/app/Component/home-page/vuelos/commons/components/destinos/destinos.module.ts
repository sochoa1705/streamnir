import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinosComponent } from './destinos.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DestinosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DestinosComponent
  ],
})
export class DestinosModule { }
