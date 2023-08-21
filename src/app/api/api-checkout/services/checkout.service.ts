import { EventEmitter, Injectable } from '@angular/core';
import { IUpSell } from '../models/rq-checkout-up-sell';
import { FareBreakDown as FareBreakDownUpSell } from '../models/rq-checkout-up-sell';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { dataUpSell } from 'src/app/Component/checkout-page/utils';
import { GlobalComponent } from 'src/app/shared/global';
import { dataSteps } from 'src/app/shared/constant-init';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import moment from 'moment';
import { REmail } from '../models/rq-checkout-email';
import { RPurchare } from '../models/rq-checkout-save-booking';
@Injectable({ providedIn: 'root' })
export class CheckoutService {
	constructor(
		private _router: Router,
		private _httpClient: HttpClient
	) {}
	selectUpSell = new EventEmitter();
	changeStep = new EventEmitter();
	isFinishedPay = new EventEmitter();

	itsIncludeInsurance = false;
	upSellSelect: IUpSell = dataUpSell[0];

	selectUpSellModal() {
		this.setPricingValuesByUpSell();
		this.selectUpSell.emit();
	}

	setValueChangeStep(index: number, status: boolean, next = true) {
		dataSteps[index + 1].active = true;
		dataSteps[index].check = status;
		this.changeStep.emit();
	}

	setPricingValuesByUpSell() {
		let taxes = 0;
		let totalPay = 0;
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

	getLinksTermsAndConditions() {
		return {
			urlTermsConditions: environment.urlTermsConditions,
			urlBookingConditions: environment.urlBookingConditions,
			urlTravelDocuments: environment.urlTravelDocuments
		};
	}

	totalDaysTravel() {
		const departure = GlobalComponent.appGroupSeleted.departure;
		const returnFlight = GlobalComponent.appGroupSeleted.returns || null;
		let totalDaysTravel = 0;
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

	//Obs: Multidestino y solo Ida no tienen Seguro, por tanto no se agrega al booking,
	//y el departure de preferencia se pasa la posicion 0
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
		const url = `${environment.urlApiMotorVuelos}/mv/save-booking`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<RPurchare>(url, GlobalComponent.appBooking, { headers });
	}

	getPromocionalCode(code: string) {
		const credentials = localStorage.getItem('usuario');
		const url = `${environment.urlApiMotorVuelos}/mv/payment/get-promotional-code-by-code?Code=${code}&GroupId=${
			GlobalComponent.appGroupSeleted.id
		}&Email=${credentials ? JSON.parse(credentials).email : ''}&BrandedFareName=${
			GlobalComponent.upSellSeleted?.name || ''
		}`;
		const headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.get<any>(url, { headers });
	}

	sendEmailBooking(data:REmail){
		const url = `${environment.urlApiMotorVuelos}/mv/send-booking`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<any>(url, data, { headers });
	}
}
