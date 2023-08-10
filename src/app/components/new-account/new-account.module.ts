import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './new-account.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [
		NewAccountComponent
	],
	imports: [
		CommonModule,
		MatTabsModule,
		ReactiveFormsModule,
		RouterModule,
		MatIconModule
	]
})
export class NewAccountModule {
}
