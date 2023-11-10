import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosV2Component } from './eventos-v2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PassengerComponent } from './passenger/passenger.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SuccessDialogModule } from '../../../shared/components/success-dialog/success-dialog.module';

@NgModule({
  declarations: [EventosV2Component, PassengerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    SuccessDialogModule,
  ],
})
export class EventosV2Module {}
