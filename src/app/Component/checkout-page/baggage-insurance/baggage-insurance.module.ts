import { NgModule } from '@angular/core';
import { BaggageInsuranceComponent } from './baggage-insurance.component';
import { CommonModule } from '@angular/common';
import { CardCheckoutModule } from 'src/app/shared/components/card-checkout/card-checkout.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BaggageModule } from 'src/app/shared/components/baggage/baggage.module';
import { ModalFeeModule } from '../modal-fee/modal-fee.module';
import { ModalInsuranceComponent } from './modal-insurance/modal-insurance.component';
import { ModalErrorModule } from 'src/app/shared/components/modal-error/modal-error.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [{ path: '', component: BaggageInsuranceComponent }];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule, 
        CardCheckoutModule,
        ButtonModule,
        BaggageModule,
        ModalFeeModule,
        ModalErrorModule,
        CarouselModule
    ],
    exports: [BaggageInsuranceComponent],
    declarations: [BaggageInsuranceComponent, ModalInsuranceComponent],
    providers: [],
})
export class BaggageAndInsuranceModule { }
