/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-input-check',
	templateUrl: './input-check.component.html',
	styleUrls: ['./input-check.component.scss'],
	viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputCheckComponent {
	@Input() checked?: boolean = false;
	@Input() label?: string = '';
	@Input() name?: any = 'input';
	@Input() labelError?: string = '';
	@Input() textLink?: string = '';
	@Input() url?: string = '';
}
