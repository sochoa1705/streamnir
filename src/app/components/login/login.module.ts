import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ LoginComponent ],
	imports: [
		CommonModule,
		RouterModule,
		NgbModule,
		MatCheckboxModule,
		MatTabsModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [ LoginComponent ],
	providers: [
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider('279534679478-2c8pkngieq5l97aa7t2d9t9mhvk904hf.apps.googleusercontent.com')
					}
				],
				onError: (err: Error) => {
					console.error(err);
				}
			} as SocialAuthServiceConfig
		}
	]
})
export class LoginModule {
}
