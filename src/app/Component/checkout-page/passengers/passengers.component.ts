import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ContryService } from 'src/app/api/api-nmviajes/services/country-list.service';
import { months, days } from './utils';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { Passenger } from 'src/app/api/api-checkout/models/rq-checkout-booking';
import { CardPassengerComponent } from './card-passenger/card-passenger.component';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { GlobalComponent } from 'src/app/shared/global';
import { dataSteps } from 'src/app/shared/constant-init';
interface Item {
	value: any;
	name: string;
}
@Component({
	selector: 'app-passengers',
	templateUrl: './passengers.component.html',
	styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
	contryList: Item[] = [];
	arrayDays: Item[] = [];
	arrayMonths: Item[] = [];
	arrayYearsADT: Item[] = [];
	arrayYearsINF: Item[] = [];
	arrayYearsCNN: Item[] = [];
	totalADT = 0;
	totalCNN = 0;
	totalINF = 0;
	totalPassenger = 0;
	dataPassengers: Passenger[] = [];
	dataStatusCards: boolean[] = [];
	
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
	@Output() changeStep = new EventEmitter();
	formGroup: FormGroup;
	formBillingGroup: FormGroup;
	credentials = localStorage.getItem('usuario');

	formContact = {
		name: new FormControl('',Validators.required),
		lastName: new FormControl('',Validators.required),
		motherLastname: new FormControl('',Validators.required),
		phones: new FormControl([]),
		fullPhone: new FormControl('',Validators.required),
		email:new FormControl('',[Validators.required, Validators.email]),
		acceptPolitics: new FormControl(false, Validators.requiredTrue),
		isBilling: new FormControl(false),
		subCode: new FormControl(0),
		address: new FormControl(''),
		idLoggin: new FormControl(Number(this.credentials ? JSON.parse(this.credentials).id : 0)),
	};

	formBilling = {
		ruc: new FormControl(''),
		company: new FormControl(''),
		companyName: new FormControl(''),
		companyAddress:new FormControl(''),
	};

	initialValues:any;

	@ViewChildren(CardPassengerComponent) passengersComponent: QueryList<CardPassengerComponent>;

	constructor(
		private _contryService: ContryService,
		private _checkoutService: CheckoutService
	) {
		this.formGroup = new FormGroup(this.formContact);
		this.formBillingGroup = new FormGroup(this.formBilling);
		this.initialValues=this.formBillingGroup.value;
	}

	ngOnInit() {
		this.getContryList();
		this.setArrayDate();
		this.totalADT = GlobalComponent.detailPricing.totalADT;
		this.totalCNN = GlobalComponent.detailPricing.totalCNN;
		this.totalINF = GlobalComponent.detailPricing.totalINF;
		this.totalPassenger = GlobalComponent.detailPricing.passengersCount;
		this.setIndexValidCard();
	}

	setArrayDate() {
		this.arrayMonths = months;
		for (let index = 0; index < 3; index++) {
			let yearMin = new Date().getFullYear() - (index == 0 ? 100 : index == 1 ? 11 : 2);
			let yearMax = new Date().getFullYear() - (index == 0 ? 12 : index == 1 ? 2 : 0);

			for (let i = yearMin; i <= yearMax; i++) {
				if (index == 0) this.arrayYearsADT.push({ name: i.toString(), value: i });
				if (index == 1) this.arrayYearsCNN.push({ name: i.toString(), value: i });
				if (index == 2) this.arrayYearsINF.push({ name: i.toString(), value: i });
			}
		}
		this.arrayDays = days.map((item) => {
			return { name: item.toString(), value: item };
		});
	}

	getContryList() {
		this._contryService.getContryList().subscribe({
			next: (res) => {
				this.contryList = res.map((obj) => {
					return { value: obj.code, name: obj.name };
				});
			},
			error: (err) => {
				console.log(err);
			}
		});
	}

	numberReturn(length: number) {
		return new Array(length);
	}
	//agregar validacion de facturacion 
	changeToogle($event: any) {
		const acceptPolitics = this.acceptPoliticsField.value;
		if ($event) {
			this.rucField.setValidators([Validators.required, Validators.pattern(/^.{11,}$/)]);
			this.companyNameField.setValidators(Validators.required);
			this.companyAddressField.setValidators(Validators.required);
		} else {
			this.rucField.clearValidators();
			this.companyNameField.clearValidators();
			this.companyAddressField.clearValidators();
		}
		this.acceptPoliticsField.setValue(acceptPolitics);
		this.isBillingField.setValue($event);
		this.formBillingGroup.reset(this.initialValues);
	}

	noWhitespaceValidator(control: any) {
		const isWhitespace = (control?.value || '').trim().length === 0;
		const startWithSpace = (control?.value || '')[0] === ' ';
		const isValid = !(isWhitespace || startWithSpace);
		return isValid ? null : { whitespace: true };
	}

	setInfoPassengersInformation() {
		let isValidCards = false;
		this.passengersComponent.forEach((item: CardPassengerComponent) => {
			item.clickButtonSave();
		});

		if (this.dataStatusCards.every((status) => status == true)) {
			this.dataPassengers = [];
			this.passengersComponent.forEach((item: CardPassengerComponent) => {
				this.dataPassengers.push(item.getDataForm());
			});
			isValidCards = true;
		}

		if (this.formGroup.valid && isValidCards) {
			this.companyField.setValue({
				companyName:this.companyNameField.value,
				companyAddress:this.companyAddressField.value
			})
			if (this.fullPhoneField.value !== '' ) {
				const phoneNumber = [
					{
						type: "2",
						phoneNumber: this.fullPhoneField.value.number.replace(/\s+/g, ''),
						areaCode: '01',
						countryCode: this.fullPhoneField.value.dialCode.slice(1)
					}
				];
				this.phonesField.setValue(phoneNumber);
			}
			const dataContact = {...this.formGroup.value, ...this.formBillingGroup.value};
			const keysToRemove = ['acceptPolitics', 'fullPhone', 'companyAddress', 'companyName'];
			keysToRemove.forEach((key) => delete dataContact[key]);
			GlobalComponent.appBooking = {
				...GlobalComponent.appBooking,
				contact: dataContact,
				passengers: this.dataPassengers
			};
			console.log(dataContact,'datacontact')
			dataSteps[1].check=true;
			dataSteps[2].active=true;
			this.changeStep.emit(2);
		} else {
			this.phonesField.setValue([]);
			this.formGroup.markAllAsTouched();
		}
	}

	//Se Inicializa la validacion de cada formulario
	setIndexValidCard() {
		for (let i = 0; i < this.totalPassenger; i++) {
			this.dataStatusCards.push(false);
		}
	}
	//Actualiza el estado de cada formulario
	updateValidForm($event: any) {
		this.dataStatusCards[$event.index] = $event.isValid;
	}

	get nameField(): AbstractControl {
		return this.formGroup.get('name')!;
	}

	get lastNameField(): AbstractControl {
		return this.formGroup.get('lastName')!;
	}

	get motherLastnameField(): AbstractControl {
		return this.formGroup.get('motherLastname')!;
	}

	get phonesField(): AbstractControl {
		return this.formGroup.get('phones')!;
	}

	get emailField(): AbstractControl {
		return this.formGroup.get('email')!;
	}

	get fullPhoneField(): AbstractControl {
		return this.formGroup.get('fullPhone')!;
	}

	get acceptPoliticsField(): AbstractControl {
		return this.formGroup.get('acceptPolitics')!;
	}

	get isBillingField(): AbstractControl {
		return this.formGroup.get('isBilling')!;
	}

	get rucField(): AbstractControl {
		return this.formBillingGroup.get('ruc')!;
	}

	get companyField(): AbstractControl {
		return this.formBillingGroup.get('company')!;
	}

	get companyNameField(): AbstractControl {
		return this.formBillingGroup.get('companyName')!;
	}

	get companyAddressField(): AbstractControl {
		return this.formBillingGroup.get('companyAddress')!;
	}

}


