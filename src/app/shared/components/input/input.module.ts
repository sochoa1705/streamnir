import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyLetters } from '../../directives/only-letters.directive';
import { OnlyNumber } from '../../directives/only-number.directive';
import { RemoveAccentsDirective } from '../../directives/remove-accents.directive';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [InputComponent],
	declarations: [InputComponent, OnlyLetters, OnlyNumber, RemoveAccentsDirective],
	providers: []
})
export class InputModule {}
