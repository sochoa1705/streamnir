import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialogModule } from '../../../shared/components/success-dialog/success-dialog.module';

@NgModule({
	declarations: [
		SubscriptionComponent
	],
	imports: [
		CommonModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		NgbModalModule,
		SuccessDialogModule
	]
})
export class SubscriptionModule {
}
