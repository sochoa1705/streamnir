import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondicionesDeReservaComponent } from './condiciones-de-reserva.component';



@NgModule({
  declarations: [
    CondicionesDeReservaComponent
  ],
  exports: [CondicionesDeReservaComponent],
  imports: [
    CommonModule
  ]
})
export class CondicionesDeReservaModule { }
