import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { data_insurance } from './utils';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalFeeComponent } from '../modal-fee/modal-fee.component';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { InformationService } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { GlobalComponent } from 'src/app/shared/global';
import { dataSteps } from 'src/app/shared/constant-init';
import { ModalInsuranceComponent } from './modal-insurance/modal-insurance.component';

@Component({
	selector: 'app-baggage-insurance',
	templateUrl: './baggage-insurance.component.html',
	styleUrls: ['./baggage-insurance.component.scss']
})
export class BaggageInsuranceComponent implements OnInit {
	constructor(
		public _matDialog: MatDialog,
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

	listBenefitsUpSellSelect: InformationService[] = [];
	@Output() changeStep = new EventEmitter();
	modalDialogRef: MatDialogRef<ModalInsuranceComponent>;

	ngOnInit() {
		//es para ver si mostrar el button de ampliar beneficios
		this.detailFlight = GlobalComponent.appGroupSeleted;
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
		this.modalFeeDialogRef = this._matDialog.open(ModalFeeComponent, {
			disableClose: true,
			panelClass: 'custom-dialog'
		});

		this.modalFeeDialogRef.afterClosed().subscribe((result) => {
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
		this.modalDialogRef = this._matDialog.open(ModalInsuranceComponent, {
			disableClose: true,
		});
	}

	nextPage() {
		dataSteps[0].check = true;
		dataSteps[1].active = true;
		this.changeStep.emit(1);
		window.scroll({ top: 0, behavior: 'smooth' });
	}
}
