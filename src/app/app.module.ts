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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationModule } from './shared/components/notification/notification.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    NgbModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '377536376412-5ik9nvviq62v8dsin6tmbj2ap8i2g7dl.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('263646375921809')
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
