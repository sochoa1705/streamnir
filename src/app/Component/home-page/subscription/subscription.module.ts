import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialogModule } from '../../../shared/components/success-dialog/success-dialog.module';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { FormComponent } from './form/form.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
	declarations: [
		SubscriptionComponent,
		FormComponent,
		SuccessComponent
	],
	imports: [
		CommonModule,
		SubscriptionRoutingModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		NgbModalModule,
		SuccessDialogModule
	]
})
export class SubscriptionModule {
}
