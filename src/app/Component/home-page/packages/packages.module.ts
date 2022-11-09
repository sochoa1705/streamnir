import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';
import { FlightDealsModule } from '../flightdeals/flightdeals.module';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';



@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule,
    FlightDealsModule,
    TitleModule,
    CardInfoModule
  ],
  exports: [PackagesComponent]
})
export class PackagesModule { }
