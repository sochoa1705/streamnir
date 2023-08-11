import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { GlobalComponent } from '../shared/global';

@Injectable()
export class CanActivateCheckoutGuard implements CanActivate {
	constructor(private _router: Router) {}
	canActivate() {
		if (!GlobalComponent.appGroupSeleted) {
            const searchParams=localStorage.getItem('searchParams');
            this._router.navigateByUrl(searchParams ? searchParams : '/');
			return false;
		}
		return true;
	}
}