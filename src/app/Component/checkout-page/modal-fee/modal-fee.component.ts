import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PricingDetail } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { FareBreakDown, IUpSell, InformationService } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { GlobalComponent } from 'src/app/shared/global';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination, Navigation]);

@Component({
	selector: 'modal-fee',
	templateUrl: './modal-fee.component.html',
	styleUrls: ['./modal-fee.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ModalFeeComponent implements OnInit{
	dataUpSell:IUpSell[]=GlobalComponent.upSellGroup;
	activeArrowLeft = false;
	activeArrowRight = true;
	isNavigate=true;
	indexCardSelect=0;
	
	isDomestic=GlobalComponent.isDomestic;

	pricingDetail:PricingDetail;
	getScreenWidth = window.innerWidth;
	config: SwiperOptions = {
		navigation: false,
		loop: false,
		pagination: false,
		on: {
			realIndexChange: (swiper) => {
				this.activeArrowLeft = !swiper.isBeginning;
				this.activeArrowRight = !swiper.isEnd;
			}
		},
		breakpoints: {
			0:{
				slidesPerView: 1.2,
			},
			597:{
				slidesPerView: 1.5,
			},
			768: {
                slidesPerView: 2.1,
            },
			1200: {
                slidesPerView: 2.45,
            }
        }
	};
	constructor(
		public activeModal: NgbActiveModal,
		private router: Router, 
		public _searchService:SearchService,
		private _checkoutService: CheckoutService
	) {
	}
	
	ngOnInit(): void {
		this.indexCardSelect=GlobalComponent.upSellSeleted?.index || 0;
		this.pricingDetail=GlobalComponent.detailPricing;
		const dataUpSell=GlobalComponent.upSellGroup.map((item, index)=>{
			item.index=index;
			item.totalPay=this.getTotalByUpSell(item.fareBreakDowns);
			item.dataBags=[];
			item.dataExtras=[];
			item.informationServices.forEach(service=>{
				service.isBag=this.conditionIncludeBag(service);
				if(service.isBag && service.itsInclude && item.dataBags) item.dataBags.push(service);
				if(!service.isBag && service.itsInclude && item.dataExtras) item.dataExtras.push(service);
			})
			return item
		})
	
		this.dataUpSell=dataUpSell.sort((a,b)=>{
			if (a.totalPay && b.totalPay) return a.totalPay - b.totalPay;
			if (!a.totalPay) return 1;
			if (!b.totalPay) return -1;
			return 0;
		})
		this.isNavigate= this.getScreenWidth <= 575 ? false : this.dataUpSell.length > 3 ? true : false;
	}

	getTotalByUpSell(fareBreakDowns:FareBreakDown[]){
		let baseFareTotal = 0;
		let taxesTotal = 0;
		fareBreakDowns.forEach((item: FareBreakDown) => {
			baseFareTotal += item.baseFare * item.quantity;
			taxesTotal += item.taxes.reduce(function (acc, obj) { return acc + obj.fareAmount; }, 0) * item.quantity;
		})
		const totalByUpSell = baseFareTotal + taxesTotal + this.pricingDetail.feeNMV + this.pricingDetail.feePTA;
		return totalByUpSell
	}

	conditionIncludeBag(elemento:InformationService) {
		const word=elemento.description.toLocaleLowerCase();
		return word.includes('bag') ||  word.includes('baggage') || word.includes('equipaje') || word.includes('mano') || word.includes('carry') || word.includes('upto') || word.includes('bodega');
	}

	@ViewChild('swiperFee', { static: false }) swiperFee?: SwiperComponent;

	slideNext() {
		this.swiperFee?.swiperRef.slideNext();
	}
	slidePrev() {
		this.swiperFee?.swiperRef.slidePrev();
	}

	clickSelectUpSell(item:IUpSell){
		const route=this.router.routerState.snapshot.url;
		item.includeHandBagDep = item.fareBreakDowns[0].equipaje.equipaje[0].cabina ? true : false;
		item.includesHoldBagDep = item.fareBreakDowns[0].equipaje.equipaje[0].piezas ?? 0 > 0 ? true : false;

		if(GlobalComponent.appGroupSeleted.returns){
			item.includeHandBagRet = item.fareBreakDowns[0].equipaje.equipaje[1].cabina ? true : false;
		    item.includesHoldBagRet = item.fareBreakDowns[0].equipaje.equipaje[1].piezas ?? 0 > 0 ? true : false;
		}else{
			item.includeHandBagRet=false;
			item.includesHoldBagRet=false;
		}
		if(route.includes('resultados')){
			GlobalComponent.upSellSeleted=item;
			GlobalComponent.appBooking.brandedFareName = item.name;
			this._checkoutService.selectUpSellModal();
			this.router.navigateByUrl('/booking');
		}
		this.activeModal.close(item);
	}

	@HostListener('window:resize', ['$event'])
	onResize(){
		if (this.getScreenWidth !== window.innerWidth) {
			this.getScreenWidth = window.innerWidth;
		}
	}
}
