import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionalDataComponent } from './optional-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    OptionalDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [OptionalDataComponent]
})
export class OptionalDataModule { }
