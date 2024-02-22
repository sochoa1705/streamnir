import { EventEmitter, Injectable } from '@angular/core';
import { FareBreakDown as FareBreakDownUpSell } from '../models/rq-checkout-up-sell';
import { environment } from 'src/environments/environment';
import { GlobalComponent } from 'src/app/shared/global';
import { dataInitBooking } from 'src/app/shared/constant-init';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import moment from 'moment';
import { REmail } from '../models/rq-checkout-email';
import { RPurchare } from '../models/rq-checkout-save-booking';
import { RDiscount, RDiscountCupon } from '../models/rq-checkout-discount';
import { RContact } from '../models/rq-checkout-contact';
import { IValidateBooking, RValidateBooking } from '../models/rq-checkout-validate-booking';
import { Billing, Contact, Passenger, passengerInfoInit, PassengersInfo } from '../models/rq-checkout-passengers';
import { Payment, paymentInit } from '../models/rq-checkout-payment';
import { IDiscountResult } from '../models/rq-openpay-discount';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
	constructor(
		private _httpClient: HttpClient
	) {}
	selectUpSell = new EventEmitter();
	changeStep = new EventEmitter();
	isFinishedPay = new EventEmitter();
	applyCupon = new EventEmitter();
	applyBinDiscount = new EventEmitter<IDiscountResult | null>();
	nextPassengerMobile  = new EventEmitter();
	nextPaymentMobile = new EventEmitter();
	updateDataKayak = new EventEmitter();
	
	openModalUnSavedPassenger = new EventEmitter();
	openModalUnSavedPayment = new EventEmitter();

	dataInfoPassengers:PassengersInfo = {...passengerInfoInit};
	dataInfoPayment:Payment = {...paymentInit}

	isSaveDataPassenger=true;
	isSaveDataPayment=true;
	isChangesPayment=false;
	isFinishPayment=false;

	itsIncludeInsurance = false;
	currentIndexStep=0;
	API_KAYAK = 'https://motorvuelos.expertiatravel.com';

	selectUpSellModal() {
		this.setPricingValuesByUpSell();
		this.selectUpSell.emit();
	}

	resetValuesForms(){
		this.isSaveDataPassenger=true;
		this.dataInfoPassengers={...passengerInfoInit};
		this.dataInfoPassengers.passengers=[]
		this.dataInfoPayment={...paymentInit};
		this.isSaveDataPayment=true;
		this.isChangesPayment=false;
		GlobalComponent.paramsSearch = {};
		GlobalComponent.tokenMotorVuelo = '';
		delete dataInitBooking.secure;
		GlobalComponent.appBooking={...dataInitBooking};
		this.currentIndexStep=0;
		this.isFinishPayment=false;
		GlobalComponent.dataSteps=[]
	}

	updateDataPassenger(passenger:Passenger){
		const indexPassenger = this.dataInfoPassengers.passengers.findIndex(object => object.index === passenger.index);
		if(indexPassenger==-1) {
			this.dataInfoPassengers.passengers.push({...passenger});
			this.dataInfoPassengers.passengers.sort((a, b) => a.index - b.index);
		}
		else {
			this.dataInfoPassengers.passengers[indexPassenger]={...passenger}
		}
	}

	updateDataContact(contact:Contact, billing:Billing, acceptPolitics:boolean){
		this.dataInfoPassengers={...this.dataInfoPassengers, contact, billing,acceptPolitics}
	}

	setPricingValuesByUpSell() {
		let taxes = 0;
		let totalPay: number;
		let baseFareADT = 0;
		let baseFareINF = 0;
		let baseFareCNN = 0;
		let baseFareTotal = 0;

		GlobalComponent.upSellSeleted?.fareBreakDowns.forEach((item: FareBreakDownUpSell) => {
			if (item.equivalentCode == 'ADT') baseFareADT = item.baseFare;

			if (item.equivalentCode == 'CNN') baseFareCNN = item.baseFare;

			if (item.equivalentCode == 'INF') baseFareINF = item.baseFare;

			baseFareTotal += item.baseFare * item.quantity;
			taxes +=
				item.taxes.reduce(function (acc, obj) {
					return acc + obj.fareAmount;
				}, 0) * item.quantity;
		});

		totalPay = baseFareTotal + taxes + GlobalComponent.detailPricing.feeNMV + GlobalComponent.detailPricing.feePTA;

		GlobalComponent.detailPricing = {
			...GlobalComponent.detailPricing,
			baseFareADT,
			baseFareINF,
			baseFareCNN,
			taxes,
			totalPay
		};
	}

	totalDaysTravel() {
		const departure = GlobalComponent.appGroupSeleted.departure;
		const returnFlight = GlobalComponent.appGroupSeleted.returns || null;
		let totalDaysTravel: number;
		let dateDeparture: Date;
		let dateArrival: Date;

		if (departure.length == 1 && returnFlight == null) {
			dateArrival = new Date(
				departure[0].segments[0].flightSegments[departure[0].segments[0].flightSegments.length - 1].arrivalDateTime
			);
		} else if (returnFlight !== null) {
			dateArrival = new Date(
				returnFlight.segments[0].flightSegments[returnFlight.segments[0].flightSegments.length - 1].arrivalDateTime
			);
		} else {
			dateArrival = new Date(
				departure[departure.length - 1].segments[0].flightSegments[
					departure[departure.length - 1].segments[0].flightSegments.length - 1
				].arrivalDateTime
			);
		}

		dateDeparture = new Date(departure[0].segments[0].flightSegments[0].departureDateTime);
		totalDaysTravel =
			this.getDiffDays(moment(dateDeparture).format('MM/DD/yyyy'), moment(dateArrival).format('MM/DD/yyyy')) + 1;
		GlobalComponent.totalDaysTravel = totalDaysTravel - 1;
	}

	updateTotalInsurance(status: boolean) {
		this.itsIncludeInsurance = status;
		if (status) this.setSecurePrice();
		if (!status) delete GlobalComponent.appBooking.secure;
		this.selectUpSell.emit();
	}

	setIsDomestic() {
		const departureFlight = GlobalComponent.appGroupSeleted.departure[0];
		const returnFlight = GlobalComponent.appGroupSeleted.returns;
		let country: string[] = [];
		let isDomestic: boolean;
		country.push(departureFlight.originCity.country);
		country.push(departureFlight.destinationCity.country);

		if (returnFlight != null) {
			country.push(returnFlight.originCity.country);
			country.push(returnFlight.destinationCity.country);
		}

		isDomestic = country.filter((x) => x != 'PE').length <= 0;
		GlobalComponent.isDomestic = isDomestic;
	}

	setSecurePrice() {
		const unitPrice = GlobalComponent.isDomestic ? 1.5 : 2.5;
		const totalPrice = GlobalComponent.detailPricing.passengersCount * GlobalComponent.totalDaysTravel * unitPrice;
		const moneyExchange = GlobalComponent.appExchangeRate.amount;
		GlobalComponent.appBooking.secure = {
			unitPrice,
			totalPrice,
			moneyExchange,
			isDomestic: GlobalComponent.isDomestic
		};
	}

	getDiffDays(sDate: string, eDate: string) {
		const startDate = new Date(sDate);
		const endDate = new Date(eDate);
		const Time = endDate.getTime() - startDate.getTime();
		return Time / (1000 * 3600 * 24);
	}

	sendAndSavePay() {
		const url = `${GlobalComponent.isKayak ? this.API_KAYAK : environment.urlApiMotorVuelos}/mv/save-booking`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<RPurchare>(url, GlobalComponent.appBooking, { headers });
	}

	getPromocionalCode(code: string) {
		const credentials = localStorage.getItem('usuario');
		const url = `${GlobalComponent.isKayak ? this.API_KAYAK : environment.urlApiMotorVuelos}/mv/payment/get-promotional-code-by-code?Code=${code}&GroupId=${
			GlobalComponent.appGroupSeleted.id
		}&Email=${credentials ? JSON.parse(credentials).email : ''}&BrandedFareName=${
			GlobalComponent.upSellSeleted?.name || ''
		}`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('not-loading', 'true')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.get<RDiscountCupon>(url, { headers });
	}

	getDiscountByCampaing(bin = '') {
		const url = `${GlobalComponent.isKayak ? this.API_KAYAK
				: environment.urlApiMotorVuelos}/mv/payment/get-discounts?Bin=${bin}&GroupId=${GlobalComponent.appGroupSeleted.id}&IncludeSecure=${(!!GlobalComponent.appBooking.secure)}&PromotionalCode=&BrandedFareName=${GlobalComponent.upSellSeleted?.name || ''}`;
		const headers = new HttpHeaders()
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.get<RDiscount>(url, { headers });
	}

	sendEmailBooking(data: REmail) {
		const url = `${GlobalComponent.isKayak ? this.API_KAYAK : environment.urlApiMotorVuelos}/mv/send-booking`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('not-loading', 'true')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<any>(url, data, { headers });
	}

	getDataContactByLogin(email:string){
		const url = `${GlobalComponent.isKayak ? this.API_KAYAK : environment.urlApiMotorVuelos}/mv/account/get-by-email?email=${email}`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.get<RContact>(url, { headers });
	}

	validateBooking(data:IValidateBooking){
		const url = `${GlobalComponent.isKayak ? this.API_KAYAK : environment.urlApiMotorVuelos}/mv/validate-booking`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<RValidateBooking>(url, data, { headers });
	}

	cancelBooking(cancelBookingRQ:any){
		let url = `${GlobalComponent.isKayak ? this.API_KAYAK : environment.urlApiMotorVuelos}/cancel-booking`;
		const headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<any>(url, cancelBookingRQ, { headers });
	}
}
