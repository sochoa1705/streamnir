import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { MailingModule } from '../mailing/mailing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AsideComponent],
  imports: [
    CommonModule,
    MailingModule
  ],
  exports: [AsideComponent]
})
export class AsideModule { }
