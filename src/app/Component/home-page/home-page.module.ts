import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { AsideModule } from 'src/app/shared/components/aside/aside.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { PackageModule } from 'src/app/shared/components/package/package.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { HttpClientModule } from '@angular/common/http';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FilterModule,
    AsideModule,
    CardModule,
    CardInfoModule,
    PackageModule,
    FooterModule,
    MailingModule,
    TitleModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  exports: [HomePageComponent],
  providers: [OffersService, PackagesService, AsidePresenterService, DataPagePresenterService]
})
export class HomePageModule { }
