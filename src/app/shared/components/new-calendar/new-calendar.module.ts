import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewCalendarComponent } from './new-calendar.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../filtersafe/filtersafe.component';
import { CustomDatepickerI18nService, I18n } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,NgbModule, NgbDatepickerModule, ButtonModule, FormsModule],
    exports: [NewCalendarComponent],
    declarations: [
    NewCalendarComponent
  ],
  providers:[
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}
  ]
})
export class NewCalendarModule { }
