import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { AsideModule } from 'src/app/shared/components/aside/aside.module';
import { HttpClientModule } from '@angular/common/http';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { PackageModule } from 'src/app/shared/components/package/package.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { FlightDealsModule } from '../flight-deals/flight-deals.module';
import { PackagesModule } from '../packages/packages.module';
import { BuildYourTripModule } from '../build-your-trip/build-your-trip.module';
import { HotelsModule } from '../hotels/hotels.module';
import { CarsModule } from '../cars/cars.module';
import { ActivitiesModule } from '../activities/activities.module';
import { FlightsPlusHotelModule } from '../flights-plus-hotel/flights-plus-hotel.module';
import { TimerBannerModule } from '../../../shared/components/timer-banner/timer-banner.module';
import { NewTabsFilterModule } from 'src/app/shared/components/new-tabs-filters/new-tabs-filters.module';
import { FilterTabsModule } from 'src/app/shared/components/filter-tabs/filter-tabs.module';
import { FiltersafeModule } from 'src/app/shared/components/filtersafe/filtersafe.module';
import { SectionWhyChooseUsComponent } from './section-why-choose-us/section-why-choose-us.component';
import { SectionBoletinComponent } from './section-boletin/section-boletin.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { ModalBoletinComponent } from './section-boletin/modal-boletin/modal-boletin.component';
import { SectionBlogComponent } from './section-blog/section-blog.component';
import { SectionPackagesComponent } from './section-packages/section-packages.component';
import { SectionSuperOffersComponent } from './section-super-offers/section-super-offers.component';
import { SectionCarruselComponent } from './section-carrusel/section-carrusel.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  declarations: [
    HomeComponent, 
    SectionWhyChooseUsComponent, 
    SectionBoletinComponent, 
    ModalBoletinComponent, 
    SectionBlogComponent, 
    SectionPackagesComponent, 
    SectionSuperOffersComponent, 
    SectionCarruselComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TabsModule,
    AsideModule,
    PackageModule,
    CardModule,
    TitleModule,
    MailingModule,
    CardInfoModule,
    MaterialModule,
    HttpClientModule,
    FlightDealsModule,
    PackagesModule,
    BuildYourTripModule,
    FlightsPlusHotelModule,
    HotelsModule,
    CarsModule,
    ActivitiesModule,
    TimerBannerModule,
    NewTabsFilterModule,
    FilterTabsModule,
    FiltersafeModule,
    ButtonModule,
    SwiperModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [HomeComponent],
  providers: [DestinyService, AsidePresenterService, BusinessUnitService],

})
export class HomeModule { }
