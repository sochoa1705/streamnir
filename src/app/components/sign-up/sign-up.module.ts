import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SignUpComponent
  ],
	imports: [
		CommonModule,
		FormsModule,
		MatTabsModule,
		ReactiveFormsModule,
		RouterModule
	]
})
export class SignUpModule { }
