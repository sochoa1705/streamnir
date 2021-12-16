import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpPasajeroComponent } from './pop-up-pasajero.component';
import { GetNombrePipe } from './pipes/getNombrePopUp.pipe';



@NgModule({
  declarations: [
    PopUpPasajeroComponent,
    GetNombrePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PopUpPasajeroComponent
  ]
})
export class PopUpPasajeroModule { }
