import { Component, OnInit } from '@angular/core';
import { dataUpSell } from './utils';
import {
	Departure,
	FareBreakDown,
	Group,
	PricingDetail,
	Returns,
	Segment
} from 'src/app/api/api-checkout/models/rq-checkout-search';
import { Step } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/shared/global';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { dataSteps } from 'src/app/shared/constant-init';

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
	dataSteps: Step[] = [];
	showGoingDropdown = false;
	showLapDropdown = false;
	classFligh = '';

	fareBreakDowns: FareBreakDown;
	totalInsurance = 0;
	totalDaysTravel = 0;
	departure: Departure[] = [];
	segments: Segment[] = [];
	return: Returns | null;
	nameUpSellSelect = '';
	detailFlight: Group;

	//Detalle Vuelo

	segmentDeparture: any[] = [];
	segmentReturn: any;

	pricing: PricingDetail;
	showButtonReturn = false;
	codeSafetyPay = 0;

	constructor(
		private _checkoutService: CheckoutService,
		private _router: Router,
		private _searchService: SearchService
	) {
		this._checkoutService.selectUpSell.subscribe({
			next: () => {
				this.nameUpSellSelect = GlobalComponent.upSellSeleted?.name || '';
				this.totalInsurance = GlobalComponent.appBooking.secure ? GlobalComponent.appBooking.secure.totalPrice : 0;
				console.log( GlobalComponent.appBooking.secure, 'pas')
				this.pricing = GlobalComponent.detailPricing; //actualizamos los precios con el upsell seleccionado
			}
		});
		this._checkoutService.isFinishedPay.subscribe({
			next: (codeSaftyPay: number = 0) => {
				this.codeSafetyPay = codeSaftyPay;
				this.showButtonReturn = true;
			}
		});
	}

	ngOnInit() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
		this.dataSteps = dataSteps;
		this.detailFlight = GlobalComponent.appGroupSeleted;
		this.pricing = GlobalComponent.detailPricing;
	}

	//Verficar si aún esta disponible el grupoid

	getUpSellGroup() {
		this._searchService.getUpSellGroup().subscribe({
			next: () => {
				this.nameUpSellSelect = GlobalComponent.upSellSeleted?.description || '';
			}
		});
	}

	redirectHome() {
		this._router.navigateByUrl('/');
	}
}
