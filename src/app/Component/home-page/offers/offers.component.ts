import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../Services/offers/offers.service';
import { Offers } from '../../../Models/offers/offers.model';

@Component({
	selector: 'app-offers',
	templateUrl: './offers.component.html',
	styleUrls: [ './offers.component.scss' ]
})
export class OffersComponent implements OnInit {
	internationalFlights: any[] = [];
	nationalFlights: any[] = [];
	itineraries: any[] = [];

	constructor(private offersService: OffersService) { }

	ngOnInit(): void {
		this.getInternationalFlights();
	}

	getInternationalFlights() {
		this.offersService.getFlightsOffers().subscribe({
			next: (flights) => {
				const filteredFlights = flights
						.filter(f => f.mostrar)
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
								isDomestic: f.esNacional
							}
						});
				this.internationalFlights = [...filteredFlights].filter(f => f.type == 1 && !f.isDomestic);
				this.nationalFlights = [...filteredFlights].filter(f => f.type == 1 && f.isDomestic);
				this.itineraries = [...filteredFlights].filter(f => f.type == 2);
			},
			error: (err: any) => console.error(err)
		});
	}

	onClick(url: string) {
		location.href = url;
	}

}
