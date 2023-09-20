import { Component, OnInit } from '@angular/core';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';
import { FlightService } from 'src/app/api/api-nmviajes/services';
import { EGalleryCode, IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { CryptoService } from 'src/app/Services/util/crypto.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	destiny: any = [];
	destinyString: any;

	airfare: any;

	bannersDestacadosWeb:any[] = [];
	

	bannersDestacados: IGalleryImage[] = [];
	bannersCorporativos: IGalleryImage[] = [];

	loadedGallery = false;

	selectedTab: string;
	indexSelectedTab = 0;

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

			this.casos(product.tab);
		});

		this.listDestiny();
		this.getConfirmacion();
		this.getGallery();
		//this.getAirfare();

		localStorage.removeItem('filters');
	}

	casos(tab: any) {
		switch (tab) {
			case 'paquetes':
				this.selectedTab = 'paquetes';
				break;
			case 'armapaquete':
				this.selectedTab = 'armapaquete';
				break;
			case 'vuelohotel':
				this.selectedTab = 'vuelohotel';
				break;
			case 'hoteles':
				this.selectedTab = 'hoteles';
				break;
			case 'autos':
				this.indexSelectedTab=5
				break;
			case 'actividades':
				this.selectedTab = 'actividades';
				break;
			default:
				this.selectedTab = 'home';
				break;
		}
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
			console.log(data,'banners')
		    this.bannersDestacadosWeb = data
				.filter((item) => item.Code == 'BANNERS_DESTACADOS_1' || item.Code == 'BANNERS_DESTACADOS_2' || item.Code == 'BANNERS_DESTACADOS_3' )
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
