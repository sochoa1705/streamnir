import { NgModule } from '@angular/core';
import { CheckoutPageRoutingModule } from './checkout-page-routing.module';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './checkout-page.component';
import { FooterCheckoutModule } from 'src/app/shared/components/footer-checkout/footer-checkout.module';
import { StepsModule } from 'src/app/shared/components/steps/steps.module';
import { ToolbarModule } from 'src/app/shared/components/toolbar/toolbar.module';
import { CardCheckoutModule } from 'src/app/shared/components/card-checkout/card-checkout.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { CardDetailFlyModule } from 'src/app/shared/components/card-detail-fly/card-detail-fly.module';
import { BaggageAndInsuranceModule } from './baggage-insurance/baggage-insurance.module';
import { PassengersModule } from './passengers/passengers.module';
import { PayModule } from './pay/pay.module';
import { ModalErrorKayakComponent } from './modal-error-kayak/modal-error-kayak.component';
import { ModalInactivityComponent } from './modal-inactivity/modal-inactivity.component';

@NgModule({
    imports: [
        CommonModule, 
        CheckoutPageRoutingModule, 
        FooterCheckoutModule,
        StepsModule,
        ToolbarModule,
        CardCheckoutModule,
        ButtonModule,
        CardDetailFlyModule,
        BaggageAndInsuranceModule,
        PassengersModule,
        PayModule
    ],
    providers: [],
    exports: [CheckoutPageComponent],
    declarations: [CheckoutPageComponent,ModalErrorKayakComponent, ModalInactivityComponent],
})
export class CheckoutPageModule { }
