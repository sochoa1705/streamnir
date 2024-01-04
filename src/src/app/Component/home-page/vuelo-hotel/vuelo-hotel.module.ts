import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VueloHotelRoutingModule } from './vuelo-hotel-routing.module';
import { VueloHotelComponent } from './vuelo-hotel.component';


@NgModule({
  declarations: [
    VueloHotelComponent
  ],
  imports: [
    CommonModule,
    VueloHotelRoutingModule
  ]
})
export class VueloHotelModule { }
