import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { FlightDealsModule } from '../flight-deals/flight-deals.module';


@NgModule({
  declarations: [
    CarsComponent
  ],
  exports: [
    CarsComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    TabsModule,
    FlightDealsModule,
    TitleModule,
    MailingModule,
    CardInfoModule
  ]
})
export class CarsModule { }
