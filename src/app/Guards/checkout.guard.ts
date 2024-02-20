import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalComponent } from '../shared/global';
import { CheckoutService } from '../api/api-checkout/services/checkout.service';

@Injectable()
export class CanActivateCheckoutGuard implements CanActivate {

	constructor(private _router: Router, private _checkoutService: CheckoutService) {
	}

	canActivate() {
		if (!GlobalComponent.appGroupSeleted || this._checkoutService.isFinishPayment) {
			const searchParams = localStorage.getItem('searchParams');
			this._router.navigateByUrl(searchParams ? `/resultados?${searchParams}` : '/').then(() => null);
			return false;
		}
		return true;
	}
}