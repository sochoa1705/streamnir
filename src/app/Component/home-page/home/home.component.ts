import { Component, OnInit } from '@angular/core';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';
import { IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { CryptoService } from 'src/app/Services/util/crypto.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition('void => *', [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
			transition('* => void', [style({ opacity: 0 })])
		])
	]
})
export class HomeComponent implements OnInit {
	destiny: any = [];
	destinyString: any;

	airfare: any;

	bannersDestacadosWeb: any[] = [];
	bannersDestacadosTablet: any[] = [];
	bannersDestacadosMobile: any[] = [];

	bannersDestacados: IGalleryImage[] = [];
	bannersCorporativos: IGalleryImage[] = [];

	loadedGallery = false;

	selectedTab: string;
	indexSelectedTab = 0;
	backgroundSearch = '';

	constructor(
		public dataPagePresenterService: DataPagePresenterService,
		public asidePresenterService: AsidePresenterService,
		public destinyService: DestinyService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _accountsService: AccountsService,
		public loaderSubjectService: LoaderSubjectService,
		private _cryptoService: CryptoService
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((product) => {
			let userID: string = '';
			let user_existingCustomer: boolean = false;
			const credentials = localStorage.getItem('usuario');
			const bookings = localStorage.getItem('bookings');

			if (credentials) {
				const credentialsJson = JSON.parse(credentials);
				userID = this._cryptoService.encrypt(credentialsJson.email);

				if (bookings) user_existingCustomer = JSON.parse(bookings).length > 0;
			}

			(window as any).dataLayer = (window as any).dataLayer || [];
			(window as any).dataLayer.push({
				event: 'user_info',
				userID: userID,
				user_existingCustomer: user_existingCustomer
			});

			(window as any).dataLayer.push({
				event: 'virtualPageView',
				virtualPagePath: `/confirmacion/${product.tab}`,
				virtualPageTitle: 'NMV: Confirmacion'
			});
		});
		this.casos();
		//this.listDestiny();
		this.getConfirmacion();
		this.getGallery();
		//this.getAirfare();

		localStorage.removeItem('filters');
	}

	casos() {
		this._activatedRoute.url.subscribe((urlSegments) => {
			const tab = urlSegments.map((segment) => segment.path)[0];
			switch (tab) {
				case 'paquetes':
					this.indexSelectedTab = 1;
					break;
				case 'armapaquete':
					this.indexSelectedTab = 2;
					break;
				case 'vuelohotel':
					this.indexSelectedTab = 3;
					break;
				case 'hoteles':
					this.indexSelectedTab = 4;
					break;
				case 'autos':
					this.indexSelectedTab = 5;
					break;
				case 'actividades':
					this.indexSelectedTab = 6;
					break;
				default:
					this.indexSelectedTab = 0;
					break;
			}
		});
	}

	getConfirmacion() {
		this._activatedRoute.params
			.pipe(
				filter((params) => params.id),
				tap(() => this.initLoad()),
				switchMap((param) => this._accountsService.confirmationAccount(param.id))
			)
			.subscribe((resp) => {
				this.loaderSubjectService.closeLoader();
				if (resp.IsSuccess) {
					this._accountsService.dispatchConfirmate(true);
					this.toggleConfirmation();
				}
			});
	}

	initLoad() {
		const textSend = 'Cargando';
		this.loaderSubjectService.showText(textSend);
		this.loaderSubjectService.showLoader();
	}

	getGallery() {
		this.dataPagePresenterService.getDataGallery().subscribe((data) => {
			this.backgroundSearch =
				data.filter((item) => item.Code == 'BANNER_PRINCIPAL')[0].Images[0].PathImage.replace(/ /g, '%20') ??
				'/assets/banner/home_search.png';
			this.bannersDestacadosWeb = data
				.filter(
					(item) =>
						item.Code == 'BANNERS_DESTACADOS_1' ||
						item.Code == 'BANNERS_DESTACADOS_2' ||
						item.Code == 'BANNERS_DESTACADOS_3'
				)
				.map((item) => item.Images);
			this.bannersDestacadosTablet = data
				.filter(
					(item) =>
						item.Code == 'BANNERS_DESTACADOS_TABLET_1' ||
						item.Code == 'BANNERS_DESTACADOS_TABLET_2' ||
						item.Code == 'BANNERS_DESTACADOS_TABLET_3'
				)
				.map((item) => item.Images);

			this.bannersDestacadosMobile = data
				.filter(
					(item) =>
						item.Code == 'BANNERS_DESTACADOS_MOBILE_1' ||
						item.Code == 'BANNERS_DESTACADOS_MOBILE_2' ||
						item.Code == 'BANNERS_DESTACADOS_MOBILE_3'
				)
				.map((item) => item.Images);
		});
	}

	aceptConfirm() {
		this.toggleConfirmation();
		this._router.navigateByUrl('/');
		this.openModalSession();
	}

	toggleConfirmation() {
		const modal = document.getElementById('ModalUsuarioVerificado');

		if (!modal) {
			return;
		}

		bootstrap.Modal.getOrCreateInstance(modal).toggle();
	}

	openModalSession() {
		const moodalSession: any = document.querySelector("[data-bs-target='#ModalSesion']");

		if (!moodalSession) {
			return;
		}

		moodalSession.click();
	}

	listDestiny() {
		let payload = new NMRequest();

		this.destinyService
			.getDestiny(payload)
			.pipe(take(1))
			.subscribe({
				next: (response) => {
					this.destiny = response['Resultado'];
					localStorage.setItem('destiny', JSON.stringify(this.destiny));
				},
				error: (error) => console.log(error)
			});
	}
}
