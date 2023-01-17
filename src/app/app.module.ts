import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    //MatCheckboxModule,
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
    OptionalDataModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    CryptoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
