import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from './flight.component';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { PackageModule } from 'src/app/shared/components/package/package.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ FlightComponent ],
  imports: [
    CommonModule,
    TabsModule,
    MaterialModule,
    PackageModule,
    RouterModule,
    CardModule,
  ],
  exports: [ FlightComponent ],

})
export class FlightModule { }