import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCheckoutModule } from 'src/app/shared/components/card-checkout/card-checkout.module';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SelectModule } from 'src/app/shared/components/select/select.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InputCheckModule } from 'src/app/shared/components/input-check/input-check.module';
import { InputToggleModule } from 'src/app/shared/components/input-toggle/input-toggle.module';
import { PayComponent } from './pay.component';
import { InputCreditCardModule } from 'src/app/shared/components/input-credit-card/input-credit-card.module';
import { MessagePayComponent } from './message-pay/message-pay.component';
import { ModalErrorModule } from 'src/app/shared/components/modal-error/modal-error.module';
import { NationalityPipe } from 'src/app/shared/pipes/nationality.pipe';

@NgModule({
    imports: [
        CommonModule, 
        CardCheckoutModule, 
        InputModule, 
        ReactiveFormsModule, 
        FormsModule, 
        ButtonModule,
        SelectModule,
        NgxIntlTelInputModule,
        InputCheckModule,
        InputToggleModule,
        InputCreditCardModule,
        ModalErrorModule
    ],
    exports: [PayComponent],
    declarations: [PayComponent, MessagePayComponent,  NationalityPipe],
    providers: [],
})
export class PayModule { }
