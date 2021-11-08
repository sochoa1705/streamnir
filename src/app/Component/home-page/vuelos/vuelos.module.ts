import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VuelosComponent } from './vuelos.component';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { MaterialModule } from '../../../shared/material.module';
import { CardModule } from '../../../shared/components/card/card.module';
import { PackageModule } from '../../../shared/components/package/package.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ VuelosComponent ],
  imports: [
    CommonModule,
    TabsModule,
    MaterialModule,
    PackageModule,
    CardModule,
  ],
  exports: [ VuelosComponent ]
})
export class VuelosModule { }
