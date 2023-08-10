import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ButtonComponent],
})
export class ButtonModule { }