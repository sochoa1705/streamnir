import { Component, OnDestroy, OnInit } from '@angular/core';
import { FareBreakDown, Group, PricingDetail } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { GlobalComponent } from 'src/app/shared/global';
import { Result, ResultCupon } from 'src/app/api/api-checkout/models/rq-checkout-discount';
import { TokenService } from 'src/app/api/api-nmviajes/services/token.service';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { getPricingFareBreakDowns } from 'src/app/shared/utils/fareBreakDowns';
import { getIndexsSegments } from 'src/app/shared/utils/getIndexSegment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorKayakComponent } from './modal-error-kayak/modal-error-kayak.component';
import { environment } from 'src/environments/environment';
import { ModalInactivityComponent } from './modal-inactivity/modal-inactivity.component';
import { Subscription } from 'rxjs';
import { UserIdleService } from 'angular-user-idle';
import { filter } from 'rxjs/operators';
import { IDiscountResult } from '../../api/api-checkout/models/rq-openpay-discount';

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit,OnDestroy {
	classFligh = 'Economy';

	fareBreakDowns: FareBreakDown;
	totalInsurance = 0;

	nameUpSellSelect = '';
	detailFlight: Group;

	// Detalle Vuelo

	pricing: PricingDetail;
	showButtonReturn = false;
	codeSafetyPay = 0;

	isSafetyPay = false;
	discount: Result;
	totalDiscountCupon = 0;
	isShowDiscount = false;
	isShowDiscountCupon = false;
	indexSegmentSelected:number[]=[];

	isBinDiscountShown = false;
	binDiscount: IDiscountResult | null;

	paramMap:ParamMap;

	idleSubscriber: Subscription;
	currentUrl='/booking';

	constructor(
		private _checkoutService: CheckoutService,
		private _router: Router,
		private _routeActivate: ActivatedRoute,
		private _tokenService: TokenService,
		private _searchService: SearchService,
		private _modalService:NgbModal,
		private userIdle: UserIdleService,
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

		this._checkoutService.applyBinDiscount.subscribe({
			next: (res: IDiscountResult | null) => {
				this.isBinDiscountShown = false;
				if (res) {
					this.binDiscount = res;
					this.isBinDiscountShown = true;
				} else {
					this.isBinDiscountShown = false;
					this.binDiscount = null;
					if (GlobalComponent.discountCampaing) {
						this.isShowDiscount = true;
					}
				}
			}
		});

		this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
			this.currentUrl=event.url;
		});
	}

	ngOnInit() {
		const paramMap = this._routeActivate.snapshot.paramMap;
		this._modalService.dismissAll();
		if(paramMap.keys.length > 2){
			this.paramMap=paramMap;
			GlobalComponent.isKayak=true;
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
		this.getDiscounts();
		this.configIdlePopup();
	}


	getDataByKayak(){
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
				if(segments) {
					const segmentArray = segments.split("-").map(Number);
					GlobalComponent.segmentSelected = segmentArray;
					GlobalComponent.appBooking.segmentSelected = segmentArray;
					GlobalComponent.indexSegmentSeleted=getIndexsSegments(segmentArray);
					GlobalComponent.upSellGroup = [];
					GlobalComponent.upSellSeleted = null;
				}
				this._checkoutService.setIsDomestic();
				this._checkoutService.updateDataKayak.emit();
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
			GlobalComponent.transactionId=res.transactionId;
			this.getDataByKayak();
	    },
		error:()=>{
			this.showModalErrorKayak();
		}
	   })
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
						this._checkoutService.dataInfoPayment.booking.CuponPromoWeb='';
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

	configIdlePopup() {
		this.userIdle.setConfigValues({ idle: environment.resultsInactivityTime })
		this.userIdle.startWatching()
		this.idleSubscriber = this.userIdle.onTimerStart().subscribe((count: any) => {
		  if (count) {
			this.userIdle.stopWatching()
			this._modalService.dismissAll();
			const modalRef = this._modalService.open(ModalInactivityComponent,{
				centered: true,
				size: 'auto',
				modalDialogClass: 'inactivity-dialog',
				windowClass: 'upSellModalClass',
			});
			modalRef.result.finally(() => this.userIdle.startWatching())
		  }
		})
	}

	redirectHome(){
		this._router.navigateByUrl('/')
	}

	nextPassenger(){
		this._checkoutService.changeStep.emit(1);
		window.scroll({ top: 0, behavior: 'smooth' });
	}

	nextPayment(){
		this._checkoutService.nextPassengerMobile.emit();
	}

	nextPurchare(){
		this._checkoutService.nextPaymentMobile.emit();
	}

	ngOnDestroy() {
		if(this.userIdle && this.idleSubscriber){
			this.userIdle.stopWatching();
			this.idleSubscriber.unsubscribe();
		}
	}
}
