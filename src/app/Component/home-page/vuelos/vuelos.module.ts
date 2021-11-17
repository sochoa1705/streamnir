import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VuelosComponent } from './vuelos.component';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { MaterialModule } from '../../../shared/material.module';
import { CardModule } from '../../../shared/components/card/card.module';
import { PackageModule } from '../../../shared/components/package/package.module';
import { VuelosRoutingModule } from './vuelos-routing.module';
import { DestinosModule } from './commons/components/destinos/destinos.module';
import { FlightModule } from './commons/components/flight/flight.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ VuelosComponent ],
  imports: [
    CommonModule,
    VuelosRoutingModule,
    TabsModule,
    MaterialModule,
    DestinosModule,
    FlightModule,
  ],
  exports: [ VuelosComponent ]
})
export class VuelosModule { }
