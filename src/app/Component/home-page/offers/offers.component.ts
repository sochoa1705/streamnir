import { Component, OnDestroy, OnInit } from '@angular/core';
import { OffersService } from '../../../Services/offers/offers.service';
import { Offers } from '../../../Models/offers/offers.model';
import { GalleryService } from '../../../Services/gallery/gallery.service';
import { GalleryItem } from '../../../Models/gallery/gallery-item.model';
import { first, map } from 'rxjs/operators';
import { flatMap } from 'rxjs/internal/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-offers',
	templateUrl: './offers.component.html',
	styleUrls: [ './offers.component.scss' ]
})
export class OffersComponent implements OnInit, OnDestroy {
	bannerImgSrc: GalleryItem = {
		codigo: '',
		urlImagen: '',
		descripcion: '',
		link: ''
	};

	internationalFlights: any[] = [];
	nationalFlights: any[] = [];
	itineraries: any[] = [];

	bannerSubscription = new Subscription();
	offersSubscription = new Subscription();

	constructor(private offersService: OffersService, private galleryService: GalleryService) {}

	ngOnInit(): void {
		this.getOffers();
		this.getBanner();
	}

	getBanner() {
		this.bannerSubscription = this.galleryService.getGalleryItems().pipe(
				flatMap(items => items),
				first(items => items.codigo == 'OFERTAS_BANNER')
		).subscribe({
			next: (item: GalleryItem) => this.bannerImgSrc = item,
			error: (err: any) => console.error(err)
		});
	}

	getOffers() {
		this.offersSubscription = this.offersService.getFlightsOffers().pipe(
				map(offers => offers.filter(o => o.mostrar))
		).subscribe({
			next: (flights: Offers[]) => {
				const parsed = flights
						.map((f: Offers) => {
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
							}
						});
				this.internationalFlights = [ ...parsed ].filter(f => f.type == 1 && !f.isDomestic);
				this.nationalFlights = [ ...parsed ].filter(f => f.type == 1 && f.isDomestic);
				this.itineraries = [ ...parsed ].filter(f => f.type == 2);
			},
			error: (err: any) => console.error(err)
		});
	}

	onClick(url: string) {
		location.href = url;
	}

	ngOnDestroy() {
		this.bannerSubscription.unsubscribe();
		this.offersSubscription.unsubscribe();
	}
}
