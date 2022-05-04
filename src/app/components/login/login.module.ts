import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatCheckboxModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '279534679478-2c8pkngieq5l97aa7t2d9t9mhvk904hf.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('709409217174221')
          },
        ]
      } as SocialAuthServiceConfig
    }
  ]
})
export class LoginModule { }
