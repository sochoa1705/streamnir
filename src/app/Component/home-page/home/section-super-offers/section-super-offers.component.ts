import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryItem } from 'src/app/Models/gallery/gallery-item.model';
import { Offer, Offers } from 'src/app/Models/offers/offers.model';
import { OffersService } from 'src/app/Services/offers/offers.service';

@Component({
	selector: 'app-section-super-offers',
	templateUrl: './section-super-offers.component.html',
	styleUrls: ['./section-super-offers.component.scss']
})
export class SectionSuperOffersComponent implements OnInit {
	indexTab = 0;

	internationalFlights: Offer[] = [];
	nationalFlights: Offer[] = [];

	internationalFlightsPag: Offer[] = [];
	nationalFlightsPag: Offer[] = [];

	packages: any[] = [];
	offersSubscription = new Subscription();

	currentPagNac = 0;
	currentPagInc = 0;

	showPackages = true;
	showOffersNac = true;
	showOffersInt = true;
	hiddenSection = false;

	constructor(private offersService: OffersService) {}

	ngOnInit(): void {
		this.offersNacInt();
		this.getPackages();
	}

	offersNacInt() {
		this.offersService.getOffersNationalInternational().subscribe({
			next: (res) => {
				this.nationalFlights = res.Result.filter((item) => item.Type == 'NAC');
				this.nationalFlightsPag = this.nationalFlights.slice(0, 4);
				this.internationalFlights = res.Result.filter((item) => item.Type == 'INT');
				this.internationalFlightsPag = this.internationalFlights.slice(0, 4);
				if (this.nationalFlights.length == 0) this.showOffersNac = false;
				if (this.internationalFlights.length == 0) this.showOffersInt = false;
				this.updateDisplayedDataNac();
				this.updateDisplayedDataInc();
			},
			error: (err) => {
				this.showOffersNac = false;
				this.showOffersInt = false;
			}
		});
	}
	getPackages() {
		this.offersSubscription = this.offersService
			.getFlightsOffers()
			.pipe(map((offers) => offers.filter((o) => o.mostrar)))
			.subscribe({
				next: (flights: Offers[]) => {
					const parsed = flights.map((f: Offers) => {
						return {
							origin: f.origen,
							destination: f.destino,
							type: f.tipoOferta,
							flightType: f.tipoVuelo == 1 ? 'ida y vuelta' : 'sólo ida',
							price: f.precio,
							image: f.urlImagen,
							link: f.link,
							condition: f.tyc,
							isDomestic: f.esNacional,
							nights: f.noches,
							packageIncludes: f.incluye?.join(' - '),
							accommodationType: f.tipoAlojamiento
						};
					});
					this.packages = [...parsed].filter((f) => f.type == 2);
					if (this.packages.length == 0) this.showPackages = false;
					console.log(this.packages)
					this.verifyHiddenSection();
				},
				error: (err: any) => {
					this.showPackages = false;
					this.verifyHiddenSection();
				}
			});
	}

	verifyHiddenSection() {
		if (!this.showOffersNac && !this.showPackages && !this.showOffersInt) this.hiddenSection = true;
	}

	showMore() {
		if (this.indexTab == 0) this.updateDisplayedDataNac();
		if (this.indexTab == 1) this.updateDisplayedDataInc();
	}

	updateDisplayedDataNac() {
		const currentPagNac = this.currentPagNac + 4;
		if (currentPagNac > this.nationalFlights.length) {
			this.nationalFlightsPag = this.nationalFlights.slice(0, 4);
			this.currentPagNac = 4;
			this.scrollReset();
		} else {
			this.nationalFlightsPag = this.nationalFlights.slice(0, currentPagNac);
			this.currentPagNac = currentPagNac;
		}
	}

	updateDisplayedDataInc() {
		const currentPagInc = this.currentPagInc + 4;
		if (currentPagInc > this.internationalFlights.length) {
			this.internationalFlightsPag = this.internationalFlights.slice(0, 4);
			this.currentPagInc = 4;
			this.scrollReset();
		} else {
			this.internationalFlightsPag = this.internationalFlights.slice(0, currentPagInc);
			this.currentPagInc = currentPagInc;
		}
	}

	ngOnDestroy() {
		this.offersSubscription.unsubscribe();
	}

	scrollReset(){
		const scrollPercentage = 21; // Porcentaje de desplazamiento
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTo = (documentHeight - windowHeight) * (scrollPercentage / 100);
		window.scroll({ top: scrollTo, behavior: 'smooth' });
	}
}
