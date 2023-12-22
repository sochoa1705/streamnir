import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersafeComponent } from './filtersafe.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ButtonModule } from '../button/button.module';
import { InputRangeModule } from '../input-range/input-range.module';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ FiltersafeComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    ButtonModule,
    InputRangeModule
  ],
  exports: [ FiltersafeComponent ],
  bootstrap: [FiltersafeComponent]

})
export class FiltersafeModule { }
