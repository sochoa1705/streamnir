import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardNumberFormatDirective } from '../../directives/credit-card.directive';
import { CardExpirationDateDirective } from '../../directives/card-expiration.directive';
import { InputCreditCard } from './input-credit-card.component';
@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [InputCreditCard],
	declarations: [InputCreditCard, CardNumberFormatDirective, CardExpirationDateDirective],
	providers: []
})
export class InputCreditCardModule {}
