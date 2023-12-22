import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RValidateBooking } from 'src/app/api/api-checkout/models/rq-checkout-validate-booking';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';

@Component({
	selector: 'app-modal-validate',
	templateUrl: './modal-validate.component.html',
	styleUrls: ['./modal-validate.component.scss']
})
export class ModalValidateComponent implements OnInit {
	@Input() message = '';
	@Input() validateBooking: RValidateBooking;

	successCancel = false;
	errorDefault = 'Al parecer ocurrio un error al cancelar su reserva anterior, intentelo más tarde';
	constructor(
		public activeModal: NgbActiveModal,
		private _router: Router,
		private _checkoutService: CheckoutService,
		private _modalService: NgbModal
	) {}

	ngOnInit(): void {}

	goHome() {
		this.activeModal.close();
		window.scroll({ top: 0, behavior: 'smooth' });
		this._router.navigateByUrl('/');
	}

	cancelBooking() {
		let listaCancelBooking: any[] = [];
		if (this.validateBooking) {
			this.validateBooking.bookings.forEach((item: any) => {
				listaCancelBooking.push({
					idGds: item.idGds,
					codigoReserva: item.pnrDuplicate,
					idReserva: item.idReservaDuplicate != null ? Number(item.idReservaDuplicate) : 0
				});
			});

			let cancelBookingRQ: any = {
				idGds: this.validateBooking.isMT ? 7 : this.validateBooking.bookings[0].idGds,
				lstCancelBooking: listaCancelBooking
			};

			this._checkoutService.cancelBooking(cancelBookingRQ).subscribe({
				next: (response) => {
					if (response != null) {
						if (response.confirmed) this.activeModal.close('success');
						else {
							if (response.mensaje.length > 0) this.openModalError(response.mensaje);
							else if (response.ConBoletosEmitidos)
								this.openModalError('No se pudo cancelar la reserva porque tiene boletos emitidos.');
							this.openModalError(this.errorDefault);
						}
					} else this.openModalError(this.errorDefault);
				},
				error: (error) => {
					this.openModalError(this.errorDefault);
				}
			});
		}
	}

	openModalError(message: string) {
		this.activeModal.close();
		const modalRef = this._modalService.open(ModalErrorComponent, {
			centered: true,
			backdrop: 'static',
			windowClass: 'modal-detail-error'
		});
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.isRedirect = true;
		modalRef.componentInstance.txtButton = 'Volver al inicio';
	}
}
