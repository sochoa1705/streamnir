import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { SelectComponent } from 'src/app/shared/components/select/select.component';
interface Item {
	value: any;
	name: string;
}
@Component({
	selector: 'card-passenger',
	templateUrl: 'card-passenger.component.html',
	styleUrls: ['./card-passenger.component.scss']
})
export class CardPassengerComponent implements OnInit {
	@Input() type: string = 'ADT';
	@Input() index = 1;
	@Input() indexCard = 0;
	@Input() contryList: Item[] = [];
	@Input() arrayDays: Item[] = [];
	@Input() arrayMonths: Item[] = [];
	@Input() arrayYears: Item[] = [];
	@Output() updateValidForm = new EventEmitter();
	@ViewChild('cardPassenger') cardPassenger: ElementRef;
	@ViewChild('inputDay') inputDay: SelectComponent;

	formGroup: FormGroup;
	formObject = {
		type: new FormControl(''),
		name: new FormControl('', [Validators.required, Validators.maxLength(50), this.noWhitespaceValidator]),
		lastName: new FormControl('', [Validators.required, Validators.maxLength(50), this.noWhitespaceValidator]),
		birthday: new FormControl(''),
		nationality: new FormControl('', [Validators.required]),
		documentType: new FormControl('', [Validators.required]),
		documentNumber: new FormControl(''),
		fullPhone: new FormControl(''),
		phone: new FormControl(''),
		email: new FormControl('', [Validators.email, Validators.maxLength(50)]),
		gender: new FormControl('', [Validators.required]),
		isFrecuently: new FormControl(true),
		day: new FormControl('', Validators.required),
		month: new FormControl('', Validators.required),
		year: new FormControl('', Validators.required)
	};

	separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [
		CountryISO.Peru,
		CountryISO.Chile,
		CountryISO.Bolivia,
		CountryISO.Ecuador,
		CountryISO.Argentina,
		CountryISO.Colombia
	];
	active = true; 
	regexNroDocument!: RegExp;
	daysFilter: Item[] = [];
	monthsFilter:Item[] = [];
	validForm = false;
	numberDocument=0;
	constructor() {
		this.formGroup = new FormGroup(this.formObject);
	}

	ngOnInit() {
		this.typeField.setValue(this.type);
		this.daysFilter = this.arrayDays;
		this.monthsFilter = this.arrayMonths;
		this.setRegex();
		this.onChangesForm();
	}

	setRegex() {
		this.regexNroDocument = this.documentTypeField.value == 0 ? /^\d{8}(?:[-\s]\d{4})?$/ : /^[A-Za-z0-9]{7,12}$/;
		this.documentNumberField.setValidators([Validators.required, Validators.pattern(this.regexNroDocument)]);
	}

	onChangesForm() {
		this.documentTypeField.valueChanges.subscribe((res) => {
			if (res !== '') {
				this.documentNumberField.setValue('');
				this.documentNumberField.clearValidators();
				this.setRegex();
			}
		});

		
		this.dayField.valueChanges.subscribe((res) => {
			if (res !== '') this.validateDays();
		});

		this.monthField.valueChanges.subscribe((res) => {
			if (res !== '') this.validateDays();
		});

		this.yearField.valueChanges.subscribe((res) => {
			if (res !== '') this.validateDays();
		});
	}

	clickButtonSave() {
		if (this.formGroup.valid) {
			this.validForm = true;
			this.active = false;
			const cardPassenger = this.cardPassenger.nativeElement;
    		cardPassenger.scrollTop = cardPassenger.scrollHeight;
		} else {
			this.validForm = false;
			this.formGroup.markAllAsTouched();
		}
		this.numberDocument=this.formGroup.value.documentNumber;
		this.updateValidForm.emit({ index: this.indexCard, isValid: this.validForm });
	}

	getDataForm() {
		const dateBirthday = new Date(this.yearField.value, this.monthField.value - 1, this.dayField.value).toISOString();
		const phoneNumber = this.fullPhoneField.value ? this.fullPhoneField.value.dialCode + '.' + this.fullPhoneField.value.number.replace(/\s+/g, '') : '';
		this.birthdayField.setValue(dateBirthday);
		this.phoneField.setValue(phoneNumber);
		this.documentTypeField.setValue(Number(this.documentTypeField.value));
	    this.documentNumberField.setValue(this.numberDocument.toString());
		const dataPassenger = this.formGroup.value;
		const keysToRemove = ['year', 'month', 'day', 'fullPhone'];
		keysToRemove.forEach((key) => delete dataPassenger[key]);
		return dataPassenger;
	}

	noWhitespaceValidator(control: any) {
		const isWhitespace = (control?.value || '').trim().length === 0;
		const startWithSpace = (control?.value || '')[0] === ' ';
		const isValid = !(isWhitespace || startWithSpace);
		return isValid ? null : { whitespace: true };
	}

	validateDays() {
		let year = this.yearField.value;
		let month = this.monthField.value;
		let day = this.dayField.value;
		const daysFilter = [];
		let daysInMonth = new Date(year, month, 0).getDate();
		for (let i = 1; i <= daysInMonth; i++) {
			daysFilter.push({ name: i.toString(), value: i });
		}
		this.daysFilter = daysFilter;
		if (!this.daysFilter.some((item) => item.value == day)) {
			this.dayField.markAsTouched();
			this.dayField.setValue('');
		}

		if (this.type == 'INF' && year != '' && month != '' && day != '') {
			let birthday = moment({ year: year, month: Number(month) - 1, day: day });
			const years = moment().diff(moment(birthday, 'DD/MM/YYYY'), 'years');
			if (years >= 2) {
				this.dayField.setValue('');
				this.inputDay.resetValue();
				this.dayField.markAsTouched();
			}
		}

		if(this.type== 'INF'){
			const currentDate = new Date();
        	const currentYear =  currentDate.getFullYear();
			const currentMonth =  currentDate.getMonth() + 1;
			this.monthsFilter = Number(year) == currentYear ?  this.arrayMonths.filter(item=>item.value<=currentMonth):this.arrayMonths;
			if(Number(year) == currentYear && Number(month) > currentMonth){
				this.monthField.setValue('');
				this.monthField.markAsTouched();
			}
		}
	}

	get typeField(): AbstractControl {
		return this.formGroup.get('type')!;
	}

	get nameField(): AbstractControl {
		return this.formGroup.get('name')!;
	}

	get lastNameField(): AbstractControl {
		return this.formGroup.get('lastName')!;
	}

	get birthdayField(): AbstractControl {
		return this.formGroup.get('birthday')!;
	}

	get nationalityField(): AbstractControl {
		return this.formGroup.get('nationality')!;
	}

	get documentTypeField(): AbstractControl {
		return this.formGroup.get('documentType')!;
	}

	get documentNumberField(): AbstractControl {
		return this.formGroup.get('documentNumber')!;
	}

	get emailField(): AbstractControl {
		return this.formGroup.get('email')!;
	}

	get phoneField(): AbstractControl {
		return this.formGroup.get('phone')!;
	}

	get fullPhoneField(): AbstractControl {
		return this.formGroup.get('fullPhone')!;
	}

	get genderField(): AbstractControl {
		return this.formGroup.get('gender')!;
	}

	get dayField(): AbstractControl {
		return this.formGroup.get('day')!;
	}
	get monthField(): AbstractControl {
		return this.formGroup.get('month')!;
	}

	get yearField(): AbstractControl {
		return this.formGroup.get('year')!;
	}
}
