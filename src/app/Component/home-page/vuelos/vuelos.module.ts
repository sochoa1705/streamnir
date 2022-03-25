import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { VuelosComponent } from './vuelos.component';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { MaterialModule } from '../../../shared/material.module';
import { VuelosRoutingModule } from './vuelos-routing.module';
import { DestinosModule } from './commons/components/destinos/destinos.module';
import { FlightModule } from './commons/components/flight/flight.module';
import { OffersContinentModule } from './commons/components/offers-continent/offers-continent.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
  imports: [
    CommonModule,
    VuelosRoutingModule,
    TabsModule,
    MaterialModule,
    DestinosModule,
    FlightModule,
    OffersContinentModule
  ],
  exports: []
})
export class VuelosModule { }
