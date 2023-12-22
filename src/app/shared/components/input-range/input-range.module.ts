import { NgModule } from '@angular/core';
import { InputRangeComponent } from './input-range.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../filtersafe/filtersafe.component';
import { CustomDatepickerI18nService, I18n } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { ButtonModule } from '../button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthToTextPipe } from '../../pipes/month.pipe';


@NgModule({
    imports: [CommonModule,NgbModule, NgbDatepickerModule, ButtonModule,FormsModule],
    exports: [InputRangeComponent],
    declarations: [
    InputRangeComponent,MonthToTextPipe
  ],
  providers:[
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}
  ]
})
export class InputRangeModule { }
