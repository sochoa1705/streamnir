import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from '../../shared/utils';
import { environment } from '../../../environments/environment';
import { ModelTaggingLogin } from '../../Services/analytics/tagging.models';
import * as bootstrap from 'bootstrap';
import { AccountsService } from '../../Services/accounts.service';
import { ValidatorsService } from '../../shared/validators/validators.service';
import { TaggingService } from '../../Services/analytics/tagging.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../Services/notification.service';
import { LoaderSubjectService } from '../../shared/components/loader/service/loader-subject.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-account',
	templateUrl: './new-account.component.html',
	styleUrls: [ './new-account.component.scss' ]
})
export class NewAccountComponent implements OnInit {
	isPerson: boolean = true;

	personalAccountForm: FormGroup;
	businessAccountForm: FormGroup;

	socialMedia: Boolean = true;

	constructor(private _authService: SocialAuthService,
	            private _accountService: AccountsService,
	            private _formBuilder: FormBuilder,
	            private _validatorsService: ValidatorsService,
	            private _matSnackBar: MatSnackBar,
	            private notification: NotificationService,
	            private router: Router,
	            public loaderSubjectService: LoaderSubjectService,
	            public activeModal: NgbActiveModal) {
	}

	ngOnInit(): void {
		this.personalAccountForm = this.createPersonalAccountForm();
		this.businessAccountForm = this.createBusinessAccountForm();
	}

	initLoading() {
		const textSend = 'CARGANDO';
		this.loaderSubjectService.showText(textSend);
		this.loaderSubjectService.showLoader();
	}

	closeLoading() {
		this.loaderSubjectService.closeLoader();
	}

	createBusinessAccountForm(): FormGroup {
		return this._formBuilder.group({
			ruc: [ '', [ Validators.required, Validators.minLength(11), Validators.pattern(this._validatorsService.digitsPattern) ] ],
			businessName: [ '', [ Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern) ] ],
			firstName: [ '', [ Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern) ] ],
			fatherLastname: [ '', [ Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern) ] ],
			motherLastname: [ '', [ Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern) ] ],
			email: [ '', [ Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern) ] ],
			password: [ '', [ Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern) ] ],
			repeatPassword: [ '', [ Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern) ] ]
		}, {
			validators: [ this._validatorsService.equalFields('password', 'repeatPassword'),
				this._validatorsService.validateRUC('', 'ruc') ]
		});
	}

	createPersonalAccountForm(): FormGroup {
		return this._formBuilder.group({
			firstName: [ '', [ Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern) ] ],
			fatherLastname: [ '', [ Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern) ] ],
			motherLastname: [ '', [ Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern) ] ],
			email: [ '', [ Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern) ] ],
			password: [ '', [ Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern) ] ],
			repeatPassword: [ '', [ Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.passwordPattern) ] ]
		}, {
			validators: [ this._validatorsService.equalFields('password', 'repeatPassword') ]
		});
	}

	signInWithGoogle(): void {
		this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
	}

	showSocialMedia($event: { index: string | number; }) {
		this.socialMedia = $event.index == 0;
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
					Company: 'Expertia',
					Application: 'NMViajes'
				},
				Parameter: {
					Firstname: this.businessAccountForm.get('firstName')?.value,
					FatherLastname: this.businessAccountForm.get('fatherLastname')?.value,
					MotherLastname: this.businessAccountForm.get('motherLastname')?.value,
					Email: this.businessAccountForm.get('email')?.value,
					Password: this.businessAccountForm.get('password')?.value,
					IsPerson: false,
					Ruc: this.businessAccountForm.get('ruc')?.value,
					BusinessName: this.businessAccountForm.get('businessName')?.value
				}
			};

			this._accountService.saveAccount(payload).subscribe({
				next: (response) => {
					if (response.Result.IsSuccess) {
						const modelTag = new ModelTaggingLogin('Signup', 'Cuenta Empresa', 'Password', response.Result.Email, response.Result.Id);
						this.tagging(modelTag);
						this._matSnackBar.open(`Gracias por registrar su empresa ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
							verticalPosition: 'top',
							duration: 2000
						});
					} else
						this.notification.showNotificacion('Error', 'Ingrese datos correctos', 10);
				},
				error: () => this.notification.showNotificacion('Error', 'Error del servidor', 10)
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

	openLoginModal() {
		this.activeModal.close({
			openLogin: true
		});
	}

	goToPolicy() {
		const url = this.router.serializeUrl(this.router.createUrlTree([ '/politicas' ]));
		window.open(url, '_blank');
	}

	get personalAccountEmailErrorMessage(): string {
		const errors = this.personalAccountForm.get('email')?.errors;
		if (errors?.required)
			return 'Ingresa tu email';
		else if (errors?.minlength)
			return `Un email válido tiene ${errors?.minlength.requiredLength} caracteres como mínimo.`;
		else if (errors?.pattern)
			return 'El valor ingresado no tiene formato de email.';
		return '';
	}

	get businessAccountRUCErrorMessage(): string {
		const errors = this.businessAccountForm.get('ruc')?.errors;
		if (errors?.required)
			return 'Ingresa el número de RUC';
		else if (errors?.minlength)
			return `Un RUC válido tiene ${errors?.minlength.requiredLength} dígitos.`;
		else if (errors?.notValid)
			return 'Ingresa un número de RUC válido.';
		return '';
	}

	get businessAccountEmailErrorMessage(): string {
		const errors = this.businessAccountForm.get('email')?.errors;
		if (errors?.required)
			return 'Ingresa tu email';
		else if (errors?.minlength)
			return `Un email válido tiene ${errors?.minlength.requiredLength} caracteres como mínimo.`;
		else if (errors?.pattern)
			return 'El valor ingresado no tiene formato de email.';
		return '';
	}
}
