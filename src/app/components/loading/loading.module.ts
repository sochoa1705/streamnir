import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [LoadingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule, NgxSpinnerModule],
  exports: [LoadingComponent, NgxSpinnerModule],
})
export class LoadingModule { }