import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegurosComponent } from './seguros.component';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { SegurosRoutingModule } from './seguros-routing.module';
import { RouterModule } from '@angular/router';
import { SlideModule } from './commons/components/slide/slide.module';
import { PlansModule } from './commons/components/plans/plans.module';
import { SafebannerModule } from 'src/app/shared/components/safebanner/safebanner.module';
import { PlansACService } from '../../../Services/plansAC/plans-ac.service';
import { DestinyService } from '../../../Services/destiny/destiny.service';
import { NotificationModule } from '../../../shared/components/notification/notification.module';

@NgModule({
  declarations: [SegurosComponent],
  imports: [
    CommonModule,
    SegurosRoutingModule,
    MailingModule,
    RouterModule,
    CardModule,
    TitleModule,
    FooterModule,
    SafebannerModule,
    HttpClientModule,
    SlideModule,
    PlansModule,
    NotificationModule,
  ],
  exports: [SegurosComponent],
  providers: [DestinyService, DataPagePresenterService, OffersService, PackagesService]
})
export class SegurosModule { }
