import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetNombrePipe } from './pipes/getNombrePopUp.pipe';
import { PopUpPasajeroVuelosComponent } from './pop-up-pasajero-vuelos.component';



@NgModule({
  declarations: [
    PopUpPasajeroVuelosComponent,
    GetNombrePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PopUpPasajeroVuelosComponent
  ]
})
export class PopUpPasajerVuelosoModule { }
