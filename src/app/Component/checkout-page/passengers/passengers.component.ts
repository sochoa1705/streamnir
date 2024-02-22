import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ContryService } from 'src/app/api/api-nmviajes/services/country-list.service';
import { days, months } from './utils';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { Passenger } from 'src/app/api/api-checkout/models/rq-checkout-booking';
import { CardPassengerComponent } from './card-passenger/card-passenger.component';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { GlobalComponent } from 'src/app/shared/global';
import { AccountsService } from 'src/app/Services/accounts.service';
import { IValidateBooking, RValidateBooking } from 'src/app/api/api-checkout/models/rq-checkout-validate-booking';
import { getBodyValidateBooking } from 'src/app/shared/utils/bodyValidateBooking';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { ModalValidateComponent } from './modal-validate/modal-validate.component';
import { NotificationService } from 'src/app/Services/notification.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalUnsavedComponent } from '../../../shared/components/modal-unsaved/modal-unsaved.component';

interface Item {
	value: any;
	name: string;
}
@Component({
	selector: 'app-passengers',
	templateUrl: './passengers.component.html',
	styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit, OnDestroy, AfterViewInit {
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
	getScreenWidth = 0;
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
	formGroup: FormGroup;
	formBillingGroup: FormGroup;
	formPoliticsGroup: FormGroup;
	credentials = localStorage.getItem('usuario');

	formContact = {
		name: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		motherLastname: new FormControl('', Validators.required),
		phones: new FormControl([]),
		fullPhone: new FormControl(null, Validators.required),
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
	initialValuesPassengers: any;
	errorDefault = 'Al parecer hubo un error al validar su itinerario, por favor intentelo nuevamente';
	isSavePassengerInfo = false;

	formSubscription: Subscription;
	formSubscriptionPolitics: Subscription;
	formSubscriptionBilling: Subscription;
	openModalSubscription: Subscription;

	@ViewChildren(CardPassengerComponent) passengersComponent: QueryList<CardPassengerComponent>;

	constructor(
		private _contryService: ContryService,
		private _checkoutService: CheckoutService,
		private _accountService: AccountsService,
		private _modalService: NgbModal,
		private _notification: NotificationService,
		private _router: Router
	) {
		this.formGroup = new FormGroup(this.formContact);
		this.formBillingGroup = new FormGroup(this.formBilling);
		this.formPoliticsGroup = new FormGroup(this.formPolitics);
		this.initialValues = this.formBillingGroup.value;

		this.openModalSubscription = this._checkoutService.openModalUnSavedPassenger.subscribe({
			next: () => {
				this.openModalUnsaved();
			}
		});

		this._checkoutService.nextPassengerMobile.subscribe({
			next:()=>{
				this.setInfoPassengersInformation();
			}
		})
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
		if (userStorage.email && GlobalComponent.appBooking.passengers.length==0) this.getDataContact(userStorage.email);
		this.getScreenWidth = window.innerWidth;
		this._checkoutService.isSaveDataPassenger = true;
		this.initialValuesPassengers = { ...this._checkoutService.dataInfoPassengers };
		if (GlobalComponent.appBooking.passengers.length > 0) {
			this.setValuesInit();
		}
	}

	ngAfterViewInit() {
		this.formSubscription = this.formGroup.valueChanges.subscribe(() => {
			this.isChangeForms('contact');
		});

		this.formSubscriptionBilling = this.formBillingGroup.valueChanges.subscribe(() => {
			this.isChangeForms('billing');
		});

		this.formSubscriptionPolitics = this.formPoliticsGroup.valueChanges.subscribe(() => {
			this.isChangeForms('acceptPolitics');
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		if (this.getScreenWidth !== window.innerWidth) {
			this.getScreenWidth = window.innerWidth;
		}
	}

	isChangeForms(form: string) {
		const data = this.initialValuesPassengers;
		let isChange = false;
		if (form == 'acceptPolitics') isChange = data.acceptPolitics !== this.acceptPoliticsField.value;
		if (form == 'contact') isChange = JSON.stringify(data.contact) !== JSON.stringify(this.formGroup.value);
		if (form == 'billing') isChange = JSON.stringify(data.billing) !== JSON.stringify(this.formBillingGroup.value);
		if (isChange) this._checkoutService.isSaveDataPassenger = false;
	}

	setValuesInit() {
		const data = this._checkoutService.dataInfoPassengers;
		this.formGroup.setValue(data.contact);
		this.acceptPoliticsField.setValue(data.acceptPolitics);
		this.formBillingGroup.setValue(data.billing);
		this._checkoutService.isSaveDataPassenger = true;
		console.log(this.formGroup.value, 'valueee form :c')
	}

	setArrayDate() {
		this.arrayMonths = months;
		for (let index = 0; index < 3; index++) {
			let yearMin = new Date().getFullYear() - (index == 0 ? 100 : index == 1 ? 11 : 2);
			let yearMax = new Date().getFullYear() - (index == 0 ? 12 : index == 1 ? 2 : 0);

			for (let i = yearMax; i >= yearMin; i--) {
				if (index == 0) this.arrayYearsADT.push({ name: i.toString(), value: i });
				if (index == 1) this.arrayYearsCNN.push({ name: i.toString(), value: i });
				if (index == 2) this.arrayYearsINF.push({ name: i.toString(), value: i });
			}
		}
		this.arrayDays = days.map((item: any) => {
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

	validForms() {
		let isValidCards = false;
		this.passengersComponent.forEach((item: CardPassengerComponent) => {
			item.clickButtonSave();
		});

		if (this.dataStatusCards.every((status) => status)) {
			this.dataPassengers = [];
			this.passengersComponent.forEach((item: CardPassengerComponent) => {
				this.dataPassengers.push(item.getDataForm());
			});
			isValidCards = true;
		}
		return this.formGroup.valid && isValidCards && this.formBillingGroup.valid && this.formPoliticsGroup.valid;
	}

	setInfoPassengersInformation(isRedirect = false) {
		if(!isRedirect) this._checkoutService.currentIndexStep=2;
		if (this.validForms()) {
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
			this._checkoutService.updateDataContact(
				this.formGroup.value,
				this.formBillingGroup.value,
				this.acceptPoliticsField.value
			);
			const keysToRemove = ['acceptPolitics', 'fullPhone', 'companyAddress', 'companyName'];
			keysToRemove.forEach((key) => delete dataContact[key]);
			GlobalComponent.appBooking = {
				...GlobalComponent.appBooking,
				contact: dataContact,
				passengers: this.dataPassengers
			};
			this.isSavePassengerInfo = true;
			this._checkoutService.isSaveDataPassenger = true;
			this.validateBooking(isRedirect);
		} else {
			this.phonesField.setValue([]);
			this.formBillingGroup.markAllAsTouched();
			this.formPoliticsGroup.markAllAsTouched();
			this.formGroup.markAllAsTouched();
			window.scroll({ top: 0, behavior: 'smooth' });
			this._notification.showNotificacion(
				'Datos sin completar',
				'Parece que algunos de tus datos son inválidos. Por favor, inténtalo nuevamente.',
				60
			);
		}
	}

	//Se Inicializa la validacion de cada formulario y su guardado
	setIndexValidCard() {
		const value = GlobalComponent.appBooking.passengers.length > 0;
		for (let i = 0; i < this.totalPassenger; i++) {
			this.dataStatusCards.push(value);
		}
	}
	//Actualiza el estado de cada formulario
	updateValidForm($event: any) {
		this.dataStatusCards[$event.index] = $event.isValid;
		if (this.dataStatusCards.every((status) => status)) {
			this._checkoutService.isSaveDataPassenger = true;
		}
	}

	validateBooking(isRedirect = false) {
		const bodyValidateBooking: IValidateBooking = getBodyValidateBooking();
		this._checkoutService.validateBooking(bodyValidateBooking).subscribe({
			next: (res) => {
				if (res.success) {
					if (isRedirect) this.nextNavigate();
					else this._checkoutService.changeStep.emit(GlobalComponent.userGroupLab === 'A' ? 2 : 1);
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
			error: () => {
				this.openModalError(this.errorDefault);
			}
		});
	}

	getMessageValidateError(res: RValidateBooking) {
		if (res.isDuplicate) {
			if (res.isMT)
				return (
					'Ya ha realizado una reserva con las mismas fechas y horarios (Códigos ' +
					res.bookings[0].pnrDuplicate +
					',' +
					res.bookings[1].pnrDuplicate +
					')'
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
		modalRef.componentInstance.isRedirect = !isSuccessCancel;
		modalRef.componentInstance.txtButton = isSuccessCancel ? 'Aceptar' : 'Volver al inicio';
	}

	openModalErrorValidate(message: string, validateBooking: RValidateBooking | null) {
		const modalRef = this._modalService.open(ModalValidateComponent, {
			centered: true,
			backdrop: 'static',
			size: 'lg',
			windowClass: 'modal-detail-validate'
		});
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.validateBooking = validateBooking;
		modalRef.result.then((result) => {
			if (result == 'success') {
				GlobalComponent.dataSteps[GlobalComponent.userGroupLab === 'A' ? 1 : 0].check = true;
				GlobalComponent.dataSteps[GlobalComponent.userGroupLab === 'A' ? 2 : 1].active = true;
				this._checkoutService.changeStep.emit(GlobalComponent.userGroupLab === 'A' ? 2 : 1);
				this.openModalError('Su reserva anterior, fue cancelada exitosamente', true);
			}
		});
	}

	openModalUnsaved() {
		const modalRef = this._modalService.open(ModalUnsavedComponent, {
			centered: true,
			backdrop: 'static'
		});
		modalRef.result.then((result) => {
			if (result == 'saved') {
				this.setInfoPassengersInformation(true);
			}
			
			if(result == 'dont-save') {
				this._checkoutService.isSaveDataPassenger = true;
				this.nextNavigate();
			}
		});
	}

	nextNavigate() {
		const index = this._checkoutService.currentIndexStep;
		this._router.navigateByUrl(index == 0 ? '/booking' : index == -1 ? '/' : '/booking/pago').then(() => null);
	}

	ngOnDestroy() {
		this.formSubscription.unsubscribe();
		this.formSubscriptionBilling.unsubscribe();
		this.formSubscriptionPolitics.unsubscribe();
		this.openModalSubscription.unsubscribe();
		this._modalService.dismissAll();
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
