import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryItem } from 'src/app/Models/gallery/gallery-item.model';
import { Offers } from 'src/app/Models/offers/offers.model';
import { OffersService } from 'src/app/Services/offers/offers.service';

@Component({
  selector: 'app-section-super-offers',
  templateUrl: './section-super-offers.component.html',
  styleUrls: ['./section-super-offers.component.scss']
})
export class SectionSuperOffersComponent implements OnInit {

  indexTab=0;

  bannerImgSrc: GalleryItem = {
		codigo: '',
		urlImagen: '',
		descripcion: '',
		link: ''
	};

	internationalFlights: any[] = [];
	nationalFlights: any[] = [];
	itineraries: any[] = [];

  internationalFlightsPag: any[] = [];
	nationalFlightsPag: any[] = [];
	itinerariesPag: any[] = [];

	bannerSubscription = new Subscription();
	offersSubscription = new Subscription();

  pagination=4;

	constructor(private offersService: OffersService) {}

	ngOnInit(): void {
		this.getOffers();
	}


	getOffers() {
		this.offersSubscription = this.offersService.getFlightsOffers().pipe(
				map(offers => {
          console.log(offers,'seee')
          return offers.filter(o => o.mostrar)
        })
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

        console.log(this.internationalFlights, this.nationalFlights)
			},
			error: (err: any) => console.error(err)
		});
	}

	onClick(url: string) {
		location.href = url;
	}

  showMore(){

  }

	ngOnDestroy() {
		this.bannerSubscription.unsubscribe();
		this.offersSubscription.unsubscribe();
	}


}
