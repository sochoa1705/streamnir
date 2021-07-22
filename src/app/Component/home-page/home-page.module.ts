import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { VuelosModule } from './vuelos/vuelos.module';


@NgModule({
  declarations: [ HomePageComponent ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    VuelosModule,
  ],
  exports:[ HomePageComponent ]
})
export class HomePageModule { }
