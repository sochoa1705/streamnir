import { NgModule } from '@angular/core';
import { InputPassengersComponent } from './input-passengers.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [CommonModule, ButtonModule],
    exports: [InputPassengersComponent],
    declarations: [
    InputPassengersComponent
  ],
    providers: [],
})
export class InputPassengersModule { }
