import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabVueloHotelComponent } from './tab-vuelo-hotel/tab-vuelo-hotel.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from 'src/app/Services/datepicker/customAdapter.service';
import { CustomDateParserFormatter } from 'src/app/Services/datepicker/customDateParserFormatter.service';
import { I18n, CustomDatepickerI18nService } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PopUpPasajeroModule } from '../pop-up-pasajero/pop-up-pasajero.module';
import { MaterialModule } from '../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TabHotelComponent } from './tab-hotel/tab-hotel.component';
import { TabActividadesComponent } from './tab-actividades/tab-actividades.component';
import { CalendarModule } from '../calendar/calendar.module';
import { TabVuelosComponent } from './tab-vuelos/tab-vuelos.component';
import { InputAutocompleteModule } from '../input-autocomplete/input-autocomplete.module';
import { PopUpPasajerVuelosoModule } from '../pop-up-pasajero-vuelos/pop-up-pasajero-vuelos.module';
import { TabPaquetesComponent } from './tab-paquetes/tab-paquetes.component';



@NgModule({
  declarations: [
    TabVueloHotelComponent,
    TabHotelComponent,
    TabActividadesComponent,
    TabVuelosComponent,
    TabPaquetesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopUpPasajeroModule,
    MaterialModule,
    CalendarModule,
    InputAutocompleteModule,
    PopUpPasajerVuelosoModule
  ],
  providers: [
    MatSnackBar
  ],
  exports:[
    TabVueloHotelComponent,
    TabHotelComponent,
    TabActividadesComponent,
    TabVuelosComponent,
    TabPaquetesComponent
  ]
})
export class FilterTabsModule { }
