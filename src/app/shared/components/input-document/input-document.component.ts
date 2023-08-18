import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Item {
	value: number;
	name: string;
}

@Component({
	selector: 'app-input-document',
	templateUrl: './input-document.component.html',
	styleUrls: ['./input-document.component.scss']
})
export class InputDocumentComponent implements OnInit {
	type = 'number';
	form!: FormGroup;
	showItems = false;
	title = 'DNI';
	regex!: RegExp;
	
	@Input() numberDocument = '';
	@Input() default = 1;
	@Input() isBootom = false;
	@Input() isRequired = true;
	@Input() isShowRequired = false;
	@Output() outFocus = new EventEmitter<any>();
	@Input() disabled = false;
	@Input() listItems: Item[] = [
		{
			value: 1,
			name: 'DNI'
		},
		{
			value: 2,
			name: 'CE'
		}
	];
	@Input() placeholder = 'Número';

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.setRegex();
		this.form = this.formBuilder.group({
			valueDocument: [this.numberDocument, [Validators.required, Validators.pattern(this.regex)]]
		});
	}

	setRegex() {
		this.title = this.listItems[this.default - 1].name;
		this.type = this.default == 2 ? 'text' : 'number';
		this.regex = this.default == 2 ? /^[A-Za-z0-9]{9,15}$/ : /^\d{8}(?:[-\s]\d{4})?$/;
	}

	showItemsSelect() {
		this.showItems = !this.showItems;
	}

	clickItem(item: Item) {
		this.showItems = false;
		this.form.reset();
		this.default = item.value;
		this.setRegex();
		this.form.controls['valueDocument'].clearValidators();
		this.form.controls['valueDocument'].setValidators([Validators.required, Validators.pattern(this.regex)]);
	}

	getDocumentSelected() {
		this.form.markAllAsTouched();
		return {
			document: this.documentField!.value,
			type: this.listItems[this.default],
			indexType: this.default,
			isValid:
				this.isRequired && (this.documentField!.hasError('required') || this.documentField!.hasError('pattern'))
					? false
					: true
		};
	}

	onFocusOutEvent() {
		const data = this.getDocumentSelected();
		this.outFocus.emit(data);
	}

	resetForm() {
		this.showItems = false;
		this.default = 1;
		this.form.reset();
		this.setRegex();
		this.form.controls['valueDocument'].clearValidators();
		this.form.controls['valueDocument'].setValidators([Validators.required, Validators.pattern(this.regex)]);
	}
	get documentField(): AbstractControl {
		return this.form.get('valueDocument')!;
	}
}
