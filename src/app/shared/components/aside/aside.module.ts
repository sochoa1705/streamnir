import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { MailingModule } from '../mailing/mailing.module';
import { PackageVideoModule } from '../package-video/package-video.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AsideComponent],
  imports: [
    CommonModule,
    MailingModule,
    PackageVideoModule
  ],
  exports: [AsideComponent]
})
export class AsideModule { }
