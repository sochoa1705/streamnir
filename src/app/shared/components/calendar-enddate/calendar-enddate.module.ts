import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18nService } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { CustomAdapter, CustomDateParserFormatter } from '../filtersafe/filtersafe.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CalendarEndDateComponent } from './calendar-enddate.component';



@NgModule({
  declarations: [
    CalendarEndDateComponent
  ],
  exports:[
    CalendarEndDateComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgxMaskModule.forRoot(),
  ],
  providers:[
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}
  ]
})
export class CalendarEndDateModule { }
