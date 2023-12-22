import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { GlobalComponent } from '../shared/global';
import { CheckoutService } from '../api/api-checkout/services/checkout.service';

@Injectable()
export class CanActivateCheckoutGuard implements CanActivate {
	constructor(private _router: Router, private _checkoutService: CheckoutService) {}
	canActivate() {
		if (!GlobalComponent.appGroupSeleted || this._checkoutService.isFinishPayment) {
            const searchParams=localStorage.getItem('searchParams');
            this._router.navigateByUrl(searchParams ? searchParams : '/');
			return false;
		}
		return true;
	}
}