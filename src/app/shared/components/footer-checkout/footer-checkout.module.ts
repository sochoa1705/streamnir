import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterCheckoutComponent } from './footer-checkout.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FooterCheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [FooterCheckoutComponent],
})
export class FooterCheckoutModule { }
