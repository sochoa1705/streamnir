import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailingComponent } from './mailing.component';
import { MaterialModule } from '../../material.module';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ MailingComponent ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ MailingComponent ],

})
export class MailingModule { }
