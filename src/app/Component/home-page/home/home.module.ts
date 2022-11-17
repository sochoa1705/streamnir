import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { FlightDealsModule } from '../flightdeals/flightdeals.module';
import { PackagesModule } from '../packages/packages.module';
import { BuildYourTripModule } from '../build-your-trip/build-your-trip.module';
import { HotelsModule } from '../hotels/hotels.module';
import { CarsModule } from '../cars/cars.module';
import { ActivitiesModule } from '../activities/activities.module';
import { FlightsPlusHotelModule } from '../flights-plus-hotel/flights-plus-hotel.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomeComponent],
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
    ActivitiesModule
  ],
  exports: [HomeComponent],
  providers: [DestinyService, AsidePresenterService, BusinessUnitService]

})
export class HomeModule { }
