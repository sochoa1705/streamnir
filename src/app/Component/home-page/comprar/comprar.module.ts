import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprarComponent } from './comprar.component';
import { CustomersModule } from 'src/app/shared/components/customers/customers.module';
import { CardOfferModule } from 'src/app/shared/components/card-offer/card-offer.module';



@NgModule({
  declarations: [ ComprarComponent ],
  imports: [
    CommonModule,
    CustomersModule,
    CardOfferModule,
  ],
  exports: [ ComprarComponent ]
})
export class ComprarModule { }
