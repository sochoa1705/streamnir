import { Component, EventEmitter, HostListener, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ContryService } from 'src/app/api/api-nmviajes/services/country-list.service';
import { months, days } from './utils';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { Passenger } from 'src/app/api/api-checkout/models/rq-checkout-booking';
import { CardPassengerComponent } from './card-passenger/card-passenger.component';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { GlobalComponent } from 'src/app/shared/global';
import { dataSteps } from 'src/app/shared/constant-init';
import { AccountsService } from 'src/app/Services/accounts.service';
import { IValidateBooking, RValidateBooking } from 'src/app/api/api-checkout/models/rq-checkout-validate-booking';
import { getBodyValidateBooking } from 'src/app/shared/utils/bodyValidateBooking';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { ModalValidateComponent } from './modal-validate/modal-validate.component';
import { getBodyGTMContact } from 'src/app/shared/utils/GMTContact';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
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
	getScreenWidth=0;
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
	formPoliticsGroup: FormGroup;
	credentials = localStorage.getItem('usuario');

	formContact = {
		name: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		motherLastname: new FormControl('', Validators.required),
		phones: new FormControl([]),
		fullPhone: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		isBilling: new FormControl(false),
		subCode: new FormControl(0),
		address: new FormControl(''),
		idLoggin: new FormControl(Number(this.credentials ? JSON.parse(this.credentials).id : 0))
	};

	formPolitics = {
		acceptPolitics: new FormControl(false, Validators.requiredTrue)
	};

	formBilling = {
		ruc: new FormControl(''),
		company: new FormControl(''),
		companyName: new FormControl(''),
		companyAddress: new FormControl('')
	};

	initialValues: any;
	errorDefault = 'Al parecer hubo un error al validar su itinerario, por favor intentelo nuevamente';

	@ViewChildren(CardPassengerComponent) passengersComponent: QueryList<CardPassengerComponent>;

	constructor(
		private _contryService: ContryService,
		private _checkoutService: CheckoutService,
		private _accountService: AccountsService,
		private _modalService: NgbModal,
		private _gtmService: GoogleTagManagerService
	) {
		this.formGroup = new FormGroup(this.formContact);
		this.formBillingGroup = new FormGroup(this.formBilling);
		this.formPoliticsGroup = new FormGroup(this.formPolitics);
		this.initialValues = this.formBillingGroup.value;
	}

	ngOnInit() {
		this.getContryList();
		this.setArrayDate();
		this.totalADT = GlobalComponent.detailPricing.totalADT;
		this.totalCNN = GlobalComponent.detailPricing.totalCNN;
		this.totalINF = GlobalComponent.detailPricing.totalINF;
		this.totalPassenger = GlobalComponent.detailPricing.passengersCount;
		this.setIndexValidCard();
		const userStorage = this._accountService.getUserStorage();
		if (userStorage.email) this.getDataContact(userStorage.email);
	
		this.getScreenWidth = window.innerWidth;
	}
	@HostListener('window:resize', ['$event'])
	onResize(){
		if (this.getScreenWidth !== window.innerWidth) {
			this.getScreenWidth = window.innerWidth;
		}
	}
	setArrayDate() {
		this.arrayMonths = months;
		for (let index = 0; index < 3; index++) {
			let yearMin = new Date().getFullYear() - (index == 0 ? 100 : index == 1 ? 11 : 2);
			let yearMax = new Date().getFullYear() - (index == 0 ? 12 : index == 1 ? 2 : 0);

			for (let i = yearMax ; i >= yearMin; i--) {
				if (index == 0) this.arrayYearsADT.push({ name: i.toString(), value: i });
				if (index == 1) this.arrayYearsCNN.push({ name: i.toString(), value: i });
				if (index == 2) this.arrayYearsINF.push({ name: i.toString(), value: i });
			}
		}
		this.arrayDays = days.map((item:any) => {
			return { name: item.toString(), value: item };
		});
	}

	getContryList() {
		this._contryService.getContryList().subscribe({
			next: (res) => {
				GlobalComponent.listCountries = res;
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

	getDataContact(email: string) {
		this._checkoutService.getDataContactByLogin(email).subscribe({
			next: (res) => {
				this.nameField.setValue(res.result?.firstname || '');
				this.lastNameField.setValue(res.result?.fatherLastname || '');
				this.emailField.setValue(res.result?.email || '');
			}
		});
	}

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
				companyName: this.companyNameField.value,
				companyAddress: this.companyAddressField.value
			});
			if (this.fullPhoneField.value !== '') {
				const phoneNumber = [
					{
						type: '2',
						phoneNumber: this.fullPhoneField.value.number.replace(/\s+/g, ''),
						areaCode: '01',
						countryCode: this.fullPhoneField.value.dialCode.slice(1)
					}
				];
				this.phonesField.setValue(phoneNumber);
			}
			const dataContact = { ...this.formGroup.value, ...this.formBillingGroup.value };
			const keysToRemove = ['acceptPolitics', 'fullPhone', 'companyAddress', 'companyName'];
			keysToRemove.forEach((key) => delete dataContact[key]);
			GlobalComponent.appBooking = {
				...GlobalComponent.appBooking,
				contact: dataContact,
				passengers: this.dataPassengers
			};
			this.validateBooking();
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

	validateBooking() {
		const bodyValidateBooking: IValidateBooking = getBodyValidateBooking();
		this._checkoutService.validateBooking(bodyValidateBooking).subscribe({
			next: (res) => {
				if (res.success) {
					dataSteps[1].check = true;
					dataSteps[2].active = true;
					this.changeStep.emit(2);
					this.pushToGTMContact();
					window.scroll({ top: 0, behavior: 'smooth' });
				} else {
					if (res.isChurning) {
						this.openModalError(
							'Ud. ha excedido el número máximo de reservas generadas. Por favor, contactarse a nuestro Call Center.'
						);
					} else {
						const message = this.getMessageValidateError(res);
						if (message == '') this.openModalError(this.errorDefault);
						else this.openModalErrorValidate(message, res);
					}
				}
			},
			error: (err) => {
				this.openModalError(this.errorDefault);
			}
		});
	}

	getMessageValidateError(res: RValidateBooking) {
		if (res.isDuplicate) {
			if (res.isMT)
				return (
					'Ya ha realizado una reserva con las mismas fechas y horarios (Códigos ' + res.bookings[0].pnrDuplicate + ',' + res.bookings[1].pnrDuplicate +')'
				);
			else
				return (
					'Ya ha realizado una reserva con las mismas fechas y horarios (Código ' + res.bookings[0].pnrDuplicate + ')'
				);
		}
		return '';
	}

	openModalError(message: string, isSuccessCancel = false) {
		const modalRef = this._modalService.open(ModalErrorComponent, {
			centered: true,
			backdrop: 'static',
			windowClass: 'modal-detail-error'
		});
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.isRedirect = isSuccessCancel ? false : true;
		modalRef.componentInstance.txtButton = isSuccessCancel ? 'Aceptar' : 'Volver al inicio';
	}

	openModalErrorValidate(message: string, validateBooking: RValidateBooking | null) {
		const modalRef = this._modalService.open(ModalValidateComponent, {
			centered: true,
			backdrop: 'static',
			size:'lg',
			windowClass: 'modal-detail-validate'
		});
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.validateBooking = validateBooking;
		modalRef.result.then((result) => {
			if (result == 'success') {
				dataSteps[1].check = true;
				dataSteps[2].active = true;
				this.changeStep.emit(2);
				this.openModalError('Su reserva anterior, fue cancelada exitosamente', true);
			}
		});
	}

	pushToGTMContact(){
		try {
			const bodyGTMContact=getBodyGTMContact();
			GlobalComponent.GMTContact=bodyGTMContact;
			this._gtmService.pushTag(bodyGTMContact);
		} 
		catch (error) {
			console.log('error tag nmv_vuelos_checkout_ingresarDatos ',error);
		}
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
		return this.formPoliticsGroup.get('acceptPolitics')!;
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
