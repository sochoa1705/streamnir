import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { GlobalComponent } from '../../global';

@Component({
	selector: 'app-modal-error',
	templateUrl: './modal-error.component.html',
	styleUrls: [ './modal-error.component.scss' ]
})
export class ModalErrorComponent {

	@Input() message = '';
	@Input() isRedirect = true;
	@Input() txtButton = 'Volver al inicio';

	constructor(public activeModal: NgbActiveModal,
							private _router: Router,
							private _checkoutService: CheckoutService) {
	}

	goHome() {
		this.activeModal.close();
		window.scroll({ top: 0, behavior: 'smooth' });
		if (this.isRedirect) {
			if (GlobalComponent.isKayak)
				this._router.navigate([ '/' ]).then(() => null);
			else {
				const searchParams = JSON.stringify(localStorage.getItem('searchParams')).replace(/['"]+/g, '');
				this._checkoutService.resetValuesForms();
				this._router.navigateByUrl(searchParams ? `/resultados?${searchParams}` : '/').then(() => null);
			}
		}
	}
}
