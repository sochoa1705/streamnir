
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import * as bootstrap from 'bootstrap';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
//import { ConfirmDialogComponent } from './Component/confirm-dialog/confirm-dialog.component';
import { AccountsService } from './Services/accounts.service';
import { TaggingService } from './Services/analytics/tagging.service';
import { NotificationService } from './Services/notification.service';
import { PopupService } from './Services/pop-up/popup.service';
import { LoaderSubjectService } from './shared/components/loader/service/loader-subject.service';
import { Guid } from './shared/utils';
import { ValidatorsService } from './shared/validators/validators.service';


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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NuevoMundoViajes';

  @ViewChild("closeModalSesion") closeModalSesion: ElementRef;
  @ViewChild("closeModalNewAccount") closeModalNewAccount: ElementRef;

  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ]

  //confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  login = new LoginPerson();
  loginB = new LoginBusiness();

  isPerson: boolean = true;
  isPersonLoggin: boolean = true;

  personalAccountForm: FormGroup;
  businessAccountForm: FormGroup;
  //recoverPasswordForm: FormGroup;

  submitBusiness = false;
  submitPerson = false;

  message: string = '';

  constructor(
    private _popUpSubject: PopupService,
    private _authService: SocialAuthService,
    private _accountService: AccountsService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _validatorsService: ValidatorsService,
    public loaderSubjectService: LoaderSubjectService,
    private notification: NotificationService,
    private  readonly router: Router,
  ) {
    this.cerrarBoxClicFuera();

    this._authService.authState.subscribe((user) => {

      if (user.provider == "GOOGLE") {
        this.saveSocialAccount(user.firstName, user.lastName, user.email, "G", user.id, user.photoUrl)
      }

    });
  }

  initLoading() {
    const textSend = 'CARGANDO'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader();
  }

  closeLoading() {
    this.loaderSubjectService.closeLoader();
  }



  ngOnInit(): void {
    this.taggingPageView();
    this.loadUsuario();
    this.personalAccountForm = this.createPersonalAccountForm();
    this.businessAccountForm = this.createBusinessAccountForm();
    //this.recoverPasswordForm = this.createRecoverPasswordForm();

  }

  taggingPageView(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        TaggingService.pageView(event.urlAfterRedirects)
      }
    });

  }

  loadUsuario() {
    const userStr = this._accountService.getUserStorage();
    if (userStr.id > 0) {
      this._accountService.dispatchLogged(true);
    } else {
      this._accountService.dispatchLogged(false);
    }
  }

  createPersonalAccountForm(): FormGroup {
    return this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      fatherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      motherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern)]],
    }, {
      validators: [this._validatorsService.equalFields('password', 'repeatPassword')]
    });
  }

  createBusinessAccountForm(): FormGroup {
    return this._formBuilder.group({
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.pattern(this._validatorsService.digitsPattern)]],
      businessName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      fatherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      motherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      // documentType: ['', [Validators.required, Validators.minLength(1)]],
      // documentNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this._validatorsService.digitsPattern)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern)]],
    }, {
      validators: [this._validatorsService.equalFields('password', 'repeatPassword'),
      this._validatorsService.validateRUC('ruc')]
    });
  }

  // createRecoverPasswordForm(): FormGroup {
  //   return this._formBuilder.group({
  //     email: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]]
  //   });
  // }

  validatePersonalAccountForm(field: string) {
    return this.personalAccountForm.controls[field].errors
      && this.personalAccountForm.controls[field].touched;
  }

  validateBusinessAccountForm(field: string) {
    return this.businessAccountForm.controls[field].errors
      && this.businessAccountForm.controls[field].touched;
  }

  // validateRecoverPasswordForm(field: string) {
  //   return this.recoverPasswordForm.controls[field].errors
  //     && this.recoverPasswordForm.controls[field].touched;
  // }

  get personalAccountEmailErrorMessage(): string {
    const errors = this.personalAccountForm.get('email')?.errors;

    if (errors?.required) {
      return 'Ingresa tu email';
    } else if (errors?.minlength) {
      return `Un email válido tiene ${errors?.minlength.requiredLength} caracteres como mínimo.`;
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de email.';
    }

    return '';
  }

  get businessAccountEmailErrorMessage(): string {
    const errors = this.businessAccountForm.get('email')?.errors;

    if (errors?.required) {
      return 'Ingresa tu email';
    } else if (errors?.minlength) {
      return `Un email válido tiene ${errors?.minlength.requiredLength} caracteres como mínimo.`;
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de email.';
    }

    return '';
  }

  // get recoverPasswordEmailErrorMessage(): string {
  //   const errors = this.recoverPasswordForm.get('email')?.errors;

  //   if (errors?.required) {
  //     return 'Ingresa tu email';
  //   } else if (errors?.minlength) {
  //     return `Un email válido tiene ${errors?.minlength.requiredLength} caracteres como mínimo.`;
  //   } else if (errors?.pattern) {
  //     return 'El valor ingresado no tiene formato de email.';
  //   }

  //   return '';
  // }

  get businessAccountRUCErrorMessage(): string {
    const errors = this.businessAccountForm.get('ruc')?.errors;

    if (errors?.required) {
      return 'Ingresa el número de RUC';
    } else if (errors?.minlength) {
      return `Un RUC válido tiene ${errors?.minlength.requiredLength} dígitos.`;
    } else if (errors?.notValid) {
      return 'Ingresa un número de RUC válido.';
    }

    return '';
  }

  saveAccount(): void {
    this.isPerson ? this.savePersonalAccount() : this.saveBusinessAccount();
  }

  closeModal() {
    const closeModalSesion: any = this.closeModalSesion.nativeElement;
    const closeModalNewAccount: any = this.closeModalNewAccount.nativeElement;

    closeModalSesion ? closeModalSesion.click() : null;
    closeModalNewAccount ? closeModalNewAccount.click() : null;
  }











  toggleModalVerificaCorreo() {
    const modal = document.getElementById("ModalVerificaCorreo");

    if (!modal) {
      return;
    }

    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }


  saveSocialAccount(Firstname: string, FatherLastname: string, Email: string, SocialNetwork: "G" | "F", IdSocialNetwork: string, image: string) {

    this.initLoading();

    const payload = {
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      Caller: {
        Company: "Agil",
        Application: "Interagencias"
      },
      Parameter: {
        Firstname,
        FatherLastname,
        MotherLastname: "",
        Email,
        Password: "",
        IsPerson: true,
        Ruc: "",
        BusinessName: "",
        SocialNetwork,
        IdSocialNetwork
      }
    };

    this._accountService.saveAccount(payload).subscribe({
      next: (response) => {
        this.closeLoading();
        const isSuccess = response.Result.IsSuccess;

        if (isSuccess) {
          this._accountService.guardarStorage(response.Result, image);
          this.closeModal();
          this._matSnackBar.open(`Gracias por registrarte ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        } else {
          this.notification.showNotificacion("Error", "Error del servidor", 10);
        }


        //this.loaderSubjectService.closeLoader()
      },
      error: (err) => {
        this.closeLoading();
        this.notification.showNotificacion("Error", "Error del servidor", 10);

        //this.loaderSubjectService.closeLoader()
      },
      complete: () => { }
    });

  }




  savePersonalAccount(): void {
    this.initLoading();
    if (this.personalAccountForm.invalid) {
      this.closeLoading();
      this.notification.showNotificacion("Error", "Error de validación")
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
          this.closeLoading();
          const isSuccess = response.Result.IsSuccess;

          if (isSuccess) {

            this.closeModal();
            this.toggleModalVerificaCorreo();


            this.personalAccountForm.reset();

            this._matSnackBar.open(`Gracias por registrarte ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          } else {
            this.notification.showNotificacion("Error", response.Result.Message || "Error", 10);
          }
          //this.loaderSubjectService.closeLoader()
        },
        error: (err) => {
          this.closeLoading();
          this.notification.showNotificacion("Error", "Error del servidor", 10);

          //this.loaderSubjectService.closeLoader()
        },
        complete: () => { }
      });
    }
  }

  // toggleModalGetPass() {
  //   const modal = document.getElementById("ModalChangePass");

  //   if (!modal) {
  //     return;
  //   }

  //   bootstrap.Modal.getOrCreateInstance(modal).toggle();
  // }

  // closeModalRecovery() {
  //   const btn = document.getElementById("btncloseRecovery");

  //   if (!btn) {
  //     return;
  //   }

  //   btn.click();
  // }

  // getPassword(email: string) {

  //   this.initLoading();

  //   if (this.recoverPasswordForm.invalid) {
  //     this.closeLoading();
  //     this.recoverPasswordForm.markAllAsTouched();
  //     return;
  //   }

  //   this._accountService.passwordSend(email).subscribe(resp => {
  //     this.closeLoading();
  //     if (resp.IsSuccess) {
  //       this.closeModalRecovery();
  //       this.message = resp.Message;
  //       this.toggleModalGetPass();
  //     } else {
  //       this.notification.showNotificacion("Error", resp.Message, 10);
  //     }
  //   }, () => {
  //     this.closeLoading();
  //     this.notification.showNotificacion("Error", "Error del servidor", 10);
  //   })
  // }

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
          // DocumentType: this.businessAccountForm.get("documentType")?.value,
          // DocumentNumber: this.businessAccountForm.get("documentNumber")?.value
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
            this.notification.showNotificacion("Error", "Ingrese datos correctos", 10);
          }

          //this.loaderSubjectService.closeLoader()
        },
        error: (err) => {

          this.notification.showNotificacion("Error", "Error del servidor", 10);

          //this.loaderSubjectService.closeLoader()
        },
        complete: () => { }
      });
    }
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
