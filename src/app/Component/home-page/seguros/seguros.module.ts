import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegurosComponent } from './seguros.component';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { FiltersafeModule } from 'src/app/shared/components/filtersafe/filtersafe.module';

@NgModule({
  declarations: [SegurosComponent],
  imports: [
    CommonModule,
    MailingModule,
    CardModule,
    TitleModule,
    FooterModule,
    FiltersafeModule,
    HttpClientModule,
  ],
  exports: [SegurosComponent],
  providers: [DataPagePresenterService, OffersService]
})
export class SegurosModule { }
