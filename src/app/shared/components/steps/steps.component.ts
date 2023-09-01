import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    dataSteps:Step[]=dataSteps;
    isDisabled=false;
    @Output() clickedStep = new EventEmitter();
    constructor(private _checkoutService:CheckoutService, private _router:Router) {
        this._checkoutService.changeStep.subscribe({
			next: () => {
				this.dataSteps=dataSteps;
			}
		});
        this._checkoutService.isFinishedPay.subscribe({
			next: () => {
				this.isDisabled=true;
			}
		});
    }
    ngOnInit(): void {
       this.isDisabled=false;
    }
   
    clickStep(index:number){
        if(!this.isDisabled)
        this.clickedStep.emit(index);
    }
}