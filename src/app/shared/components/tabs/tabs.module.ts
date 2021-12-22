import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { MaterialModule } from '../../material.module';
import { FilterModule } from '../filter/filter.module';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersafeModule } from 'src/app/shared/components/filtersafe/filtersafe.module';
import { CustomAdapter } from 'src/app/Services/datepicker/customAdapter.service';
import { CustomDateParserFormatter } from 'src/app/Services/datepicker/customDateParserFormatter.service';
import { I18n, CustomDatepickerI18nService } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { PopUpPasajeroModule } from '../pop-up-pasajero/pop-up-pasajero.module';
import { FilterTabsModule } from '../filter-tabs/filter-tabs.module';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ TabsComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    FilterModule,
    FiltersafeModule,
    NgbModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    PopUpPasajeroModule,
    FilterTabsModule
  ],
  exports: [ TabsComponent ],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}

  ]

})
export class TabsModule { }


