import { Component, HostListener, Input, OnInit, ViewEncapsulation, NgZone, Renderer2 } from '@angular/core';
import { Group, PricingDetail } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { GlobalComponent } from 'src/app/shared/global';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { ModalFeeComponent } from 'src/app/Component/checkout-page/modal-fee/modal-fee.component';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../../modal-error/modal-error.component';
import { dataInitBooking } from 'src/app/shared/constant-init';
import { LoadingService } from 'src/app/Services/intermediary/loading.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import moment from 'moment';

@Component({
	selector: 'app-modal-flight-detail',
	templateUrl: './modal-flight-detail.component.html',
	styleUrls: ['./modal-flight-detail.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ModalFlightDetailComponent implements OnInit {
	@Input() currency = 'USD';
	@Input() detailPricing: PricingDetail;
	@Input() flight: Group;
	@Input() indexSegmentDeparture: number[];
	@Input() indexSegmentReturn: number;
	@Input() segmentDeparture: number[];
	@Input() segmentReturn: number;
	messageError='El itinerario seleccionado ya no se encuentra disponible, favor de seleccionar un nuevo itinerario'
	constructor(
		public activeModal: NgbActiveModal,
		private _modalService: NgbModal,
		private _searchService: SearchService,
		private router: Router,
		private _loadingService: LoadingService,
		private _checkoutService: CheckoutService,
		private renderer: Renderer2
	) {
	}

	getScreenWidth = window.innerWidth;

	ngOnInit() {
		this.renderer.setStyle(document.documentElement, 'overflow-y', 'hidden');
	}

	ngOnDestroy() {
		this.renderer.setStyle(document.documentElement, 'overflow-y', 'auto');
  }

	isHoursNocturne(dateDeparture: any) {
		const hourDeparture = Number(dateDeparture.slice(11, 13));
		const minutes = Number(dateDeparture.slice(14, 16));
		if (hourDeparture >= 19 || (hourDeparture === 5 && minutes <= 0) || (hourDeparture>=0 && hourDeparture<=4)) 
		return true;
		return false;
	}

	isEqualDates(dateOne:string,dateSecond:string,index:number){
		const momentdateOne = moment(dateOne, index==0 ? 'DD-MM-YYYY': 'YYYY-MM-DD');
		const momentdateSecond = moment(dateSecond,'YYYY-MM-DD');
	
		const sameYear = momentdateOne.year() === momentdateSecond.year();
		const sameMonth = momentdateOne.month() === momentdateSecond.month();
		const sameDay = momentdateOne.date() === momentdateSecond.date();

		return sameYear && sameMonth && sameDay;
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
								windowClass: res.length <= 3 ? 'modal-detail-fee':'modal-detail-fee-swiper'
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
	//button continuar
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

	@HostListener('window:resize', ['$event'])
	onResize(){
		if (this.getScreenWidth !== window.innerWidth) {
			this.getScreenWidth = window.innerWidth;
		}
	}
}
