import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';
import { FlightDealsModule } from '../flightdeals/flightdeals.module';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';

@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule,
    FlightDealsModule,
    TitleModule,
    MailingModule,
    CardInfoModule
  ],
  exports: [PackagesComponent]
})
export class PackagesModule { }
