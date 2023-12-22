import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputToggleComponent } from './input-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	exports: [InputToggleComponent],
	declarations: [InputToggleComponent],
	providers: []
})
export class InputToggleModule {}
