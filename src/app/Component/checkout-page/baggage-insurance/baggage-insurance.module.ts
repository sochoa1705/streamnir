import { NgModule } from '@angular/core';
import { BaggageInsuranceComponent } from './baggage-insurance.component';
import { CommonModule } from '@angular/common';
import { CardCheckoutModule } from 'src/app/shared/components/card-checkout/card-checkout.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BaggageModule } from 'src/app/shared/components/baggage/baggage.module';
import { ModalFeeModule } from '../modal-fee/modal-fee.module';


@NgModule({
    imports: [
        CommonModule, 
        CardCheckoutModule,
        ButtonModule,
        BaggageModule,
        ModalFeeModule
    ],
    exports: [BaggageInsuranceComponent],
    declarations: [BaggageInsuranceComponent],
    providers: [],
})
export class BaggageAndInsuranceModule { }
