import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { data_insurance } from './utils';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalFeeComponent } from '../modal-fee/modal-fee.component';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { IUpSell, InformationService } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { GlobalComponent } from 'src/app/shared/global';
import { dataSteps } from 'src/app/shared/constant-init';
import { ModalInsuranceComponent } from './modal-insurance/modal-insurance.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
	selector: 'app-baggage-insurance',
	templateUrl: './baggage-insurance.component.html',
	styleUrls: ['./baggage-insurance.component.scss']
})
export class BaggageInsuranceComponent implements OnInit {
	constructor(
		private _modalService: NgbModal,
		private _checkoutService: CheckoutService,
		private _router:Router
	) {}
	showBaggageDropdown = true;
	showDropdownExtras = false;
	dataInsurance = data_insurance;
	modalFeeDialogRef: MatDialogRef<ModalFeeComponent>;
	isSelectUpSell = false;
	itsIncludeInsurance = false;
	nameSelectUpSell = '';
	itsIncludeUpSell = false;
	showSecure = true;

	detailFlight: Group;
	activeArrowLeft = false;
	activeArrowRight = false;

	listBenefitsUpSellSelect: InformationService[] = [];
	@Output() changeStep = new EventEmitter();
	modalDialogRef: MatDialogRef<ModalInsuranceComponent>;
	isDomestic = false;

	getScreenWidth=0;
	ngOnInit() {
		//es para ver si mostrar el button de ampliar beneficios
		window.scroll({ top: 0, behavior: 'smooth' });
		this.detailFlight = GlobalComponent.appGroupSeleted;
		this.activeArrowRight = this.detailFlight.departure.length > 1 ? true : false;
		this.isDomestic = GlobalComponent.isDomestic;
		if(GlobalComponent.appBooking.secure) this.itsIncludeInsurance=true;
		if (GlobalComponent.upSellSeleted) {
			this.itsIncludeUpSell = true;
			this.showBaggageDropdown = false;
			this.nameSelectUpSell = GlobalComponent.upSellSeleted.description;
			this.listBenefitsUpSellSelect = GlobalComponent.upSellSeleted.informationServices.filter(
				(item: InformationService) => item.itsInclude
			);
		}
		this.showSecure = GlobalComponent.appGroupSeleted.returns ? true : false;
		if(!this.showSecure) this.showBaggageDropdown = true;
		this.getScreenWidth = window.innerWidth;
	}

	openModalFee() {
		const modalRef = this._modalService.open(ModalFeeComponent, {
			centered: true,
			backdrop: 'static',
			windowClass: GlobalComponent.upSellGroup.length <= 3 ? 'modal-detail-fee' : 'modal-detail-fee-swiper'
		});

		modalRef.result.then((result) => {
			if (result !== true) {
				this.showBaggageDropdown = false;
				this.nameSelectUpSell = result.description;
				this.isSelectUpSell = true;
				this.listBenefitsUpSellSelect = result.informationServices.filter(
					(item: InformationService) => item.itsInclude
				);
				GlobalComponent.upSellSeleted = result;
				GlobalComponent.appBooking.brandedFareName = result.name;
				this._checkoutService.selectUpSellModal();
			}
		});
	}

	updateInsurance() {
		this.itsIncludeInsurance = !this.itsIncludeInsurance;
		this._checkoutService.updateTotalInsurance(this.itsIncludeInsurance);
		window.scroll({ top: 0, behavior: 'smooth' });
	}

	openModalCoverage() {
		this._modalService.open(ModalInsuranceComponent, {
			centered: true,
			backdrop: 'static',
			size: 'xl'
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(){
		if (this.getScreenWidth !== window.innerWidth) {
			this.getScreenWidth = window.innerWidth;
		}
	}

	nextPage() {
		dataSteps[0].check = true;
		dataSteps[1].active = true;
		this._checkoutService.changeStep.emit(1);
		window.scroll({ top: 0, behavior: 'smooth' });
	}

	changeSlide($event:any){
		this.activeArrowLeft= $event==0 ? false : true;
		this.activeArrowRight = $event==this.detailFlight.departure.length-1 ? false : true;
	}

	ngOnDestroy() {
		this._modalService.dismissAll();
	}
}
