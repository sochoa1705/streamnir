import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDetalleVueloComponent } from './modal-detalle-vuelo/modal-detalle-vuelo.component';
import { HoraPipe } from './modal-detalle-vuelo/hora.pipe';



@NgModule({
  declarations: [
    ModalDetalleVueloComponent,
    HoraPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[ModalDetalleVueloComponent]
})
export class ModalsModule { }
