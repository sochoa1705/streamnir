import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailingComponent } from './mailing.component';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MailingService } from '../../../Services/mailing/mailing.service';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MailingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [MailingComponent],
  providers: [MailingService]
})
export class MailingModule { }
