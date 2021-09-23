import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprarComponent } from './comprar.component';
import { CustomersModule } from 'src/app/shared/components/customers/customers.module';
import { CardOfferModule } from 'src/app/shared/components/card-offer/card-offer.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';



@NgModule({
  declarations: [ ComprarComponent ],
  imports: [
    CommonModule,
    CustomersModule,
    CardOfferModule,
    FilterModule,
  ],
  exports: [ ComprarComponent ]
})
export class ComprarModule { }
