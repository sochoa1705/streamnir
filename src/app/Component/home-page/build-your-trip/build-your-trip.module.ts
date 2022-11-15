import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildYourTripRoutingModule } from './build-your-trip-routing.module';
import { BuildYourTripComponent } from './build-your-trip.component';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { FlightDealsModule } from '../flightdeals/flightdeals.module';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';


@NgModule({
  declarations: [
    BuildYourTripComponent
  ],
  imports: [
    CommonModule,
    BuildYourTripRoutingModule,
    TabsModule,
    FlightDealsModule,
    TitleModule,
    MailingModule,
    CardInfoModule
  ],
  exports: [BuildYourTripComponent]
})
export class BuildYourTripModule { }
