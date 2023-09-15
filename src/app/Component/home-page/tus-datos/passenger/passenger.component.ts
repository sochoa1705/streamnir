import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-passenger',
	templateUrl: './passenger.component.html',
	styleUrls: [ './passenger.component.scss' ]
})
export class PassengerComponent implements OnChanges {
	@ViewChild('dateInput') private dateInput: ElementRef;

	@Input() indexToDisplay: number;
	@Input() showErrors: boolean;
	@Output() addNewPassenger: EventEmitter<void> = new EventEmitter();
	@Output() removePassenger: EventEmitter<void> = new EventEmitter();

	form: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			docType: new FormControl('', Validators.required),
			docNumber: new FormControl('', Validators.required),
			firstName: new FormControl('', Validators.required),
			middleName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			birthDate: new FormControl('', Validators.required),
			email: new FormControl('', Validators.compose([
				Validators.required,
				Validators.email
			])),
			phone: new FormControl('', Validators.required)
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	formatDate() {
		const inputValue = this.dateInput.nativeElement.value;
		const numericValue = inputValue.replace(/\D/g, '');
		if (numericValue.length >= 2) {
			let formattedValue = numericValue.slice(0, 2);

			if (numericValue.length >= 3) {
				const month = numericValue.slice(2, 4);
				formattedValue += `/${month}`;

				if (numericValue.length >= 5) {
					const year = numericValue.slice(4, 8);
					formattedValue += `/${year}`;
				}
			}

			this.dateInput.nativeElement.value = formattedValue;
		}
	}

	emmitAddNewPassenger() {
		this.addNewPassenger.emit();
	}

	emitRemovePassenger() {
		this.removePassenger.emit();
	}

	get docType() {
		return this.form.controls['docType'];
	}

	get docNumber() {
		return this.form.controls['docNumber'];
	}

	get firstName() {
		return this.form.controls['firstName'];
	}

	get middleName() {
		return this.form.controls['middleName'];
	}

	get lastName() {
		return this.form.controls['lastName'];
	}

	get birthDate() {
		return this.form.controls['birthDate'];
	}

	get email() {
		return this.form.controls['email'];
	}

	get phone() {
		return this.form.controls['phone'];
	}
}
