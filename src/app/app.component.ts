
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
//import { ConfirmDialogComponent } from './Component/confirm-dialog/confirm-dialog.component';
import { AccountsService } from './Services/accounts.service';
import { PopupService } from './Services/pop-up/popup.service';
import { Guid } from './shared/utils';
import { ValidatorsService } from './shared/validators/validators.service';


export class LoginPerson {
  constructor(
    public email = "jose.oshiro@gmail.com",
    public password = "Oshiro123",
    public recorder = false
  ){}
}
export class LoginBusiness {
  constructor(
    public email = "jose.oshiro@gmail.com",
    public password = "Oshiro123",
    public recorder = false
  ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NuevoMundoViajes';

  @ViewChild("closeBotonUsuario") closeBotonUsuario: ElementRef;

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


  submitBusiness = false;
  submitPerson = false;

  constructor(
    private _popUpSubject: PopupService,
    private _authService: SocialAuthService,
    private _accountService: AccountsService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _validatorsService: ValidatorsService
  ) {
    this.cerrarBoxClicFuera();

    this._authService.authState.subscribe((user) => {

      if (user.provider == "GOOGLE") {
        this.saveSocialAccount(user.firstName, user.lastName, user.email, "G", user.id)
      }

    });
  }



  ngOnInit(): void {
    this.loadUsuario();
    this.personalAccountForm = this.createPersonalAccountForm();
    this.businessAccountForm = this.createBusinessAccountForm();
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

  closeModal() {
    const btnModal: any = this.closeBotonUsuario.nativeElement;
    btnModal ? btnModal.click() : null;
  }


  openSnackBar(message: string, action: string = "Error") {
    this._matSnackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
  

  validationFormLogin(form:NgForm){
    if(form.invalid){
      return false;
    }
    return true;
  }



  signIn(formPerson:NgForm, formBussines:NgForm){

    const validPerson = this.validationFormLogin(formPerson);
    const validBusiness = this.validationFormLogin(formBussines);

    if(this.isPersonLoggin && validPerson){
      this._accountService.signIn(this.login, this.isPersonLoggin).subscribe(resp=>{
        if(resp.IsSuccess){
          this._accountService.guardarStorage(resp);
          this.closeModal();
        }
      })


    }else if(!this.isPersonLoggin && validBusiness){
      this._accountService.signIn(this.loginB, this.isPersonLoggin).subscribe(resp=>{
        if(resp.IsSuccess){
          this._accountService.guardarStorage(resp);
          this.closeModal();
        }
      })

    }else if(!validPerson && this.isPersonLoggin){
      this.submitPerson = true; 
      // this.openSnackBar("El usuario y la contraseña son requeridos")
    }else if(!validBusiness && !this.isPersonLoggin){
      this.submitBusiness = true;
      // this.openSnackBar("El usuario y la contraseña son requeridos")
    }else{
      this.openSnackBar("Ocurrio un error")
    }

  }


  saveSocialAccount(Firstname: string, FatherLastname: string, Email: string, SocialNetwork: "G" | "F", IdSocialNetwork: string) {

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

  savePersonalAccount(): void {
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

  showSocialMediaLogin($event: { index: string | number; }) {
    this.isPersonLoggin = $event.index == 0 ? true : false;
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
