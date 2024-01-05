import { Injectable } from '@angular/core';
import {CanDeactivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutService } from '../api/api-checkout/services/checkout.service';

type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
export interface CanComponentDeactivate {
	canDeactivate: () => CanDeactivateType;
}
@Injectable()
export class DeactivatePaymentGuard implements CanDeactivate<unknown> {
	constructor(private _checkoutService: CheckoutService) {}

	canDeactivate(): CanDeactivateType {
		if(!this._checkoutService.isSaveDataPayment){
			this._checkoutService.openModalUnSavedPayment.emit();
			return false
		}
		return true
	}
}