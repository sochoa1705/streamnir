import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VuelosComponent } from './vuelos.component';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { AsideModule } from 'src/app/shared/components/aside/aside.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ VuelosComponent ],
  imports: [
    CommonModule,
    FilterModule,
    AsideModule,
    CardModule,
    CardInfoModule,
  ],
  exports: [ VuelosComponent ]
})
export class VuelosModule { }
