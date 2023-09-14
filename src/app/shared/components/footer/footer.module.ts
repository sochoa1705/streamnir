import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../button/button.module';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ButtonModule
  ],
  exports: [FooterComponent],
})
export class FooterModule { }
