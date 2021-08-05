import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VuelosComponent } from './vuelos.component';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { AsideModule } from 'src/app/shared/components/aside/aside.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { CardInfoModule } from 'src/app/shared/components/card-info/card-info.module';
import { PackageModule } from 'src/app/shared/components/package/package.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';

@NgModule({
  declarations: [ VuelosComponent ],
  imports: [
    CommonModule,
  ],
  exports: [ VuelosComponent ]
})
export class VuelosModule { }