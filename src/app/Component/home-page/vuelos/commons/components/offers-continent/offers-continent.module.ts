import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersContinentComponent } from './offers-continent.component';

@NgModule({
  declarations: [OffersContinentComponent],
  exports: [OffersContinentComponent],
  imports: [
    CommonModule
  ]
})
export class OffersContinentModule { }
