import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { dataSteps } from '../../constant-init';

@Component({
	selector: 'app-steps',
	templateUrl: './steps.component.html',
	styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
	dataSteps: Step[] = dataSteps;
	isDisabled = false;

	@Output() clickedStep = new EventEmitter();
	constructor(
		private _checkoutService: CheckoutService,
		private _router: Router
	) {
		this.updateStepName();
		this._checkoutService.changeStep.subscribe({
			next: (res: number) => {
				this.dataSteps = [...dataSteps];
				this.clickStep(res);
			}
		});
		this._checkoutService.isFinishedPay.subscribe({
			next: () => {
				this.dataSteps = [...dataSteps];
				this.isDisabled = true;
			}
		});
	}
	ngOnInit(): void {
		this.isDisabled = false;
		dataSteps.forEach((step, index) => {
			step.active = index == 0 ? true : false;
			step.check = false;
		});
	}

	clickStep(index: number) {
		if (!this.isDisabled) {
			this._checkoutService.currentIndexStep = index;
			switch (index) {
				case 0:
					this._router.navigateByUrl('/booking');
					break;
				case 1:
					if (dataSteps[1].active == true && dataSteps[0].check) this._router.navigateByUrl('/booking/pasajeros');
					break;
				default:
					if (dataSteps[2].active == true && dataSteps[1].check && dataSteps[0].check)
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
		if (window.innerWidth < 575) {
			const stepIndex = 2;
			this.dataSteps[stepIndex].name = 'Pagos';
		} else {
			const stepIndex = 2;
			this.dataSteps[stepIndex].name = 'Revisar y pagar';
		}
	}
}
