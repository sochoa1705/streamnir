import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { GlobalComponent } from '../../global';

@Component({
	selector: 'app-steps',
	templateUrl: './steps.component.html',
	styleUrls: ['./steps.component.scss']
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

	constructor(
		private _checkoutService: CheckoutService,
		private _router: Router
	) {
		this.updateStepName();
		this._checkoutService.changeStep.subscribe({
			next: (res: number) => {
				this.updateValues(res);
				this.clickStep(res);
			}
		});
		this._checkoutService.isFinishedPay.subscribe({
			next: () => {
				this.steps[2].check = true;
				this.isDisabled = true;
			}
		});
	}

	updateValues(index:number){
		let currentValue=[...this.steps]
		if (index == 1 || index == 2) {
			currentValue[index - 1].check = true;
			currentValue[index].active = true;
		}
		this.steps=[...currentValue]
		GlobalComponent.dataSteps=this.steps;
	}

	ngOnInit(): void {
		if(GlobalComponent.dataSteps.length > 0)
			this.steps=[...GlobalComponent.dataSteps]
		else this.isDisabled = false;
	}

	clickStep(index: number) {
		if (!this.isDisabled) {
			this._checkoutService.currentIndexStep = index;
			switch (index) {
				case 0:
					this._router.navigateByUrl('/booking');
					break;
				case 1:
					if (this.steps[1].active == true && this.steps[0].check)
						this._router.navigateByUrl('/booking/pasajeros');
					break;
				default:
					if (this.steps[2].active == true && this.steps[1].check && this.steps[0].check)
						this._router.navigateByUrl('/booking/pago');
					break;
			}
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.updateStepName();
	}

	private updateStepName() {
		if (window.innerWidth < 575) this.steps[2].name = 'Pagos';
		else this.steps[2].name = 'Revisar y pagar';
	}
}
