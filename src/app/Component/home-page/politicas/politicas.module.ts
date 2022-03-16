import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliticasComponent } from './politicas.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ PoliticasComponent ],
  exports: [ PoliticasComponent ],
  imports: [
    CommonModule
  ]
})
export class PoliticasModule { }
