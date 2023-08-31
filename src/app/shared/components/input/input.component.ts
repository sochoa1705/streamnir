/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

interface Item {
	value: any;
	name: string;
}

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputComponent implements OnInit {
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
	@Input() isOnlyNumber = false;
	@Input() isOnlyText = false;
	@Input() isFocus = false;
	@Input() isCheck = false;
	@Input() maxLenght = 100;
	@Input() isPassword = false;

	ngOnInit(): void {
		//console.log(this.formControl)
	}
}
