import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CierrapuertasComponent } from './cierrapuertas.component';



@NgModule({
  declarations: [
    CierrapuertasComponent
  ],
  exports: [CierrapuertasComponent],
  imports: [
    CommonModule
  ]
})
export class CierrapuertasModule { }
