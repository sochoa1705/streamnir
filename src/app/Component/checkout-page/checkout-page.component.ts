import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
	FareBreakDown,
	Group,
	PricingDetail,
} from 'src/app/api/api-checkout/models/rq-checkout-search';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GlobalComponent } from 'src/app/shared/global';
import { dataSteps } from 'src/app/shared/constant-init';
import { Result, ResultCupon } from 'src/app/api/api-checkout/models/rq-checkout-discount';
import { PayComponent } from './pay/pay.component';
import { BaggageInsuranceComponent } from './baggage-insurance/baggage-insurance.component';
import { PassengersComponent } from './passengers/passengers.component';
import { TokenService } from 'src/app/api/api-nmviajes/services/token.service';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { getPricingFareBreakDowns } from 'src/app/shared/utils/fareBreakDowns';
import { getIndexsSegments } from 'src/app/shared/utils/getIndexSegment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorKayakComponent } from './modal-error-kayak/modal-error-kayak.component';
import { getBodyGTMLoadCheckout } from 'src/app/shared/utils/GMTLoadCheckout';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { setParamsByKayak } from 'src/app/shared/utils/GMTSearchKayak';
@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
	showGoingDropdown = false;
	showLapDropdown = false;
	classFligh = 'Economy';

	fareBreakDowns: FareBreakDown;
	totalInsurance = 0;
	totalDaysTravel = 0;

	nameUpSellSelect = '';
	detailFlight: Group;

	//Detalle Vuelo

	pricing: PricingDetail;
	showButtonReturn = false;
	codeSafetyPay = 0;

	indexStepActive = 0;
	isSafetyPay = false;
	discount: Result;
	totalDiscountCupon = 0;
	isShowDiscount = false;
	isShowDiscountCupon = false;
	indexSegmentSelected:number[]=[];

	paramMap:ParamMap;
  	

	@ViewChild('childPagePay')
	childPagePay!: PayComponent;
	@ViewChild(BaggageInsuranceComponent)
	private baggageInsuranceComponent: BaggageInsuranceComponent;

	triggerChildFunction() {
		if (this.baggageInsuranceComponent) {
			this.baggageInsuranceComponent.nextPage();
		}
	}
	@ViewChild(PassengersComponent)
	private PassengersComponent: PassengersComponent;

	checkAdditionalButtonDisabled(): boolean {
		return (
			this.PassengersComponent &&
			(this.PassengersComponent.dataStatusCards.includes(false) ||
				!this.PassengersComponent.formGroup.valid ||
				!this.PassengersComponent.formBillingGroup.valid ||
				!this.PassengersComponent.formPoliticsGroup.valid)
		);
	}
	triggerChildFunctionPassenger() {
		if (this.PassengersComponent) {
			this.PassengersComponent.setInfoPassengersInformation();
		}
	}

	@ViewChild(PayComponent)
	private PayComponent: PayComponent;


	triggerChildFunctionPayComponent() {
		if (this.PayComponent) {
			this.PayComponent.sendPayment();
		}
	}
	checkAdditionalButtonDisabledPayComponent(): boolean {
		return (
			this.PayComponent &&
			(!this.PayComponent.formGroupCard.valid ||
				!this.PayComponent.formGroupPolitics.valid)
		);
	}

	constructor(
		private _checkoutService: CheckoutService,
		private _router: Router,
		private _routeActivate: ActivatedRoute,
		private _tokenService: TokenService,
		private _searchService: SearchService,
		private _modalService:NgbModal,
		private _gtmService: GoogleTagManagerService
	) {
		this._checkoutService.selectUpSell.subscribe({
			next: () => {
				this.nameUpSellSelect = GlobalComponent.upSellSeleted?.description || '';
				this.totalInsurance = GlobalComponent.appBooking.secure ? GlobalComponent.appBooking.secure.totalPrice : 0;
				this.pricing = GlobalComponent.detailPricing; //actualizamos los precios con el upsell seleccionado
				this.getDiscounts(); //volvemos a ver si hay descuento para ese tarifario
			}
		});
		this._checkoutService.isFinishedPay.subscribe({
			next: (res: any) => {
				this.codeSafetyPay = res.transactionId;
				this.isSafetyPay = !res.isPayCard;
				this.showButtonReturn = true;
			}
		});
		this._checkoutService.applyCupon.subscribe({
			next: (res: ResultCupon | null) => {
				this.isShowDiscount = false;
				if (res) {
					this.isShowDiscountCupon = true;
					this.totalDiscountCupon = res.montoDescuento;
				} else {
					this.isShowDiscountCupon = false;
					this.totalDiscountCupon = 0;
					if (GlobalComponent.discountCampaing) {
						this.isShowDiscount = true;
					}
				}
			}
		})
	}

	ngOnInit() {
		const paramMap = this._routeActivate.snapshot.paramMap;
		if(paramMap.keys.length > 2){
			this.paramMap=paramMap;
			GlobalComponent.isKayak=true;
			this.getParamsKayak();
			this.getIPAdress();
		}
		else this.initCheckout();
	}

	initCheckout(){
		this.indexSegmentSelected = GlobalComponent.indexSegmentSeleted;
		this.detailFlight = GlobalComponent.appGroupSeleted;
		this.pricing = GlobalComponent.detailPricing;
		this.classFligh = GlobalComponent.classFligh;
		this.nameUpSellSelect = GlobalComponent.upSellSeleted?.description || '';
		this._checkoutService.totalDaysTravel();
		dataSteps.forEach((step, index) => {
			step.active = index == 0 ? true : false;
			step.check = false;
		})
		this.getDiscounts();
		this.pushToGTMLoadCheckout();
	}


	pushToGTMLoadCheckout(){
		try {
			const bodyGTMLoadCheckout=getBodyGTMLoadCheckout();
			console.log(bodyGTMLoadCheckout,'bodyGMT CHECKOUR')
			//this._gtmService.pushTag(bodyGTMLoadCheckout);
		} 
		catch (error) {
			console.log('error tag nmv_vuelos_checkout_cargarCheckout ',error);
		}
	}

	getParamsKayak(){
		const transactionId=this.paramMap.get('transactionId') || '';
		const idGroup=this.paramMap.get('idGroup') || '';
		this._searchService.getGroupByTransactionId(transactionId, idGroup).subscribe({
			next:(res)=>{
				const detailPricing= getPricingFareBreakDowns(res.group.pricingInfo.itinTotalFare.fareBreakDowns);
				const segments = this.paramMap.get('segments');
				const flightClass = this.paramMap.get('flightClass');
				res.group.detailPricing=detailPricing;
				GlobalComponent.appGroupSeleted = res.group;
				GlobalComponent.detailPricing = detailPricing;
				GlobalComponent.classFligh = flightClass == '0' ? 'Economy' : flightClass == '1' ? 'Business' : 'First Class';
				GlobalComponent.appExchangeRate=res.exchangeRate;
				if(segments) {
					const segmentArray = segments.split("-").map(Number);
					GlobalComponent.segmentSelected = segmentArray;
					GlobalComponent.appBooking.segmentSelected = segmentArray;
					GlobalComponent.indexSegmentSeleted=getIndexsSegments(segmentArray);
					GlobalComponent.upSellGroup = [];
					GlobalComponent.upSellSeleted = null;
				}
				this._checkoutService.setIsDomestic();
				setParamsByKayak(this.paramMap); //para inicializar los valores para GMT
				this.initCheckout();
			}
		})
	}

	getIPAdress() {
		const transactionId=this.paramMap.get('transactionId') || '';
		this._tokenService.getIPAddress().subscribe({
		   next:(res)=>{
				this.getToken(res.ip, transactionId)
		   },
		   error:()=>{
			  this.showModalErrorKayak();
		   }
		});
	}

	getToken(ipAddress:string, transactionId:string){
       this._tokenService.getTokenByTransactionId(transactionId,ipAddress).subscribe({
		next:(res)=>{
			GlobalComponent.tokenMotorVuelo = res.accessToken;
			GlobalComponent.appReglasVentaAnticipada = res.reglasVentaAnticipada;
			GlobalComponent.appConfigurations = res.configuraciones;
	    },
		error:()=>{
			this.showModalErrorKayak();
		}
	   })
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

	getDiscounts() {
		this._checkoutService.getDiscountByCampaing().subscribe({
			next: (res) => {
				if (res.result.isSuccess) {
					GlobalComponent.discountCampaing = res;
					this.discount = res.result;
					this.isShowDiscount = true;
					if (this.isShowDiscountCupon) {
						this.isShowDiscountCupon = false;
						this.totalDiscountCupon = 0;
						this.childPagePay.cleanInputCodeCupon();
					}
				} else this.isShowDiscount = false;
			}, error: () => {
				this.isShowDiscount = false;
			}
		})
	}

	showModalErrorKayak() {
		const modalRef=this._modalService.open(ModalErrorKayakComponent,{
			centered: true,
			backdrop: 'static',
			windowClass: 'modal-detail-error'
		})
		modalRef.componentInstance.params = this.paramMap;
	}

	redirectHome() {
		this._router.navigateByUrl('/');
	}
}
