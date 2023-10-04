import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { MisReservasService } from 'src/app/Component/home-page/perfil/mis-reservas-vuelos/mis-reservas-vuelos.service';
import { AccountsService, AuthDTO } from 'src/app/Services/accounts.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

export class LoginPerson {
	constructor(
			public email = '',
			public password = '',
			public recorder = false
	) {
	}
}

export class LoginBusiness {
	constructor(
			public email = '',
			public password = '',
			public recorder = false
	) {
	}
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {
	isPersonLogin: boolean = true;

	submitBusiness = false;
	submitPerson = false;

	login = new LoginPerson();
	loginB = new LoginBusiness();

	socialMedia: Boolean = true;

	authStateSubscription = new Subscription();

	constructor(
			private _authService: SocialAuthService,
			private _accountService: AccountsService,
			private _matSnackBar: MatSnackBar,
			private notification: NotificationService,
			private misReservasService: MisReservasService,
			public loaderSubjectService: LoaderSubjectService,
			public activeModal: NgbActiveModal
	) {
	}

	ngOnInit(): void {
		this._authService.authState.subscribe((user) => {
			if (user && user.provider == 'GOOGLE')
				this.saveSocialAccount(user.firstName, user.lastName, user.email, 'G', user.id, user.photoUrl);
		});
		location.hash = 'login';
	}

	initLoading() {
		const textSend = 'CARGANDO';
		this.loaderSubjectService.showText(textSend);
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
				MotherLastname: '',
				Email,
				Password: '',
				IsPerson: true,
				Ruc: '',
				BusinessName: '',
				SocialNetwork,
				IdSocialNetwork
			}
		};
		this._accountService.saveAccount(payload).subscribe({
			next: (response) => {
				this.closeLoading();
				if (response.Result.IsSuccess) {
					this._accountService.guardarStorage(response.Result, image, SocialNetwork);
					this._matSnackBar.open(`Gracias por registrarte ${response.Result.Firstname} ${response.Result.FatherLastname}`, 'OK', {
						verticalPosition: 'top',
						duration: 2000
					});
					this.activeModal.close({
						loggedIn: true,
						redirect: null
					});
				} else
					this.notification.showNotificacion('Error', response.Result.Message, 10);
			},
			error: () => {
				this.closeLoading();
				this.notification.showNotificacion('Error', 'Error del servidor', 10);
			}
		});
	}

	openNewAccount() {
		this.activeModal.close({
			isLoggedIn: false,
			redirect: 'NEW_ACCOUNT'
		});
	}

	openForgotPassword() {
		this.activeModal.close({
			isLoggedIn: false,
			redirect: 'FORGOT_PASSWORD'
		});
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

		if (this.isPersonLogin && validPerson) {
			this._accountService.signIn(this.login, this.isPersonLogin).subscribe(resp => {
				if (resp.IsSuccess) {
					this._accountService.guardarStorage(resp);
					this.getAllBookings(resp);
					this.activeModal.close({
						loggedIn: true,
						redirect: null
					});
				} else this.notification.showNotificacion('Error', resp.Message, 10);
			}, () => {
				this.notification.showNotificacion('Error', 'Error de autenticación', 10);
				this.closeLoading();
			}, () => this.closeLoading());
		} else if (!this.isPersonLogin && validBusiness)
			this._accountService.signIn(this.loginB, this.isPersonLogin).subscribe(resp => {
				if (resp.IsSuccess) {
					this._accountService.guardarStorage(resp);
					this.getAllBookings(resp);
					this.activeModal.close({
						loggedIn: true,
						redirect: null
					});
				}
			}, () => {
				this.notification.showNotificacion('Error', 'Error de validación', 5);
				this.closeLoading();
			}, () => this.closeLoading());
		else {
			if (!validPerson && this.isPersonLogin)
				this.submitPerson = true;
			else if (!validBusiness && !this.isPersonLogin)
				this.submitBusiness = true;
			else
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
		this._matSnackBar.open(message, '', {
			duration: 2000,
			panelClass: [ 'mat-toolbar', 'mat-warn' ]
		});
	}

	togglePassword(pass: HTMLInputElement) {
		pass.type = pass.type == 'password' ? 'text' : 'password';
	}

	showSocialMediaLogin($event: { index: string | number; }) {
		this.isPersonLogin = $event.index == 0;
	}

	ngOnDestroy() {
		this.authStateSubscription.unsubscribe();
	}
}
