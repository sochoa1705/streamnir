import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { cuotas } from '../passengers/utils';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { listAgencies, listBanksInternet, listCreditCard, listTypeDocument } from './utils';
import { GlobalComponent } from 'src/app/shared/global';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { environment } from 'src/environments/environment';
import { RPurchare } from 'src/app/api/api-checkout/models/rq-checkout-save-booking';
import { getBodyEmail } from 'src/app/shared/utils/bodyEmail';
import { ResultCupon } from 'src/app/api/api-checkout/models/rq-checkout-discount';
import { IValidateBooking, RValidateBooking } from 'src/app/api/api-checkout/models/rq-checkout-validate-booking';
import { getBodyValidateBooking } from 'src/app/shared/utils/bodyValidateBooking';

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
export class PayComponent implements OnInit {
	isPayCard = true;
	isPayBank = true;
	totalCounter = 1;
	formGroupCard: FormGroup;
	formGroupBooking: FormGroup;
	formGroupPolitics: FormGroup;
	formInit: any;
	formInitBilling: any;
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
	transactionId = 0;
	discountCupon: ResultCupon | null = null;
	counter = 0;

	private destroy$ = new Subject<unknown>();
	modalDialogError: MatDialogRef<ModalErrorComponent>;
	formCreditCard = {
		cardNumber: new FormControl(''),
		cvv: new FormControl(''),
		expiration: new FormControl(''),
		documentNumber: new FormControl(''),
		documentType: new FormControl(0),
		cardOwner: new FormControl(''),
		city: new FormControl(''),
		address: new FormControl(''),
		numberQuotes: new FormControl(0),
		email: new FormControl(''),
		counter: new FormControl(this.totalCounter)
	};

	credentials = localStorage.getItem('usuario');

	formBooking = {
		CuponPromoWeb: new FormControl(''),
		generateTicket: new FormControl(false),
		paymentType: new FormControl(0),
		deviceSessionId: new FormControl('')
	};

	formPolitics = {
		acceptAdvertising: new FormControl(false)
	};

	constructor(
		private _checkoutService: CheckoutService,
		public _matDialog: MatDialog,
		private _searchService: SearchService
	) {
		this.formGroupCard = new FormGroup(this.formCreditCard);
		this.formGroupBooking = new FormGroup(this.formBooking);
		this.formGroupPolitics = new FormGroup(this.formPolitics);
		this.formInit = this.formGroupCard.value;
	}

	ngOnInit() {
		this.setCuotas();
		this.chageTypeDocument();
		this.urlsTermsAndConditions = this._checkoutService.getLinksTermsAndConditions();
		this.changeCupon();
		this.initConfigurationOpenPay();
		this.setValidatorsCreditCard();
	}

	changeCupon() {
		this.cuponPromoWebField.valueChanges
			.pipe(
				map((search) => search?.toLowerCase().trim()),
				filter((search) => search !== '' && search !== undefined && search?.length > 1),
				debounceTime(500),
				tap((search) => this.validCuponWeb(search)),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	private initConfigurationOpenPay() {
		try {
			window.OpenPay.setId(environment.openPayConfiguration.Id);
			window.OpenPay.setApiKey(environment.openPayConfiguration.ApiKey);
			let data = window.OpenPay.deviceData.setup();
			this.deviceSessionIdField.setValue(data);
		} catch (error) {
			this.deviceSessionIdField.setValue('');
		}
	}

	validCuponWeb(search: string) {
		this._checkoutService.getPromocionalCode(search).subscribe({
			next: (response) => {
				console.log(response);
				if (response.result.isSuccess) {
					this.isValidPromotionalCode = true;
					this.discountCupon = response.result;
				} else this.resetDiscountByCupon();
			},
			error: (err) => {
				this.resetDiscountByCupon();
			}
		});
	}

	resetDiscountByCupon() {
		this.isValidPromotionalCode = false;
		this.discountCupon = null;
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

	applyCupon() {
		if (this.discountCupon && this.isValidPromotionalCode) {
			this.isApplyCupon = true;
			this._checkoutService.applyCupon.emit(this.discountCupon);
		}
	}

	clickTab() {
		this.isPayCard = !this.isPayCard;
		this.paymentTypeField.setValue(this.isPayCard ? 0 : 1);
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
				this.documentNumberField.setValue('');
				this.documentNumberField.clearValidators();
				const regexNroDocument = this.documentTypeField.value == 0 ? /^\d{8}(?:[-\s]\d{4})?$/ : /^[A-Za-z0-9]{7,12}$/;
				this.documentNumberField.setValidators([Validators.required, Validators.pattern(regexNroDocument)]);
			}
		});
	}

	validateBooking() {
		const bodyValidateBooking: IValidateBooking = getBodyValidateBooking();
		this._checkoutService.validateBooking(bodyValidateBooking).subscribe({
			next: (res) => {
				if (res.success) this.sendPayment();
				else this.openModalError(this.getMessageValidateError(res));
			},
			error: (err) => {
				this.openModalError(this.getMessageErrorClient(err.error));
			}
		});
	}

	getMessageValidateError(res: RValidateBooking) {
		if (res.isChurning)
			return 'Ud. ha excedido el número máximo de reservas generadas. Por favor, contactarse a nuestro Call Center.';
		if (res.isDuplicate) {
			if (res.isMT)
				return (
					'Ya ha realizado una reserva con las mismas fechas y horarios (Códigos ' +
					res.bookings[0].pnrDuplicate +
					',' +
					res.bookings[1].pnrDuplicate +
					"). Si deseas cancelar las reservas anteriores y generar una nueva por favor pulsa el boton 'Aceptar' de la parte inferior."
				);
			else
				return (
					'Ya ha realizado una reserva con las mismas fechas y horarios (Código ' +
					res.bookings[0].pnrDuplicate +
					"). Si deseas cancelar la reserva anterior y generar una nueva por favor pulsa el boton 'Aceptar' de la parte inferior."
				);
		}
		return '';
	}

	sendPayment() {
		this.counter++;
		const dataFormCredit: any =
			this.isPayCard && this.counter <= 4
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
		if(this.counter > 4){
			this.paymentTypeField.setValue(1);
		}

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

		this._checkoutService.sendAndSavePay().subscribe({
			next: (res) => {
				if (res.confirmed) {
					this.showMessagePay = true;
					this.codeSafetyPay = res.ciP_SafetyPAY;
					this.transactionId = res.idCotizacion;
					this.sendEmail(res);
				} else {
					this.openModalError('Al parecer hubo un error en su reserva, por favor intentelo más tarde');
				}
			},
			error: (err) => {
				this.openModalError(this.getMessageErrorClient(err));
			}
		});
	}

	sendEmail(purchare: RPurchare) {
		const montoTotalDsto = this.isApplyCupon && this.isValidPromotionalCode
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
		this.modalDialogError = this._matDialog.open(ModalErrorComponent, {
			disableClose: true
		});
		this.modalDialogError.componentInstance.message = message;
		this.modalDialogError.componentInstance.isRedirect = true;
		this.modalDialogError.componentInstance.txtButton = 'Volver al inicio';
	}

	private getMessageErrorClient(error: any): string {
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
				if (error.messages != null && error.messages.length > 0) {
					return error.messages[0];
				} else
					return 'La tarjeta no ha podido ser procesada. Por favor, verifica los datos ingresados o de lo contrario selecciona otra forma de pago.';
			case 2101:
				return 'No se puede realizar el pago correctamente.';
			default:
				return (
					error.messages?.map((c: any) => c) ?? [
						'No se puede generar la compra de los itinerarios seleccionados, favor de seleccionar otro itinerario.'
					]
				).join(' - ');
		}
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
		return this.formGroupPolitics.get('acceptPolitics')!;
	}
}
