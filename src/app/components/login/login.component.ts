import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import * as bootstrap from 'bootstrap';
import { MisReservasService } from 'src/app/Component/home-page/perfil/mis-reservas-vuelos/mis-reservas-vuelos.service';
import { AccountsService, AuthDTO } from 'src/app/Services/accounts.service';
import { ModelTaggingLogin } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { Guid } from 'src/app/shared/utils';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { environment } from 'src/environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
	@ViewChild('closeModalNewAccount') closeModalNewAccount: ElementRef;

	isPersonLoggin: boolean = true;
	isPerson: boolean = true;

	submitBusiness = false;
	submitPerson = false;

	personalAccountForm: FormGroup;

	businessAccountForm: FormGroup;

	login = new LoginPerson();
	loginB = new LoginBusiness();

	socialMedia: Boolean = true;

  constructor(
      private _authService: SocialAuthService,
      private _accountService: AccountsService,
      private _formBuilder: FormBuilder,
      private _matSnackBar: MatSnackBar,
      private _validatorsService: ValidatorsService,
      public loaderSubjectService: LoaderSubjectService,
      private notification: NotificationService,
      private misReservasService: MisReservasService,
      public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      if (user && user.provider == "GOOGLE")
        this.saveSocialAccount(user.firstName, user.lastName, user.email, "G", user.id, user.photoUrl)
    });

    this.loadUsuario();
    this.personalAccountForm = this.createPersonalAccountForm();
    this.businessAccountForm = this.createBusinessAccountForm();
  }


  initLoading() {
    const textSend = 'CARGANDO'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader();
  }


  saveSocialAccount(Firstname: string,
                    FatherLastname: string,
                    Email: string,
                    SocialNetwork: 'G' | 'F',
                    IdSocialNetwork: string,
                    image: string) {
    this.initLoading();
    const payload: any = {
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      Caller: {
        Company: 'Expertia',
        Application: 'NMViajes'
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
          this._accountService.guardarStorage(response.Result, image, SocialNetwork);
          this._matSnackBar.open(`Gracias por registrarte ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
          this.activeModal.close(true);
        } else
          this.notification.showNotificacion('Error', response.Result.Message, 10);


        //this.loaderSubjectService.closeLoader()
      },
      error: () => {
        this.closeLoading();
        this.notification.showNotificacion("Error", "Error del servidor", 10);

        //this.loaderSubjectService.closeLoader()
      },
      complete: () => { }
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
      this._validatorsService.validateRUC('', 'ruc')]
    });
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



  validateBusinessAccountForm(field: string) {
    return this.businessAccountForm.controls[field].errors
      && this.businessAccountForm.controls[field].touched;
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
          Company: "Expertia",
          Application: "NMViajes"
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

            const modelTag = new ModelTaggingLogin("Signup", "Cuenta Empresa", "Password", response.Result.Email, response.Result.Id);
            this.tagging(modelTag);


            this._matSnackBar.open(`Gracias por registrar su empresa ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          } else {
            this.notification.showNotificacion("Error", "Ingrese datos correctos", 10);
          }

          //this.loaderSubjectService.closeLoader()
        },
        error: () => {
          this.notification.showNotificacion("Error", "Error del servidor", 10);
          //this.loaderSubjectService.closeLoader()
        },
        complete: () => { }
      });
    }
  }

	savePersonalAccount(): void {
		this.initLoading();
		if (this.personalAccountForm.invalid) {
			this.closeLoading();
			this.notification.showNotificacion('Error', 'Error de validación');
			this.personalAccountForm.markAllAsTouched();
			return;
		}
		if (this.personalAccountForm.valid) {
			const payload = {
				TrackingCode: Guid(),
				MuteExceptions: environment.muteExceptions,
				Caller: {
					Company: 'Expertia',
					Application: 'NMViajes'
				},
				Parameter: {
					Firstname: this.personalAccountForm.get('firstName')?.value,
					FatherLastname: this.personalAccountForm.get('fatherLastname')?.value,
					MotherLastname: this.personalAccountForm.get('motherLastname')?.value,
					Email: this.personalAccountForm.get('email')?.value,
					Password: this.personalAccountForm.get('password')?.value,
					IsPerson: true,
					Ruc: '',
					BusinessName: ''
				}
			};
			this._accountService.saveAccount(payload).subscribe({
				next: (response) => {
					this.closeLoading();
					const isSuccess = response.Result.IsSuccess;
					if (isSuccess) {
						const modelTag = new ModelTaggingLogin('Signup', 'Cuenta Personal', 'Password', response.Result.Email, response.Result.Id);
						this.tagging(modelTag);
						this.toggleModalVerificaCorreo();
						this.personalAccountForm.reset();
						this._matSnackBar.open(`Gracias por registrarte ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
							verticalPosition: 'top',
							duration: 2000
						});
						this.activeModal.close(true);
					} else
						this.notification.showNotificacion('Error', response.Result.Message || 'Error', 10);
				},
				error: () => {
					this.closeLoading();
					this.notification.showNotificacion('Error', 'Error del servidor', 10);
				}
			});
		}
	}

	toggleModalVerificaCorreo() {
		const modal = document.getElementById('ModalVerificaCorreo');
		if (!modal) return;
		bootstrap.Modal.getOrCreateInstance(modal).toggle();
	}

  tagging(model: ModelTaggingLogin) {
    TaggingService.tagLoginSignup(model);
  }

  private getAllBookings(usuario: AuthDTO) {
    this.misReservasService.getAllBooking(usuario.Id.toString()).subscribe((data) => {
      localStorage.setItem('bookings', JSON.stringify(data));
    });
  }

	signIn(formPerson: NgForm, fromBusiness: NgForm) {
		const validPerson = this.validationFormLogin(formPerson);
		const validBusiness = this.validationFormLogin(fromBusiness);

		this.initLoading();

		if (this.isPersonLoggin && validPerson) {
			this._accountService.signIn(this.login, this.isPersonLoggin).subscribe(resp => {
				this.closeLoading();
				if (resp.IsSuccess) {
					const modelTag = new ModelTaggingLogin('Login', 'Cuenta Personal', 'Password', resp.Email, resp.Id);
					this.tagging(modelTag);
					this._accountService.guardarStorage(resp);
					this.getAllBookings(resp);
					this.activeModal.close(true);
				} else {
					this.notification.showNotificacion('Error', resp.Message, 10);
					this.closeLoading();
				}
			}, () => {
				this.notification.showNotificacion('Error', 'Error de autenticación', 10);
				this.closeLoading();
			});
		} else if (!this.isPersonLoggin && validBusiness) {
			this._accountService.signIn(this.loginB, this.isPersonLoggin).subscribe(resp => {
				if (resp.IsSuccess) {
					this.closeLoading();
					const modelTag = new ModelTaggingLogin('Login', 'Cuenta Empresa', 'Password', resp.Email, resp.Id);
					this.tagging(modelTag);
					this._accountService.guardarStorage(resp);
					this.getAllBookings(resp);
					this.activeModal.close(true);
				}
			}, () => {
				this.notification.showNotificacion('Error', 'Error de validación', 5);
				this.closeLoading();
			});
		} else if (!validPerson && this.isPersonLoggin) {
			this.submitPerson = true;
			this.notification.showNotificacion('Error', 'Error de validación', 5);
			this.closeLoading();
		} else if (!validBusiness && !this.isPersonLoggin) {
			this.submitBusiness = true;
			this.notification.showNotificacion('Error', 'Error de validación', 5);
			this.closeLoading();
		} else {
			this.openSnackBar('Ocurrió un error');
			this.notification.showNotificacion('Error', 'Error de validación', 5);
			this.closeLoading();
		}
	}

  signInWithGoogle(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  validationFormLogin(form: NgForm) {
    return !form.invalid;
  }

  closeLoading() {
    this.loaderSubjectService.closeLoader();
  }

  openSnackBar(message: string) {
    this._matSnackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  togglePassword(pass: HTMLInputElement) {
    if (pass.type == "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }

  showSocialMediaLogin($event: { index: string | number; }) {
    this.isPersonLoggin = $event.index == 0;
  }
}
