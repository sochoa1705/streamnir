import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardOfferComponent } from './card-offer.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ CardOfferComponent ],
  imports: [
    CommonModule
  ],
  exports: [ CardOfferComponent ],

})
export class CardOfferModule { }
