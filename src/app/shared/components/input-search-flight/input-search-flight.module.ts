import { NgModule } from '@angular/core';
import { InputSearchFlightComponent } from './input-search-flight.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
    exports: [InputSearchFlightComponent],
    declarations: [
    InputSearchFlightComponent
  ],
    providers: [],
})
export class InputSearchFlightModule { }
