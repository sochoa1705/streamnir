import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { FlightDealsModule } from 'src/app/Component/home-page/flightdeals/flightdeals.module';

@NgModule({
  declarations: [SlideComponent],
  imports: [
    CommonModule,
    CardModule,
    TitleModule,
    MailingModule,
    FlightDealsModule
  ],
  exports: [SlideComponent]

})
export class SlideModule { }
