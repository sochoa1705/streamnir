
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from './Component/confirm-dialog/confirm-dialog.component';
import { AccountService } from './Services/account/account.service';
import { PopupService } from './Services/pop-up/popup.service';
import { Guid } from './shared/utils';
import { ValidatorsService } from './shared/validators/validators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NuevoMundoViajes';

  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ]

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  isPerson: boolean = true;

  personalAccountForm: FormGroup;
  businessAccountForm: FormGroup;

  constructor(
    private _popUpSubject: PopupService,
    private _authService: SocialAuthService,
    private _accountService: AccountService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _validatorsService: ValidatorsService
  ) {
    this.cerrarBoxClicFuera();

    this._authService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  ngOnInit(): void {
    this.personalAccountForm = this.createPersonalAccountForm();
    this.businessAccountForm = this.createBusinessAccountForm();
  }

  createPersonalAccountForm(): FormGroup {
    return this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      fatherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      motherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.alphanumericPattern)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.alphanumericPattern)]],
    }, {
      validators: [this._validatorsService.equalFields('password', 'repeatPassword')]
    });
  }

  createBusinessAccountForm(): FormGroup {
    return this._formBuilder.group({
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this._validatorsService.digitsPattern)]],
      businessName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      fatherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      motherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      documentType: ['', [Validators.required, Validators.minLength(1)]],
      documentNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this._validatorsService.digitsPattern)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.alphanumericPattern)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.alphanumericPattern)]],
    }, {
      validators: [this._validatorsService.equalFields('password', 'repeatPassword')]
    });
  }

  validatePersonalAccountForm(field: string) {
    return this.personalAccountForm.controls[field].errors
      && this.personalAccountForm.controls[field].touched;
  }

  validateBusinessAccountForm(field: string) {
    return this.businessAccountForm.controls[field].errors
      && this.businessAccountForm.controls[field].touched;
  }

  saveAccount(): void {
    this.isPerson ? this.savePersonalAccount() : this.saveBusinessAccount();
  }

  savePersonalAccount(): void {

    debugger

    if (this.personalAccountForm.invalid) {
      this.personalAccountForm.markAllAsTouched();
      return;
    }

    if (this.personalAccountForm.valid) {

      const payload = {
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        Caller: {
          Company: "Agil",
          Application: "Interagencias"
        },
        Parameter: {
          Firstname: this.personalAccountForm.get("firstName")?.value,
          FatherLastname: this.personalAccountForm.get("fatherLastname")?.value,
          MotherLastname: this.personalAccountForm.get("motherLastname")?.value,
          Email: this.personalAccountForm.get("email")?.value,
          Password: this.personalAccountForm.get("password")?.value,
          IsPerson: true,
          Ruc: "",
          BusinessName: "",
        }
      };

      this._accountService.saveAccount(payload).subscribe({
        next: (response) => {
          const isSuccess = response.Result.IsSuccess;

          if (isSuccess) {
            this._matSnackBar.open(`Gracias por registrarte ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          } else {
            this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          }

          console.log(this.personalAccountForm.value);
          this.personalAccountForm.reset();

          //this.loaderSubjectService.closeLoader()
        },
        error: (err) => {

          console.log(err);

          //this.loaderSubjectService.closeLoader()
        },
        complete: () => { }
      });
    }
  }

  saveBusinessAccount(): void {
    if (this.businessAccountForm.invalid) {
      this.businessAccountForm.markAllAsTouched();
      return;
    }

    if (this.businessAccountForm.valid) {

      const payload = {
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        Caller: {
          Company: "Agil",
          Application: "Interagencias"
        },
        Parameter: {
          Firstname: this.businessAccountForm.get("firstName")?.value,
          FatherLastname: this.businessAccountForm.get("fatherLastname")?.value,
          MotherLastname: this.businessAccountForm.get("motherLastname")?.value,
          Email: this.businessAccountForm.get("email")?.value,
          Password: this.businessAccountForm.get("password")?.value,
          IsPerson: false,
          Ruc: this.businessAccountForm.get("ruc")?.value,
          BusinessName: this.businessAccountForm.get("businessName")?.value,
          DocumentType: this.businessAccountForm.get("documentType")?.value,
          DocumentNumber: this.businessAccountForm.get("documentNumber")?.value
        }
      };

      this._accountService.saveAccount(payload).subscribe({
        next: (response) => {
          const isSuccess = response.Result.IsSuccess;

          if (isSuccess) {
            this._matSnackBar.open(`Gracias por registrar su empresa ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          } else {
            this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          }

          //this.loaderSubjectService.closeLoader()
        },
        error: (err) => {

          console.log(err);

          //this.loaderSubjectService.closeLoader()
        },
        complete: () => { }
      });
    }
  }

  signInWithGoogle(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this._authService.signOut();
  }

  socialMedia: Boolean = true;

  showSocialMedia($event: { index: string | number; }) {
    this.socialMedia = $event.index == 0 ? true : false;
    this.isPerson = $event.index == 0 ? true : false;
  }

  cerrarBoxClicFuera() {
    combineLatest([fromEvent(document, 'click'), this._popUpSubject.state()]).pipe(
      filter(resp => resp[1].open == true)
    ).subscribe(resp => {
      const htmlSelected = (resp[0].target as HTMLElement)
      const popUpElement = document.getElementById(resp[1].id);

      if (htmlSelected.contains(popUpElement)) {
        this._popUpSubject.closePopUp('')
      }
    })
  }





}
