import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StepsComponent } from './steps.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [StepsComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [StepsComponent],
})
export class StepsModule { }
