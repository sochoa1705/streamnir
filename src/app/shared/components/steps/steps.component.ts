import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/api/api-checkout/models/rq-checkout-up-sell';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { dataSteps } from '../../constant-init';

@Component({
    selector: 'app-steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss']
})

export class StepsComponent {
    dataSteps:Step[]=dataSteps;
    @Output() clickedStep = new EventEmitter();
    constructor(private _checkoutService:CheckoutService, private _router:Router) {
        this._checkoutService.changeStep.subscribe({
			next: () => {
				this.dataSteps=dataSteps;
			}
		});
    }
   
    clickStep(index:number){
        this.clickedStep.emit(index);
    }
}