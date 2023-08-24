import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
	Departure,
	FareBreakDown,
	Group,
	PricingDetail,
	Returns,
	Segment
} from 'src/app/api/api-checkout/models/rq-checkout-search';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/shared/global';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { dataSteps } from 'src/app/shared/constant-init';
import { Result, ResultCupon } from 'src/app/api/api-checkout/models/rq-checkout-discount';
import { PayComponent } from './pay/pay.component';

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
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

	indexStepActive = 0;
	isSafetyPay=false;
	discount:Result;
	totalDiscountCupon=0;
	isShowDiscount=false;
	isShowDiscountCupon=false;

	@ViewChild('childPagePay')
	childPagePay!: PayComponent;

	constructor(
		private _checkoutService: CheckoutService,
		private _router: Router
	) {
		this._checkoutService.selectUpSell.subscribe({
			next: () => {
				this.nameUpSellSelect = GlobalComponent.upSellSeleted?.name || '';
				this.totalInsurance = GlobalComponent.appBooking.secure ? GlobalComponent.appBooking.secure.totalPrice : 0;
				this.pricing = GlobalComponent.detailPricing; //actualizamos los precios con el upsell seleccionado
				this.getDiscounts(); //volvemos a ver si hay descuento para ese tarifario
			}
		});
		this._checkoutService.isFinishedPay.subscribe({
			next: (res:any) => {
				this.codeSafetyPay=res.transactionId;
				this.isSafetyPay=!res.isPayCard;
				this.showButtonReturn = true;
			}
		});
		this._checkoutService.applyCupon.subscribe({
			next: (res:ResultCupon | null) => {
				this.isShowDiscount=false;
				if(res){
					this.isShowDiscountCupon=true;
					this.totalDiscountCupon=res.montoDescuento;
				}else{
					this.isShowDiscountCupon=false;
					this.totalDiscountCupon=0;
					if(GlobalComponent.discountCampaing){
						this.isShowDiscount=true;
					}
				}
			}
		})
	}

	ngOnInit() {
		this.detailFlight = GlobalComponent.appGroupSeleted;
		this.pricing = GlobalComponent.detailPricing;
		this._checkoutService.totalDaysTravel();
		this._checkoutService.setIsDomestic();
		this.getDiscounts();
	}

	clickedStep($event: any) {
		switch ($event) {
			case 0:
				this.indexStepActive = 0;
				break;
			case 1:
				if (dataSteps[1].active == true && dataSteps[0].check) this.indexStepActive = 1;
				break;
			default:
				if (dataSteps[2].active == true && dataSteps[1].check && dataSteps[0].check) this.indexStepActive = 2;
				break;
		}
	}

	getDiscounts(){
		this._checkoutService.getDiscountByCampaing().subscribe({
			next:(res)=>{
				if(res.result.isSuccess){
					GlobalComponent.discountCampaing=res;
					this.discount=res.result;
					this.isShowDiscount=true;
					if(this.isShowDiscountCupon){
						this.isShowDiscountCupon=false;
						this.totalDiscountCupon=0;
						this.childPagePay.cleanInputCodeCupon();
					}
				}else this.isShowDiscount=false;
			},error:()=>{
				this.isShowDiscount=false;
			}
		})
	}

	redirectHome() {
		this._router.navigateByUrl('/');
	}
}
