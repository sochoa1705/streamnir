import { Injectable } from '@angular/core';
import {CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutService } from '../api/api-checkout/services/checkout.service';

type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
export interface CanComponentDeactivate {
	canDeactivate: () => CanDeactivateType;
}
@Injectable()
export class DeactivateGuard implements CanDeactivate<unknown> {
	constructor(private _checkoutService: CheckoutService) {}

	canDeactivate(): CanDeactivateType {
		if(!this._checkoutService.isSaveDataPassenger){
			this._checkoutService.openModalUnSavedPassenger.emit();
			return false
		}
		return true
	}
}