import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import Hotjar from '@hotjar/browser';
import { GlobalComponent } from '../shared/global';
import { ExperimentService } from '../Services/lab/experiment.service';

@Injectable({
	providedIn: 'root'
})
export class ExperimentGuard implements CanActivate {

	constructor(private experimentService: ExperimentService, private router: Router) {
	}

	canActivate(
			_route: ActivatedRouteSnapshot,
			_state: RouterStateSnapshot): boolean {
		const userGroup = this.experimentService.getUserGroup();
		GlobalComponent.userGroupLab = userGroup;

		const user = JSON.parse(localStorage.getItem('usuario') ?? '{}');
		Hotjar.identify(user ? user.id : this.getUserId(), {
			group: userGroup
		});

		if (userGroup === 'A')
			return true;

		if (userGroup === 'B') {
			this.router.navigateByUrl('/booking/pasajeros').then(() => null);
			return false;
		}

		return true;
	}

	private getUserId(): number {
		const randomNumber = Math.random();

		const min = 1;
		const max = 6000;
		const randomInRange = Math.floor(randomNumber * (max - min + 1)) + min;

		console.log(randomInRange);
		return randomInRange;
	}
}
