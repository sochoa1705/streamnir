import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PricingDetail } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { FareBreakDown, IUpSell, InformationService } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { GlobalComponent } from 'src/app/shared/global';
import { getPricingFareBreakDowns } from 'src/app/shared/utils/fareBreakDowns';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination, Navigation]);

@Component({
	selector: 'modal-fee',
	templateUrl: './modal-fee.component.html',
	styleUrls: ['./modal-fee.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		'class': 'custom-dialog-up'
	}
})
export class ModalFeeComponent implements OnInit{
	dataUpSell:IUpSell[]=GlobalComponent.upSellGroup;

	slidesPerGroup = 1;
	slidesPerView = 1;
	activeArrowLeft = false;
	activeArrowRight = true;
	isNavigate=true;
	indexCardSelect=0;
	
	dataBags:InformationService[]=[];

	pricingDetail:PricingDetail;
	config: SwiperOptions = {
		slidesPerView: 'auto',
		slidesPerGroup: 1,
		navigation: false,
		loop: false,
		pagination: false,
		on: {
			realIndexChange: (swiper) => {
				this.activeArrowLeft = !swiper.isBeginning;
				this.activeArrowRight = !swiper.isEnd;
			}
		}
	};
	constructor(
		public dialogRef: MatDialogRef<ModalFeeComponent>, private router: Router
	) {
	}
	
	ngOnInit(): void {
		this.indexCardSelect=GlobalComponent.upSellSeleted?.index || 0;
		this.pricingDetail=GlobalComponent.detailPricing;
		this.dataUpSell=GlobalComponent.upSellGroup.map((item, index)=>{
			this.isNavigate= this.dataUpSell.length > 3 ? true : false;
			item.index=index;
			item.informationServices = item.informationServices.sort((a, b) => {
				if(this.conditionIncludeBag(a) && !this.conditionIncludeBag(b)) return -1
				if(!this.conditionIncludeBag(a) && this.conditionIncludeBag(b)) return 1
				return 0
			})
			return item
		})
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
		return elemento.description.includes('BAG') ||  elemento.description.includes('BAGGAGE');
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
		if(route.includes('resultados')){
			GlobalComponent.upSellSeleted=item;
			this.router.navigateByUrl('/checkout');
		}
		this.dialogRef.close(item);
	}
}
