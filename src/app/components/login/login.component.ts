import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AccountsService } from 'src/app/Services/accounts.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { PopupService } from 'src/app/Services/pop-up/popup.service';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

export class LoginPerson {
  constructor(
    public email = "",
    public password = "",
    public recorder = false
  ) { }
}

export class LoginBusiness {
  constructor(
    public email = "",
    public password = "",
    public recorder = false
  ) { }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isPersonLoggin: boolean = true;

  submitBusiness = false;
  submitPerson = false;

  login = new LoginPerson();
  loginB = new LoginBusiness();

  @ViewChild("closeModalSesion") closeModalSesion: ElementRef;
  @ViewChild("closeModalNewAccount") closeModalNewAccount: ElementRef;

  constructor(
    private _popUpSubject: PopupService,
    private _authService: SocialAuthService,
    private _accountService: AccountsService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _validatorsService: ValidatorsService,
    public loaderSubjectService: LoaderSubjectService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {

  }

  initLoading() {
    const textSend = 'CARGANDO'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader();
  }

  signIn(formPerson: NgForm, formBussines: NgForm) {

    const validPerson = this.validationFormLogin(formPerson);
    const validBusiness = this.validationFormLogin(formBussines);

    this.initLoading();

    if (this.isPersonLoggin && validPerson) {
      this._accountService.signIn(this.login, this.isPersonLoggin).subscribe(resp => {
        this.closeLoading();
        if (resp.IsSuccess) {
          this._accountService.guardarStorage(resp);
          this.closeModal();
        } else {
          this.notification.showNotificacion("Error", "Error de autenticación", 10);
          this.closeLoading();
        }
      }, () => {
        this.notification.showNotificacion("Error", "Error de autenticación", 10);
        this.closeLoading();
      })


    } else if (!this.isPersonLoggin && validBusiness) {
      this._accountService.signIn(this.loginB, this.isPersonLoggin).subscribe(resp => {
        if (resp.IsSuccess) {
          this.closeLoading();
          this._accountService.guardarStorage(resp);
          this.closeModal();
        }
      }, () => {
        this.notification.showNotificacion("Error", "Error de validación", 5);
        this.closeLoading();
      })

    } else if (!validPerson && this.isPersonLoggin) {
      this.submitPerson = true;
      this.notification.showNotificacion("Error", "Error de validación", 5);
      this.closeLoading();
      // this.openSnackBar("El usuario y la contraseña son requeridos")
    } else if (!validBusiness && !this.isPersonLoggin) {
      this.submitBusiness = true;
      this.notification.showNotificacion("Error", "Error de validación", 5);
      this.closeLoading();
      // this.openSnackBar("El usuario y la contraseña son requeridos")
    } else {
      this.openSnackBar("Ocurrio un error");
      this.notification.showNotificacion("Error", "Error de validación", 5);
      this.closeLoading();
    }

  }

  signInWithGoogle(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  validationFormLogin(form: NgForm) {
    if (form.invalid) {
      return false;
    }
    return true;
  }

  closeLoading() {
    this.loaderSubjectService.closeLoader();
  }

  openSnackBar(message: string, action: string = "Error") {
    this._matSnackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  closeModal() {

    const closeModalSesion: any = this.closeModalSesion.nativeElement;
    //const closeModalNewAccount: any = this.closeModalNewAccount.nativeElement;

    debugger

    closeModalSesion ? closeModalSesion.click() : null;
    //closeModalNewAccount ? closeModalNewAccount.click() : null;
  }

  togglePassword(pass: HTMLInputElement) {
    if (pass.type == "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }

  showSocialMediaLogin($event: { index: string | number; }) {
    this.isPersonLoggin = $event.index == 0 ? true : false;
  }

}
