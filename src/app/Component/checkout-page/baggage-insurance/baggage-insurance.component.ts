import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { data_insurance } from './utils';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalFeeComponent } from '../modal-fee/modal-fee.component';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { InformationService } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { GlobalComponent } from 'src/app/shared/global';
import { dataSteps } from 'src/app/shared/constant-init';
import { ModalInsuranceComponent } from './modal-insurance/modal-insurance.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination, Navigation]);

@Component({
	selector: 'app-baggage-insurance',
	templateUrl: './baggage-insurance.component.html',
	styleUrls: ['./baggage-insurance.component.scss']
})
export class BaggageInsuranceComponent implements OnInit {
	constructor(
		private _modalService: NgbModal,
		private _checkoutService: CheckoutService
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
	activeArrowRight = true;

	listBenefitsUpSellSelect: InformationService[] = [];
	@Output() changeStep = new EventEmitter();
	modalDialogRef: MatDialogRef<ModalInsuranceComponent>;
	isDomestic=false;

	indexDepartureSlider=0;


	ngOnInit() {
		//es para ver si mostrar el button de ampliar beneficios
		this.detailFlight = GlobalComponent.appGroupSeleted;
		this.isDomestic=GlobalComponent.isDomestic;
		if (GlobalComponent.upSellSeleted) {
			this.itsIncludeUpSell = true;
			this.showBaggageDropdown = false;
			this.nameSelectUpSell = GlobalComponent.upSellSeleted.description;
			this.listBenefitsUpSellSelect = GlobalComponent.upSellSeleted.informationServices.filter(
				(item: InformationService) => item.itsInclude
			);
		}
		this.showSecure = GlobalComponent.appGroupSeleted.returns ? true : false;
	}

	openModalFee() {
		const modalRef=this._modalService.open(ModalFeeComponent, {
			centered: true,
			backdrop: 'static',
			windowClass: GlobalComponent.upSellGroup.length <= 3 ? 'modal-detail-fee' :'modal-detail-fee-swiper'
		})

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

	openModalCoverage(){
		this._modalService.open(ModalInsuranceComponent, {
			centered: true,
			backdrop: 'static',
			size: 'xl'
		})
	}

	nextPage() {
		dataSteps[0].check = true;
		dataSteps[1].active = true;
		this.changeStep.emit(1);
		window.scroll({ top: 0, behavior: 'smooth' });
	}

	prevSlider(){

	}

	nextSlider(){
		
	}
}
