import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubscriptionComponent
  ],
	imports: [
		CommonModule,
		MatCheckboxModule,
		ReactiveFormsModule
	]
})
export class SubscriptionModule { }
