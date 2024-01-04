import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18nService } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { CustomAdapter } from 'src/app/Services/datepicker/customAdapter.service';
import { CustomDateParserFormatter } from 'src/app/Services/datepicker/customDateParserFormatter.service';
import { FilterComponent } from './filter.component';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FilterComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  exports: [ FilterComponent ],
  bootstrap: [FilterComponent],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}

  ]
})
export class FilterModule { }
