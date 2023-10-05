import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTabsModule } from '@angular/material/tabs';

import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationModule } from './shared/components/notification/notification.module';
import { GlobalHttpInterceptorService } from './interceptors/globalHttpInterceptorService.service';
import { LoginModule } from './components/login/login.module';
import { ChangePasswordModule } from './components/change-password/change-password.module';
import { CheckMailModule } from './components/check-mail/check-mail.module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { NewAccountModule } from './components/new-account/new-account.module';
import { PerfilModule } from './Component/home-page/perfil/perfil.module';
import { LoadingModule } from './components/loading/loading.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { OptionalDataModule } from './components/optional-data/optional-data.module';
import { CryptoService } from './Services/util/crypto.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { environment } from '../environments/environment';
import { CanActivateCheckoutGuard } from './Guards/checkout.guard';

if (!environment.production) (<any>window).FIREBASE_APPCHECK_DEBUG_TOKEN = true;

@NgModule({
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatTabsModule,
		MatSnackBarModule,
		MatDialogModule,
		NgbModule,
		SocialLoginModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NotificationModule,
		LoginModule,
		ChangePasswordModule,
		CheckMailModule,
		ForgotPasswordModule,
		NewAccountModule,
		PerfilModule,
		LoadingModule,
		OptionalDataModule,
		MatTooltipModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
		provideAppCheck(() => initializeAppCheck(getApp(), {
			provider: new ReCaptchaV3Provider(environment.reCaptchaPublicKey),
			isTokenAutoRefreshEnabled: true
		}))
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
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
				onError: (err: Error) => console.error(err)
			} as SocialAuthServiceConfig
		},
		CryptoService,
		CanActivateCheckoutGuard,
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}
