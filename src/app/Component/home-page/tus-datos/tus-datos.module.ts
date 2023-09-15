import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TusDatosComponent } from './tus-datos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PassengerComponent } from './passenger/passenger.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    TusDatosComponent,
    PassengerComponent
  ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCheckboxModule
	]
})
export class TusDatosModule { }
