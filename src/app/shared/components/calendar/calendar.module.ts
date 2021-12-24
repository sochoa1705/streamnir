import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18nService } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { CustomAdapter, CustomDateParserFormatter } from '../filtersafe/filtersafe.component';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  exports:[
    CalendarComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  providers:[
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}
  ]
})
export class CalendarModule { }
