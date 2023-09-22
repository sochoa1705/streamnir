import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabVueloHotelComponent } from './tab-vuelo-hotel/tab-vuelo-hotel.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from 'src/app/Services/datepicker/customAdapter.service';
import { CustomDateParserFormatter } from 'src/app/Services/datepicker/customDateParserFormatter.service';
import { I18n, CustomDatepickerI18nService } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpPasajeroModule } from '../pop-up-pasajero/pop-up-pasajero.module';
import { MaterialModule } from '../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TabHotelComponent } from './tab-hotel/tab-hotel.component';
import { TabActividadesComponent } from './tab-actividades/tab-actividades.component';
import { CalendarModule } from '../calendar/calendar.module';
import { TabVuelosComponent } from './tab-vuelos/tab-vuelos.component';
import { InputAutocompleteModule } from '../input-autocomplete/input-autocomplete.module';
import { PopUpPasajerVuelosoModule } from '../pop-up-pasajero-vuelos/pop-up-pasajero-vuelos.module';
import { TabArmaPaquetesComponent } from './tab-arma-paquetes/tab-arma-paquetes.component';
import { TabPaquetesComponent } from './tab-paquetes/tab-paquetes.component';
import { TabAutosComponent } from './tab-autos/tab-autos.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CalendarEndDateModule } from '../calendar-enddate/calendar-enddate.module';
import { TabVuelosMulticityComponent } from './tab-vuelos-multicity/tab-vuelos-multicity.component';
import { CalendarPriceModule } from '../calendar-price/calendar-price.module';
import { TabVuelosV2Component } from './tab-vuelos-v2/tab-vuelos-v2.component';
import { InputSearchFlightModule } from '../input-search-flight/input-search-flight.module';
import { InputRangeModule } from '../input-range/input-range.module';
import { ButtonModule } from '../button/button.module';
import { InputClassModule } from '../input-class/input-class.module';
import { InputPassengersModule } from '../input-passengers/input-passengers.module';
import { MultivueloModule } from '../multivuelo/multivuelo.module';


@NgModule({
  declarations: [
    TabVueloHotelComponent,
    TabHotelComponent,
    TabActividadesComponent,
    TabVuelosComponent,
    TabArmaPaquetesComponent,
    TabPaquetesComponent,
    TabAutosComponent,
    TabVuelosMulticityComponent,
    TabVuelosV2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PopUpPasajeroModule,
    MaterialModule,
    CalendarModule,
    CalendarEndDateModule,
    CalendarPriceModule,
    InputAutocompleteModule,
    PopUpPasajerVuelosoModule,
    NgbModule,
    InputSearchFlightModule,
    InputRangeModule,
    ButtonModule,
    InputClassModule,
    InputPassengersModule,
    NgxMaskModule.forRoot(),
    MultivueloModule
  ],
  providers: [
    MatSnackBar,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService }
  ],
  exports: [
    TabVueloHotelComponent,
    TabHotelComponent,
    TabActividadesComponent,
    TabVuelosComponent,
    TabArmaPaquetesComponent,
    TabPaquetesComponent,
    TabAutosComponent,
    TabVuelosMulticityComponent,
    TabVuelosV2Component
  ]
})
export class FilterTabsModule { }
