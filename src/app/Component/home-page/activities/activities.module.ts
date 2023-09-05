import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { FlightDealsModule } from '../flight-deals/flight-deals.module';


@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  exports: [
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    TabsModule,
    FlightDealsModule,
    TitleModule,
    MailingModule,
    CardInfoModule
  ]
})
export class ActivitiesModule { }
