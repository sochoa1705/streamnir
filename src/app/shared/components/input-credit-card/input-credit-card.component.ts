/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-input-credit-card',
	templateUrl: './input-credit-card.component.html',
	styleUrls: ['../input/input.component.scss'],
	viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputCreditCard implements OnInit {
	@Input() icon?: string;
	@Input() placeholder?: string;
	@Input() label?: string;
	@Input() value?: string = '';
	@Input() class?: string;
	@Input() name?: any = 'input';
	@Input() labelError?: string = '';
	@Input() labelStroke = false;
	@Input() disabled = false;
	@Input() isRequired = false;
	@Input() isCreditCard = true;


	ngOnInit(): void {
		//console.log(this.formControl)
	}
}
