import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { InputCheckComponent } from './input-check.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	exports: [InputCheckComponent],
	declarations: [InputCheckComponent],
	providers: []
})
export class InputCheckModule {}
