import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaggageComponent } from './baggage.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BaggageComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [BaggageComponent],
})
export class BaggageModule { }
