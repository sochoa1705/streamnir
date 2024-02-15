import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { GlobalComponent } from '../../global';

@Component({
	selector: 'app-steps',
	templateUrl: './steps.component.html',
	styleUrls: [ './steps.component.scss' ]
})
export class StepsComponent implements OnInit {
	steps: Step[] = [
		{
			id: 0,
			name: 'Beneficios',
			active: true,
			check: false
		},
		{
			id: 1,
			name: 'Pasajeros',
			active: false,
			check: false
		},
		{
			id: 2,
			name: 'Revisar y pagar',
			active: false,
			check: false
		}
	];
	isDisabled = false;

	constructor(private _checkoutService: CheckoutService,
							private _router: Router) {
		this.updateStepName();
		this.setSteps();
		this._checkoutService.changeStep.subscribe({
			next: (res: number) => {
				this.updateValues(res);
				this.clickStep(res);
			}
		});
		this._checkoutService.isFinishedPay.subscribe({
			next: () => {
				this.steps[GlobalComponent.userGroupLab === 'A' ? 2 : 1].check = true;
				this.isDisabled = true;
			}
		});
	}

	updateValues(index: number) {
		let currentValue = [ ...this.steps ];
		if (index == 1 || index == 2) {
			currentValue[index - 1].check = true;
			currentValue[index].active = true;
		}
		this.steps = [ ...currentValue ];
		GlobalComponent.dataSteps = this.steps;
	}

	ngOnInit(): void {
		if (GlobalComponent.dataSteps.length > 0)
			this.steps = [ ...GlobalComponent.dataSteps ];
		else this.isDisabled = false;
	}

	private setSteps() {
		this.steps = this.steps.filter((_item, index) => {
			if (GlobalComponent.userGroupLab === 'B')
				return index !== 0;
			return true;
		}).map((item, index) => {
			return { ...item, id: index, active: index === 0 };
		});
		console.log(this.steps);
	}

	clickStep(index: number) {
		if (!this.isDisabled) {
			this._checkoutService.currentIndexStep = index;
			switch (index) {
				case 0:
					if (GlobalComponent.userGroupLab === 'A')
						this._router.navigateByUrl('/booking');
					else
						this._router.navigateByUrl('/booking/pasajeros');
					break;
				case 1:
					if (GlobalComponent.userGroupLab === 'A') {
						if (this.steps[1].active && this.steps[0].check)
							this._router.navigateByUrl('/booking/pasajeros');
					} else {
						if (this.steps[1].active && this.steps[0].check)
							this._router.navigateByUrl('/booking/pago');
					}
					break;
				default:
					if (this.steps[2].active && this.steps[1].check && this.steps[0].check)
						this._router.navigateByUrl('/booking/pago');
					break;
			}
		}
	}

	@HostListener('window:resize', [ '$event' ])
	onResize(_event: any) {
		this.updateStepName();
	}

	private updateStepName() {
		const paymentIndex: number = GlobalComponent.userGroupLab === 'A' ? 2 : 1;
		if (window.innerWidth < 575) this.steps[paymentIndex].name = 'Pagos';
		else this.steps[paymentIndex].name = 'Revisar y pagar';
	}
}
