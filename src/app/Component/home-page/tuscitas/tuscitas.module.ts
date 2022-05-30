import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuscitasComponent } from './tuscitas.component';
import { TusCitasRoutingModule } from './tuscitas.routing';



@NgModule({
  declarations: [
    TuscitasComponent
  ],
  imports: [
    CommonModule,
    TusCitasRoutingModule
  ]
})
export class TuscitasModule { }
