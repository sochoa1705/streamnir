import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { MaterialModule } from '../../material.module';
import { FilterModule } from '../filter/filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersafeModule } from 'src/app/shared/components/filtersafe/filtersafe.module';
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
    ReactiveFormsModule
  ],
  exports: [ TabsComponent ],

})
export class TabsModule { }


