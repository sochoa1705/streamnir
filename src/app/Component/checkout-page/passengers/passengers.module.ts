import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PassengersComponent } from './passengers.component';
import { CardCheckoutModule } from 'src/app/shared/components/card-checkout/card-checkout.module';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SelectModule } from 'src/app/shared/components/select/select.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CardPassengerComponent } from './card-passenger/card-passenger.component';
import { InputCheckModule } from 'src/app/shared/components/input-check/input-check.module';
import { InputToggleModule } from 'src/app/shared/components/input-toggle/input-toggle.module';
import { ModalValidateComponent } from './modal-validate/modal-validate.component';

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
        InputToggleModule
    ],
    exports: [PassengersComponent],
    declarations: [PassengersComponent, CardPassengerComponent, ModalValidateComponent],
    providers: [],
})
export class PassengersModule { }
