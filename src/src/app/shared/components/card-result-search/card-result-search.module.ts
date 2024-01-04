import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResultSearchComponent } from './card-result-search.component';
import { ButtonModule } from '../button/button.module';
import { CardDetailFlyModule } from '../card-detail-fly/card-detail-fly.module';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { ToolTipModule } from '../tooltip/tooltip.module';
import { GetDaysPipe } from '../../pipes/get-days.pipe';
import { ModalFlightDetailComponent } from './modal-flight-detail/modal-flight-detail.component';
import { SwiperModule } from 'swiper/angular';
import { ChangeCurrencyPipe } from '../../pipes/change-currency.pipe';
import { AmPmPipe } from '../../pipes/hour.pipe';
import { ToolTipArrivalModule } from '../tooltip-arrival/tooltip-arrival.module';
registerLocaleData(localeEs, "es");

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ CardResultSearchComponent,ModalFlightDetailComponent, ChangeCurrencyPipe, AmPmPipe],
  imports: [
    CommonModule, 
    ButtonModule,
    CardDetailFlyModule,
    ToolTipModule,
    SwiperModule,
    ToolTipArrivalModule
  ],
  exports: [ CardResultSearchComponent,ModalFlightDetailComponent,ChangeCurrencyPipe ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }],
})
export class CardResultSearchModule { }
