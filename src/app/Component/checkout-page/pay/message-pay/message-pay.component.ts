import { Component, Input, OnInit } from '@angular/core';
import { Contact, Passenger } from 'src/app/api/api-checkout/models/rq-checkout-booking';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { dataSteps } from 'src/app/shared/constant-init';
import { GlobalComponent } from 'src/app/shared/global';

@Component({
    selector: 'app-message-pay',
    templateUrl: './message-pay.component.html',
    styleUrls: ['./message-pay.component.scss']
})

export class MessagePayComponent implements OnInit {
    constructor(private _checkoutService:CheckoutService) { }
    dataPassengers: Passenger[] = [];
    dataContact:Contact;
    @Input() listBanksInternet:any[] = []
    @Input() codeSafetyPay = 0;
    @Input() transactionId = 0;
    @Input() isPayCard=true;
    ngOnInit() {
        dataSteps[2].check = true;
        window.scroll({ top: 0, behavior: 'smooth' });
        this._checkoutService.isFinishedPay.emit({transactionId:this.transactionId, isPayCard:this.isPayCard});
        this.dataPassengers=GlobalComponent.appBooking.passengers;
        this.dataContact=GlobalComponent.appBooking.contact;
    }
}

//resultPasarela
