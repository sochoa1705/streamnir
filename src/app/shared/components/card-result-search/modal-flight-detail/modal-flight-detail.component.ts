import { registerLocaleData } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Group, PricingDetail } from 'src/app/api/api-checkout/models/rq-checkout-search';
import localeEs from '@angular/common/locales/es';
import { GlobalComponent } from 'src/app/shared/global';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { ModalFeeComponent } from 'src/app/Component/checkout-page/modal-fee/modal-fee.component';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../../modal-error/modal-error.component';
import { dataInitBooking } from 'src/app/shared/constant-init';
import { LoadingService } from 'src/app/Services/intermediary/loading.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FareBreakDown } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { getBodyGTMAddCart } from 'src/app/shared/utils/GMTAddCart';

@Component({
	selector: 'app-modal-flight-detail',
	templateUrl: './modal-flight-detail.component.html',
	styleUrls: ['./modal-flight-detail.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ModalFlightDetailComponent implements OnInit {
	@Input() flight: Group;
	@Input() segmentDeparture: number[];
	@Input() segmentReturn: number;
	@Input() indexSegmentDeparture: number[];
	@Input() indexSegmentReturn: number;
	@Input() detailPricing: PricingDetail;
	messageError='El itinerario seleccionado ya no se encuentra disponible, favor de seleccionar un nuevo itinerario'
	constructor(
		public activeModal: NgbActiveModal,
		private _modalService: NgbModal,
		private _searchService: SearchService,
		private router: Router,
		private _loadingService: LoadingService,
		private _checkoutService: CheckoutService,
		private _gtmService: GoogleTagManagerService
	) {
	}

	ngOnInit() {
		registerLocaleData(localeEs, 'es');
	}

	isHoursNocturne(dateDeparture: any) {
		const hourDeparture = Number(dateDeparture.slice(11, 13));
		return hourDeparture <= 5 || hourDeparture >= 19;
	}

	calcDurationScale(previousDate: string, currentDate: string) {
		const start: any = new Date(previousDate);
		const end: any = new Date(currentDate);
		let differenceInMilliseconds = end - start;

		let hours = Math.floor(differenceInMilliseconds / 3600000); // 1 hora = 3600000 milisegundos
		differenceInMilliseconds %= 3600000;
		let minutes = Math.floor(differenceInMilliseconds / 60000); // 1 minuto = 60000 milisegundos

		return `${hours}h ${minutes < 9 ? '0' + minutes : minutes}m`;
	}

	getDataUpSell() {
			this._searchService.getUpSellGroup().subscribe({
				next: (res) => {
					if (res && res!==null) {
						this._loadingService.idle();
						if (res.length > 0) {
							GlobalComponent.upSellGroup = res;
							GlobalComponent.upSellSeleted = res[0];
							this._modalService.open(ModalFeeComponent, {
								centered: true,
								backdrop: 'static',
								windowClass: res.length <= 3 ? 'modal-detail-fee' :'modal-detail-fee-swiper'
							});

						} else this.redirectCheckout();
					}else this.redirectCheckout();
					this.activeModal.close();
				},
				error: () => {
					this.redirectCheckout();
				}
			});
	}

	openModalUpsell() {
		const segmentArray: number[] = this.segmentDeparture.map((item) => item);
		const segmentIndex: number[] = this.indexSegmentDeparture.map((item) => item);
		if (this.segmentReturn >= 0) {
			segmentArray.push(this.segmentReturn);
			segmentIndex.push(this.indexSegmentReturn);
		};

		GlobalComponent.segmentSelected=segmentArray;
		GlobalComponent.appBooking=dataInitBooking;
		GlobalComponent.appBooking.segmentSelected=segmentArray;
		GlobalComponent.indexSegmentSeleted=segmentIndex;

		GlobalComponent.appGroupSeleted = this.flight;
		this._checkoutService.setIsDomestic();
		GlobalComponent.detailPricing = this.detailPricing;
		GlobalComponent.upSellGroup = [];
		GlobalComponent.upSellSeleted = null;
		if(GlobalComponent.searchFlightParams) this.pushToGTMAddCart();
		this.processValidateUpsell();
	}
  
	processValidateUpsell() {
		if(this._loadingService.requestSearchCount==9) this.validateUpsell();
		else this.endsearch();
	}

	endsearch() {
		this._loadingService.busy();
		this._searchService.endSearch(true).subscribe({
			next: (res) => {
				if(res) this.validateUpsell();
				else this.openModalError('Al parecer ocurrio un error, por favor intentelo más tarde.')
			},
			error: (err) => {
				this.openModalError('Al parecer ocurrio un error, por favor intentelo más tarde.')
			}
		});
	}

	validateUpsell(){
		this._loadingService.busy();
		this._searchService.validateAvailability().subscribe({
			next: (res) => {
				if (res.isAvailable) this.getDataUpSell();
				else {
					this.openModalError(this.messageError);
				}
			},
			error: (err) => {
				this.openModalError(this.messageError);
			}
		});
	}

	openModalError(message: string) {
		this.activeModal.close();
		this._loadingService.idle();
		const modalRef=this._modalService.open(ModalErrorComponent, {
			centered: true,
			backdrop: 'static',
			windowClass: 'modal-detail-error'
		});
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.isRedirect = false;
		modalRef.componentInstance.txtButton='Continuar';
	}

	redirectCheckout(){
		this._loadingService.idle();
		this.router.navigateByUrl('/booking');
		this.activeModal.close();
	}

	pushToGTMAddCart(){
		try {
			const bodyGTMAddCart=getBodyGTMAddCart();
			this._gtmService.pushTag(bodyGTMAddCart);
		} 
		catch (error) {
			console.log('error tag nmv_vuelos_seleccionarProducto ',error);
		}
	}
}
