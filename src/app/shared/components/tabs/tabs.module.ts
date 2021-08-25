import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { MaterialModule } from '../../material.module';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ TabsComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    FilterModule,
  ],
  exports: [ TabsComponent ],

})
export class TabsModule { }
