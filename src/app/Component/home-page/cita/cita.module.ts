import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaComponent } from './cita.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  declarations: [ CitaComponent ],
  exports: [ CitaComponent ],
  imports: [
    CommonModule
  ]
})
export class CitaModule { }
