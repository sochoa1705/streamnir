import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpPasajeroComponent } from './pop-up-pasajero.component';
import { GetNombrePipe } from './pipes/getNombrePopUp.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PopUpPasajeroComponent,
    GetNombrePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    PopUpPasajeroComponent
  ]
})
export class PopUpPasajeroModule { }
