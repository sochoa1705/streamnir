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



@NgModule({
  declarations: [
    TabVueloHotelComponent,
    TabHotelComponent,
    TabActividadesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    PopUpPasajeroModule,
    MaterialModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService},
    MatSnackBar

  ],
  exports:[
    TabVueloHotelComponent,
    TabHotelComponent,
    TabActividadesComponent
  ]
})
export class FilterTabsModule { }
