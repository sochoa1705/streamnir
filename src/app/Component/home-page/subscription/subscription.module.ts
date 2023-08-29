import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		SubscriptionComponent,
		ConfirmationDialogComponent
	],
	imports: [
		CommonModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		NgbModalModule
	]
})
export class SubscriptionModule {
}
