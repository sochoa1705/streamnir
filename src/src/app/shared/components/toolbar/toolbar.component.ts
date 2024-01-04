import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import { FileService } from 'src/app/Services/file.service';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../components/login/login.component';
import { Subscription } from 'rxjs';
import { NewAccountComponent } from '../../../components/new-account/new-account.component';
import { ForgotPasswordComponent } from '../../../components/forgot-password/forgot-password.component';
import { SocialAuthService } from 'angularx-social-login';
import { filter } from 'rxjs/operators';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
	@Input() menu: any[];
	@ViewChild('drawer') sidenav: MatSidenav;

	isLogged = false;
	userStorage: UserStorage;
	img: string;
	isWhiteMenu = true;
	showOptionsProfile = false;
	showToolTipInfo = false;
	showToolTipSupport = false;
	showMenuMobile = false;
	isPageResult=false;

	loginModalSubscription = new Subscription();

	constructor(
		private fileService: FileService,
		private _authService: SocialAuthService,
		private modalService: NgbModal,
		public route: Router,
		public accountService: AccountsService,
		private _checkoutService: CheckoutService
	) {
		this.route.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
			if (event.url.toString().includes('booking')) this.isWhiteMenu = false;
			else this.isWhiteMenu = true;

			if (event.url.toString().includes('resultados')) this.isPageResult = true;
			else this.isPageResult = false;
		});
	}

	ngOnInit() {
		this.route.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) if (event.url.includes('/home/')) event.url.replace('/home/', '');
		});

		this.accountService.isLogged().subscribe((logged) => {
			this.isLogged = logged;
			if (this.isLogged) {
				this.userStorage = this.accountService.getUserStorage();
				!this.userStorage.image ? this.downloadImage(this.userStorage) : null;
				this.userStorage = this.accountService.getUserStorage();
			}
		});

		this.loadUsuario();
	}

	downloadImage(user: UserStorage) {
		this.fileService.getImage(user.id).subscribe((img) => {
			this.userStorage.image = img;
			this.accountService.guardarImage(img);
		});
	}

	toHome() {
		this._checkoutService.currentIndexStep = -1;
		this.showMenuMobile=false;
		this.route.navigate(['/'], {
        replaceUrl: true,
      });
		// Renombrando valores para SEO - Inicio
		document.getElementsByTagName('title')[0].innerHTML = environment.SEO.home.title;

		let description = document.getElementsByName('description')[0];
		description.setAttribute('content', environment.SEO.home.description);

		const canonical = document.querySelector("link[rel='canonical']");
		canonical?.setAttribute('href', environment.SEO.home.url);

		const alternate = document.querySelector("link[rel='alternate']");
		alternate?.setAttribute('href', environment.SEO.home.url);

		const og_title = document.querySelector("meta[property='og:title']");
		og_title?.setAttribute('content', environment.SEO.home.title);

		const og_description = document.querySelector("meta[property='og:description']");
		og_description?.setAttribute('content', environment.SEO.home.description);

		const og_image = document.querySelector("meta[property='og:image']");
		og_image?.setAttribute('content', environment.SEO.home.image);

		const og_image_height = document.querySelector("meta[property='og:image:height']");
		og_image_height?.setAttribute('content', environment.SEO.home.height);

		const og_image_width = document.querySelector("meta[property='og:image:width']");
		og_image_width?.setAttribute('content', environment.SEO.home.width);

		const og_url = document.querySelector("meta[property='og:url']");
		og_url?.setAttribute('content', environment.SEO.home.url);
		// Renombrando valores para SEO - Fin
	}

	redirect(e: any) {
		//window.location.href = e;
		window.open(e, '_blank');
	}

	clickMenuMobile(isClose=false) {
		this.showMenuMobile = isClose ? false : !this.showMenuMobile;
		if (this.showMenuMobile) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	}

	showOptionUser: Boolean = false;
	showOption() {
		this.showOptionUser = !this.showOptionUser;
	}

	loadUsuario() {
		const userStr = this.accountService.getUserStorage();
		if (userStr.id > 0) this.accountService.dispatchLogged(true);
		else {
			this.accountService.dispatchLogged(false);
			this.openLoginFromUrl();
		}
	}

	openLoginFromUrl() {
		const hash = location.hash;
		if (hash && hash.trim() === '#login') setTimeout(() => this.openLoginModal(), 1000);
	}

	openLoginModal() {
		this.clickMenuMobile(true);
		const loginModalRef = this.modalService.open(LoginComponent, {
			backdrop: 'static'
		});
		this.loginModalSubscription = loginModalRef.closed.subscribe((result: any) => {
			history.pushState('', document.title, window.location.pathname + location.search);
			if (result) {
				if (!result.isLoggedIn && result.redirect)
					switch (result.redirect) {
						case 'NEW_ACCOUNT':
							this.openNewAccountModal();
							break;
						case 'FORGOT_PASSWORD':
							this.openForgotPasswordModal();
							break;
						default:
							break;
					}
			}
		});
	}

	openNewAccountModal() {
		const newAccountModalRef = this.modalService.open(NewAccountComponent, {
			backdrop: 'static',
			windowClass: 'new-account-modal'
		});
		newAccountModalRef.closed.subscribe((result: any) => {
			if (result && result.openLogin) this.openLoginModal();
		});
	}

	openForgotPasswordModal() {
		const forgotPasswordModalRef = this.modalService.open(ForgotPasswordComponent, {
			windowClass: 'forgot-password-modal',
			centered: true
		});
		forgotPasswordModalRef.closed.subscribe((result: any) => {
			if (result && result.openLogin) this.openLoginModal();
		});
	}

	logout() {
		this._authService.signOut();
		this.accountService.signOut();
		this.showOptionsProfile = false;
		this.clickMenuMobile(true);
		this.route.navigateByUrl('/');
	}

	close() {
		this.sidenav.close();
	}

	@ViewChild('dropdown') miDiv: ElementRef;
	@HostListener('document:click', ['$event'])
	blurRange(event: MouseEvent) {
		if (this.miDiv && !this.miDiv.nativeElement.contains(event.target)) {
			this.showOptionsProfile = false;
		}
	}

	ngOnDestroy() {
		this.loginModalSubscription.unsubscribe();
	}
}
