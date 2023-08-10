import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { cuotas } from '../passengers/utils';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { listAgencies, listBanksInternet, listCreditCard, listTypeDocument } from './utils';
import { GlobalComponent } from 'src/app/shared/global';
interface Item {
	value: any;
	name: string;
}
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
	formGroupBilling: FormGroup;
	formGroupPolitics: FormGroup;
	formInit: any;
	formInitBilling:any;
	urlsTermsAndConditions:any;
	arrayCuotas: Item[] = [];
	isValidCupon = false;
	listTypeDocument=listTypeDocument;
	listCreditCard=listCreditCard;
	listBanksInternet=listBanksInternet;
	listAgencies=listAgencies;
	codeSafetyPay=0;
	showMessagePay=false;
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

	formBilling = {
		isBilling: new FormControl(false),
		ruc: new FormControl(''),
		company: new FormControl(''),
		companyName: new FormControl(''),
		companyAddress:new FormControl(''),
		subCode: new FormControl(0),
		idLoggin: new FormControl(0),
	};

	formBooking={
		CuponPromoWeb: new FormControl(''),
		generateTicket: new FormControl(false),
		paymentType: new FormControl(0),
		deviceSessionId: new FormControl('')
	}

	formPolitics={
		acceptPolitics: new FormControl(false, Validators.requiredTrue),
		acceptAdvertising: new FormControl(false),
	}

	constructor(private _checkoutService: CheckoutService) {
		this.formGroupCard = new FormGroup(this.formCreditCard);
		this.formGroupBooking = new FormGroup(this.formBooking);
		this.formGroupBilling = new FormGroup(this.formBilling);
		this.formGroupPolitics = new FormGroup(this.formPolitics)
		this.formInit = this.formGroupCard.value;
		this.formInitBilling = this.formGroupBilling.value;
	}

	ngOnInit() {
		this.setCuotas();
		this.chageTypeDocument();
		this.urlsTermsAndConditions=this._checkoutService.getLinksTermsAndConditions();
	}

	setCuotas() {
		this.arrayCuotas = cuotas.map((item) => {
			return { name: item.toString(), value: item };
		});
	}

	applyCupon() {}

	clickTab(){
		this.isPayCard=!this.isPayCard;
		this.paymentTypeField.setValue(this.isPayCard ? 0 : 1);
		this.setValidatorsCreditCard();
	}

	setValidatorsCreditCard(){
		if(this.isPayCard){
			this.cardNumberField.setValidators([Validators.required, Validators.pattern(/^.{19,}$/)])
			this.expirationField.setValidators([Validators.required])
			this.cvvField.setValidators([Validators.required, Validators.pattern(/^.{3,}$/)])
			this.cardOwnerField.setValidators([Validators.required])
			this.cityField.setValidators([Validators.required])
			this.addressField.setValidators([Validators.required])
			this.documentTypeField.setValidators([Validators.required])
			this.documentNumberField.setValidators([Validators.required])
		}else{
			this.cardNumberField.clearValidators();
			this.expirationField.clearValidators();
			this.cvvField.clearValidators();
			this.cardOwnerField.clearValidators();
			this.cityField.clearValidators();
			this.addressField.clearValidators();
			this.documentTypeField.clearValidators();
			this.documentNumberField.clearValidators();
			this.formGroupCard.reset(this.formInit)
		}
	}

	changeToogle($event:any){
		if($event){
			this.rucField.setValidators([Validators.required, Validators.pattern(/^.{11,}$/)]);
			this.companyNameField.setValidators(Validators.required);
			this.companyAddressField.setValidators(Validators.required);
			this.formGroupBilling.updateValueAndValidity();
		}else{
			this.rucField.clearValidators();
			this.companyNameField.clearValidators();
			this.companyAddressField.clearValidators();
		}
		this.formGroupBilling.reset({...this.formInitBilling});
		this.isBillingField.setValue($event);
	}

	chageTypeDocument(){
		this.documentTypeField.valueChanges.subscribe((res) => {
			if (res !== '' && this.isPayCard) {
				this.documentNumberField.setValue('');
				this.documentNumberField.clearValidators();
				const regexNroDocument = this.documentTypeField.value == 0 ? /^\d{8}(?:[-\s]\d{4})?$/ : /^[A-Za-z0-9]{7,12}$/;
				this.documentNumberField.setValidators([Validators.required, Validators.pattern(regexNroDocument)]);
			}
		});
	}

	sendPayment(){
		this.companyField.setValue({
			companyName:this.companyNameField.value,
			companyAddress:this.companyAddressField.value
		})
		const dataFormCredit= this.isPayCard ? this.formGroupCard.value :  {
			documentType: null,
			numberQuotes: 0,
			counter: 1
		};

		const dataBilling = this.formGroupBilling.value;
		delete dataBilling.companyName;
		delete  dataBilling.companyAddress;

		const previewData=GlobalComponent.appBooking;
		GlobalComponent.appBooking = {
			...previewData,
			...this.formGroupBooking.value,
			groupId:GlobalComponent.appGroupSeleted.id,
			contact: {...previewData.contact, ... dataBilling},
			customer:{
				username: dataBilling.email,
				firstName: previewData.contact.name,
				lastName: previewData.contact.lastName,
				motherLastname: previewData.contact.motherLastname,
				address: "Lima - Peru",
				email: dataBilling.email
			},
			card:dataFormCredit
		};
		this._checkoutService.sendAndSavePay().subscribe({
			next:(res)=>{
				this.showMessagePay=true;
				this.codeSafetyPay=res.ciP_SafetyPAY;
				console.log(res)
			},
			error:(err)=>{
				console.log(err)
			}
		})
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


	get emailField(): AbstractControl {
		return this.formGroupBilling.get('email')!;
	}

	get isBillingField(): AbstractControl {
		return this.formGroupBilling.get('isBilling')!;
	}

	get rucField(): AbstractControl {
		return this.formGroupBilling.get('ruc')!;
	}

	get companyField(): AbstractControl {
		return this.formGroupBilling.get('company')!;
	}

	get companyNameField(): AbstractControl {
		return this.formGroupBilling.get('companyName')!;
	}

	get companyAddressField(): AbstractControl {
		return this.formGroupBilling.get('companyAddress')!;
	}

	get acceptPoliticsField(): AbstractControl {
		return this.formGroupPolitics.get('acceptPolitics')!;
	}
}
