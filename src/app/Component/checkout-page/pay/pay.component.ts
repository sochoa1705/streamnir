import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { cuotas } from '../passengers/utils';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { listAgencies, listBanksInternet, listCreditCard, listTypeDocument } from './utils';
import { GlobalComponent } from 'src/app/shared/global';
import { map } from 'rxjs/operators';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { environment } from 'src/environments/environment';
import { RPurchare } from 'src/app/api/api-checkout/models/rq-checkout-save-booking';
import { getBodyEmail } from 'src/app/shared/utils/bodyEmail';
import { ResultCupon } from 'src/app/api/api-checkout/models/rq-checkout-discount';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParamMap, Router } from '@angular/router';
import { Guid } from '../../../shared/utils';
import { PasarelaService } from '../../../api/api-checkout/services/pasarela.service';
import { Payment } from 'src/app/api/api-checkout/models/rq-checkout-payment';
import { Subscription } from 'rxjs';
import { ModalUnsavedComponent } from 'src/app/shared/components/modal-unsaved/modal-unsaved.component';
import { NotificationService } from 'src/app/Services/notification.service';

interface Item {
	value: any;
	name: string;
}
declare let window: any;

@Component({
	selector: 'app-pay',
	templateUrl: './pay.component.html',
	styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit, OnDestroy, AfterViewInit {
	isPayCard = true;
	isPayBank = true;
	getScreenWidth = 0;
	totalCounter = 1;
	formGroupCard: FormGroup;
	formGroupBooking: FormGroup;
	formGroupPolitics: FormGroup;
	formInit: any;
	formInitBilling: any;
	panelOpenState = false;
	urlsTermsAndConditions: any;
	arrayCuotas: Item[] = [];
	isValidCupon = false;
	listTypeDocument = listTypeDocument;
	listCreditCard = listCreditCard;
	listBanksInternet = listBanksInternet;
	listAgencies = listAgencies;
	codeSafetyPay = 0;
	showMessagePay = false;
	isValidPromotionalCode = false;
	isApplyCupon = false;
	isClickButtonCode = false;
	textErrorCupon = 'Código inválido';
	transactionId = 0;
	discountCupon: ResultCupon | null = null;
	counter = 0;
	errorMessDefault =
		'No se puede generar la compra de los itinerarios seleccionados, favor de seleccionar otro itinerario.';
	isKayak = false;
	initialValuesPayment: Payment;

	@ViewChild('acoordio1') acoordio1: ElementRef;
	@Input() paramMap: ParamMap;

	formCreditCard = {
		cardNumber: new FormControl(''),
		cvv: new FormControl(''),
		expiration: new FormControl(''),
		documentNumber: new FormControl(''),
		documentType: new FormControl(''),
		cardOwner: new FormControl(''),
		city: new FormControl(''),
		address: new FormControl(''),
		numberQuotes: new FormControl(0),
		email: new FormControl(''),
		counter: new FormControl(this.totalCounter)
	};

	credentials = localStorage.getItem('usuario');

	formBooking = {
		CuponPromoWeb: new FormControl('', Validators.minLength(6)),
		generateTicket: new FormControl(false),
		paymentType: new FormControl(0),
		deviceSessionId: new FormControl('')
	};

	disabledCuotes = true;

	formSubscriptionPolitics: Subscription;
	formSubscriptionBooking: Subscription;
	formSubscriptionCreditCard: Subscription;
	openModalSubscription: Subscription;
	isSendPayment = false;

	@HostListener('window:resize', ['$event'])
	onResize() {
		if (this.getScreenWidth !== window.innerWidth) {
			this.getScreenWidth = window.innerWidth;
		}
	}
	formPolitics = {
		acceptAdvertising: new FormControl(false)
	};

	constructor(
		private _checkoutService: CheckoutService,
		private _pasarelaService: PasarelaService,
		private _modalService: NgbModal,
		private _notification: NotificationService,
		private _router: Router
	) {
		this.formGroupCard = new FormGroup(this.formCreditCard);
		this.formGroupBooking = new FormGroup(this.formBooking);
		this.formGroupPolitics = new FormGroup(this.formPolitics);
		this.formInit = this.formGroupCard.value;
		this.openModalSubscription = this._checkoutService.openModalUnSavedPayment.subscribe({
			next: () => this.openModalUnsaved()
		});

		this._checkoutService.nextPaymentMobile.subscribe({
			next: () => {
				if (!this.isSendPayment) {
					this.isSendPayment = true;
					this.sendPayment();
				}
			}
		});
	}

	ngOnInit() {
		this.initConfigurationOpenPay(false);
		this._modalService.dismissAll();
		this.isKayak = GlobalComponent.isKayak;
		this.counter = 0;
		this.setCuotas();
		this.chageTypeDocument();
		this.changeCupon();
		this.setValidatorsCreditCard();
		this.initialValuesPayment = { ...this._checkoutService.dataInfoPayment };
		this.getScreenWidth = window.innerWidth;
		if (this._checkoutService.isChangesPayment) {
			this.setValuesInit();
			this.setValidatorsCreditCard();
		}
	}

	ngAfterViewInit() {
		this.formSubscriptionCreditCard = this.formGroupCard.valueChanges.subscribe(() => {
			this.isChangeForms('creditCard');
		});

		this.formSubscriptionBooking = this.formGroupBooking.valueChanges.subscribe(() => {
			this.isChangeForms('booking');
		});

		this.formSubscriptionPolitics = this.formGroupPolitics.valueChanges.subscribe(() => {
			this.isChangeForms('acceptPolitics');
		});
	}

	isChangeForms(form: string) {
		this.initialValuesPayment.booking.deviceSessionId = this.deviceSessionIdField.value;
		const data = this.initialValuesPayment;
		let isChange = false;
		if (form == 'acceptPolitics') isChange = data.acceptAdvertising !== this.acceptPoliticsField.value;
		if (form == 'creditCard') isChange = JSON.stringify(data.creditCard) !== JSON.stringify(this.formGroupCard.value);
		if (form == 'booking') isChange = JSON.stringify(data.booking) !== JSON.stringify(this.formGroupBooking.value);
		if (isChange) this._checkoutService.isSaveDataPayment = false;
	}

	setValuesInit() {
		const data = this._checkoutService.dataInfoPayment;
		this.formGroupCard.setValue(data.creditCard);
		this.formGroupBooking.setValue(data.booking);
		this.acceptPoliticsField.setValue(data.acceptAdvertising);
		this.isPayCard = data.booking.paymentType == 0 ? true : false;
		if (this.cuponPromoWebField.value !== '') {
			this.isValidPromotionalCode = true;
			this.isApplyCupon = true;
		}
	}

	changeCupon() {
		this.cuponPromoWebField.valueChanges
			.pipe(
				map((search) => {
					this.textErrorCupon = 'Código inválido';
					search?.toLowerCase().trim();
					if (this.isClickButtonCode) {
						this.resetDiscountByCupon();
						this.discountCupon = null;
						if (this.isApplyCupon) {
							this.isApplyCupon = false;
							this._checkoutService.applyCupon.emit(null);
						}
						this.isClickButtonCode = false;
					}
				})
			)
			.subscribe();
	}

	private initConfigurationOpenPay(isSubmit: boolean) {
		console.log(GlobalComponent.currency, 'currency');
		let data: any = {
			MuteExceptions: false,
			TrackingCode: Guid(),
			Caller: {
				Company: GlobalComponent.appCompany,
				Application: GlobalComponent.appApplication
			},
			Parameter: {
				Currency: GlobalComponent.currency,
				Company: GlobalComponent.appCompany,
				Application: GlobalComponent.appApplication
			}
		};
		this._pasarelaService.getInfoTypePayment(data).subscribe({
			next: (res) => {
				if (res.State?.Ok) {
					try {
						this.disabledCuotes = !res.Result?.ResponseProcessInfoPaymentOptions?.IsActiveCuote || false;
						if (res.Result?.ResponseProcessInfoPaymentOpenPay) {
							window.OpenPay.setId(res.Result?.ResponseProcessInfoPaymentOpenPay?.ID);
							window.OpenPay.setApiKey(res.Result?.ResponseProcessInfoPaymentOpenPay?.Username);
							window.OpenPay.setSandboxMode(environment.openPayConfiguration.isProduction);
							let data = window.OpenPay.deviceData.setup();
							this.deviceSessionIdField.setValue(data);
							if (isSubmit) this.proccessPayment();
						}
					} catch (error) {
						this.deviceSessionIdField.setValue('');
						if (isSubmit) this.proccessPayment();
					}
				}
			},
			error: () => {
				this.deviceSessionIdField.setValue('');
				if (isSubmit) this.proccessPayment();
			}
		});
	}

	validCuponWeb() {
		const search = this.cuponPromoWebField.value.trim();
		this.isClickButtonCode = true;
		this.textErrorCupon = 'Código inválido';
		if (search.length < 6) {
			this.cuponPromoWebField.setErrors({ incorrect: true });
		} else {
			this._checkoutService.getPromocionalCode(search).subscribe({
				next: (response) => {
					if (response.result || !!response) {
						if (response.result.isSuccess) {
							this.isValidPromotionalCode = true;
							this.discountCupon = response.result;
							if (this.discountCupon && this.isValidPromotionalCode) {
								this.isApplyCupon = true;
								this._checkoutService.applyCupon.emit(this.discountCupon);
							} else this.resetDiscountByCupon();
						} else this.setErrorCupon(response.result.message);
					} else this.setErrorCupon('Código inválido');
				},
				error: (err) => {
					console.log(err);
					this.setErrorCupon('Código inválido');
				}
			});
		}
	}

	setErrorCupon(message: string) {
		this.textErrorCupon = message;
		this.cuponPromoWebField.setErrors({ incorrect: true });
		this.resetDiscountByCupon();
	}

	resetDiscountByCupon() {
		this.isValidPromotionalCode = false;
		this.discountCupon = null;
		this._checkoutService.dataInfoPayment.booking.CuponPromoWeb = '';
		if (this.isApplyCupon) {
			this.isApplyCupon = false;
			this._checkoutService.applyCupon.emit(null);
		}
	}

	cleanInputCodeCupon() {
		//Esto se ejecuta cuando el usuario decide volver al paso 2 y cambiar de tarifa
		this.cuponPromoWebField.setValue('');
		this.resetDiscountByCupon();
	}

	setCuotas() {
		this.arrayCuotas = cuotas.map((item) => {
			return { name: item == 0 ? 'Sin cuotas' : item.toString(), value: item };
		});
	}

	clickTab() {
		if (this.counter < 4) {
			if (!this.isKayak) this.isPayCard = !this.isPayCard;
			this.paymentTypeField.setValue(this.isPayCard ? 0 : 1);
		} else {
			this.isPayCard = false;
			this.paymentTypeField.setValue(1);
		}
		this.setValidatorsCreditCard();
	}

	setValidatorsCreditCard() {
		if (this.isPayCard) {
			this.cardNumberField.setValidators([Validators.required, Validators.pattern(/^.{19,}$/)]);
			this.expirationField.setValidators([Validators.required, Validators.pattern(/^.{5,}$/)]);
			this.cvvField.setValidators([Validators.required, Validators.pattern(/^.{3,}$/)]);
			this.cardOwnerField.setValidators([Validators.required]);
			this.cityField.setValidators([Validators.required]);
			this.addressField.setValidators([Validators.required]);
			this.documentTypeField.setValidators([Validators.required]);
			this.documentNumberField.setValidators([Validators.required]);
		} else {
			this.cardNumberField.clearValidators();
			this.expirationField.clearValidators();
			this.cvvField.clearValidators();
			this.cardOwnerField.clearValidators();
			this.cityField.clearValidators();
			this.addressField.clearValidators();
			this.documentTypeField.clearValidators();
			this.documentNumberField.clearValidators();
			this.formGroupCard.reset(this.formInit);
		}
	}

	chageTypeDocument() {
		this.documentTypeField.valueChanges.subscribe((res) => {
			if (res !== '' && this.isPayCard) {
				this.documentNumberField.clearValidators();
				const regexNroDocument = this.documentTypeField.value == 0 ? /^\d{8}(?:[-\s]\d{4})?$/ : /^[A-Za-z0-9]{7,12}$/;
				this.documentNumberField.setValidators([Validators.required, Validators.pattern(regexNroDocument)]);
				this.documentTypeField.setValidators(Validators.required);
			}
		});
	}

	sendPayment() {
		if (this.formGroupCard.valid) {
			if (this.paymentTypeField.value == 0 || this.counter >= 4) this.counter++;
			if (this.counter == 4) {
				this.openModalError(
					'Has alcanzado el límite máximo de intentos con tu Tarjeta. A continuación, podrás completar tu pago utilizando nuestro método de pago Safetypay.'
				);
				this.paymentTypeField.setValue(1);
				this.isPayCard = false;
				this.isSendPayment = false;
			} else this.initConfigurationOpenPay(true);
		} else {
			this.showErrorForm();
			this.isSendPayment = false;
		}
	}

	showErrorForm() {
		this.formGroupCard.markAllAsTouched();
		window.scroll({ top: 0, behavior: 'smooth' });
		this._notification.showNotificacion(
			'Datos sin completar',
			'Parece que algunos de tus datos son inválidos. Por favor, inténtalo nuevamente.',
			7
		);
	}

	proccessPayment() {
		const dataFormCredit: any = this.isPayCard
			? {
					...this.formGroupCard.value,
					documentType: Number(this.documentTypeField.value),
					cardNumber: this.cardNumberField.value.replace(/[\s-]/g, ''),
					expiration: this.expirationField.value,
					numberQuotes: Number(this.numberQuotesField.value),
					counter: this.counter
			  }
			: {
					documentType: null,
					numberQuotes: Number(this.numberQuotesField.value),
					counter: this.counter
			  };
		const previewData = GlobalComponent.appBooking;
		GlobalComponent.appBooking = {
			...previewData,
			...this.formGroupBooking.value,
			groupId: GlobalComponent.appGroupSeleted.id,
			contact: { ...previewData.contact },
			customer: {
				username: previewData.contact.email,
				firstName: previewData.contact.name,
				lastName: previewData.contact.lastName,
				motherLastname: previewData.contact.motherLastname,
				address: 'Lima - Peru',
				email: previewData.contact.email
			},
			card: dataFormCredit
		};

		this._checkoutService.isSaveDataPayment = true;
		this._checkoutService.sendAndSavePay().subscribe({
			next: (res) => {
				if (res.confirmed) {
					this.showMessagePay = true;
					this.codeSafetyPay = Number(res.resultPasarela?.Transaction_id || res.ciP_SafetyPAY);
					window.scroll({ top: 0, behavior: 'smooth' });
					this.transactionId = res.idCotizacion;
					this.sendEmail(res);
				} else this.openModalError(this.errorMessDefault);
				this.isSendPayment = false;
			},
			error: (err) => {
				this.openModalError(this.getMessageErrorClient(err));
				this.isSendPayment = false;
			}
		});
	}

	sendEmail(purchare: RPurchare) {
		const montoTotalDsto =
			this.isApplyCupon && this.isValidPromotionalCode
				? this.discountCupon?.montoDescuento
				: GlobalComponent.discountCampaing
				? GlobalComponent.discountCampaing.result.amountDiscount
				: 0;
		const bodyEmail = getBodyEmail(purchare, montoTotalDsto);
		this._checkoutService.sendEmailBooking(bodyEmail).subscribe({
			next: () => {},
			error: () => {}
		});
	}

	openModalError(message: string) {
		const modalRef = this._modalService.open(ModalErrorComponent, {
			centered: true,
			backdrop: 'static',
			windowClass: 'modal-detail-error'
		});
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.isRedirect = this.counter == 4 ? false : true;
		modalRef.componentInstance.txtButton = this.counter == 4 ? 'Aceptar' : 'Volver al inicio';
	}

	getMessageErrorClient(error: any): string {
		switch (error.errorCode) {
			case 1001:
				return 'No se puede generar la compra de los itinerarios seleccionados, favor de seleccionar otro itinerario.';
			case 1002:
				return 'La tarifa ya no se encuentra disponible, favor de realizar una nueva búsqueda.';
			case 2001:
				return 'La tarjeta de crédito no es válida.';
			case 2002:
				return 'La fecha de expiración de la tarjeta de crédito no es válida.';
			case 2003:
				return 'El código de seguridad o la fecha de expiración estaba inválido.';
			case 2004:
				return 'La cuenta no tenía fondos suficientes.';
			case 2100:
				if (error.messages !== null && error.messages.length > 0 && error.messages[0] !== null)
					return error.messages[0];
				else
					return this.paymentTypeField.value == 0
						? 'La tarjeta no ha podido ser procesada. Por favor, verifica los datos ingresados.'
						: this.errorMessDefault;
			case 10000:
				return this.paymentTypeField.value == 0
					? 'La tarjeta no ha podido ser procesada. Por favor, verifica los datos ingresados.'
					: this.errorMessDefault;
			case 2101:
				return 'No se puede realizar el pago correctamente.';
			default:
				return (error.messages?.map((c: any) => c) ?? [this.errorMessDefault]).join(' - ');
		}
	}

	openModalUnsaved() {
		const modalRef = this._modalService.open(ModalUnsavedComponent, {
			centered: true,
			backdrop: 'static'
		});
		modalRef.result.then((result) => {
			if (result == 'saved') {
				if (this.formGroupCard.valid) {
					const cuponWeb = this.isValidPromotionalCode ? this.cuponPromoWebField.value : '';
					this._checkoutService.dataInfoPayment = {
						booking: { ...this.formGroupBooking.value, CuponPromoWeb: cuponWeb },
						creditCard: { ...this.formGroupCard.value },
						acceptAdvertising: this.acceptPoliticsField.value
					};
					this.nextNavigate();
				} else this.showErrorForm();
			}

			if (result == 'dont-save') this.nextNavigate();
		});
	}

	nextNavigate() {
		this._checkoutService.isSaveDataPayment = true;
		this._checkoutService.isChangesPayment = true;
		const index = this._checkoutService.currentIndexStep;
		this._router.navigateByUrl(index == 0 ? '/booking' : index == -1 ? '/' : '/booking/pasajeros');
	}

	ngOnDestroy() {
		this.formSubscriptionBooking.unsubscribe();
		this.formSubscriptionCreditCard.unsubscribe();
		this.formSubscriptionPolitics.unsubscribe();
		this.openModalSubscription.unsubscribe();
		this._modalService.dismissAll();
	}

	get cardNumberField(): AbstractControl {
		return this.formGroupCard.get('cardNumber')!;
	}

	get cvvField(): AbstractControl {
		return this.formGroupCard.get('cvv')!;
	}

	get documentNumberField(): AbstractControl {
		return this.formGroupCard.get('documentNumber')!;
	}

	get expirationField(): AbstractControl {
		return this.formGroupCard.get('expiration')!;
	}

	get documentTypeField(): AbstractControl {
		return this.formGroupCard.get('documentType')!;
	}

	get cardOwnerField(): AbstractControl {
		return this.formGroupCard.get('cardOwner')!;
	}

	get cityField(): AbstractControl {
		return this.formGroupCard.get('city')!;
	}

	get addressField(): AbstractControl {
		return this.formGroupCard.get('address')!;
	}

	get numberQuotesField(): AbstractControl {
		return this.formGroupCard.get('numberQuotes')!;
	}

	get couterField(): AbstractControl {
		return this.formGroupCard.get('counter')!;
	}

	get cuponPromoWebField(): AbstractControl {
		return this.formGroupBooking.get('CuponPromoWeb')!;
	}

	get paymentTypeField(): AbstractControl {
		return this.formGroupBooking.get('paymentType')!;
	}

	get deviceSessionIdField(): AbstractControl {
		return this.formGroupBooking.get('deviceSessionId')!;
	}

	get acceptPoliticsField(): AbstractControl {
		return this.formGroupPolitics.get('acceptAdvertising')!;
	}
}
