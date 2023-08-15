import { registerLocaleData } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Group, PricingDetail } from 'src/app/api/api-checkout/models/rq-checkout-search';
import localeEs from '@angular/common/locales/es';
import { GlobalComponent } from 'src/app/shared/global';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { ModalFeeComponent } from 'src/app/Component/checkout-page/modal-fee/modal-fee.component';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../../modal-error/modal-error.component';

@Component({
	selector: 'app-modal-flight-detail',
	templateUrl: './modal-flight-detail.component.html',
	styleUrls: ['./modal-flight-detail.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'custom-dialog-flight'
	}
})
export class ModalFlightDetailComponent implements OnInit {
	@Input() flight: Group;
	@Input() segmentDeparture: number[];
	@Input() segmentReturn: number;
	@Input() detailPricing: PricingDetail;
	modalFeeDialogRef: MatDialogRef<ModalFeeComponent>;
	modalDialogError: MatDialogRef<ModalErrorComponent>;

	constructor(
		public dialogRef: MatDialogRef<ModalFlightDetailComponent>,
		public _matDialog: MatDialog,
		private _searchService: SearchService,
		private router: Router
	) {}

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
				GlobalComponent.upSellGroup = res;
				this.dialogRef.close(true);
				if (res && res.length > 0) {
					if (res.length > 0) {
						GlobalComponent.upSellSeleted = res[0];
						this.modalFeeDialogRef = this._matDialog.open(ModalFeeComponent, {
							disableClose: true,
							panelClass: 'custom-dialog-up'
						});
					} else {
						this.router.navigateByUrl('/checkout');
					}
				} else {
					this.router.navigateByUrl('/checkout');
				}
			},
			error: (err) => {
				this.dialogRef.close(true);
				this.router.navigateByUrl('/checkout');
			}
		});
	}

	openModalUpsell() {
		const segmentArray: number[] = this.segmentDeparture.map((item) => item);
		if (this.segmentReturn >= 0) segmentArray.push(this.segmentReturn);
		GlobalComponent.segmentSelected =
			this.flight.ndcInfo && segmentArray.every((elemento) => elemento === 0)
				? this.flight.ndcInfo.segmentInfo[0].segments
				: segmentArray;
		this.validateUpsell();
	}

	validateUpsell() {
		GlobalComponent.appGroupSeleted = this.flight;
		GlobalComponent.detailPricing = this.detailPricing;
		GlobalComponent.upSellGroup = [];
		GlobalComponent.upSellSeleted = null;
		this._searchService.validateAvailability().subscribe({
			next: (res) => {
				if (res.isAvailable) this.getDataUpSell();
				else {
					this.dialogRef.close(true);
					this.openModalError(
						'El itinerario seleccionado ya no se encuentra disponible, favor de seleccionar un nuevo itinerario'
					);
				}
			},
			error: (err) => {
				this.dialogRef.close(true);
					this.openModalError(
						'El itinerario seleccionado ya no se encuentra disponible, favor de seleccionar un nuevo itinerario'
					);
			}
		});
	}

	openModalError(message: string) {
		this.modalDialogError = this._matDialog.open(ModalErrorComponent, {
			disableClose: true
		});
		this.modalDialogError.componentInstance.message = message;
		this.modalDialogError.componentInstance.isRedirect = false;
		this.modalDialogError.componentInstance.txtButton='Continuar';
	}
}
