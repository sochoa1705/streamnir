import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { TitleModule } from 'src/app/shared/components/title/title.module';
import { MailingModule } from 'src/app/shared/components/mailing/mailing.module';

@NgModule({
  declarations: [ SlideComponent ],
  imports: [
    CommonModule,
    CardModule,
    TitleModule,
    MailingModule,
    
  ],
  exports: [ SlideComponent ]

})
export class SlideModule { }
