import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardCheckoutComponent } from './card-checkout.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CardCheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [CardCheckoutComponent],
})
export class CardCheckoutModule { }
