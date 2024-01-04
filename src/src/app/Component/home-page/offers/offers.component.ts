import { Component, OnDestroy, OnInit } from '@angular/core';
import { OffersService } from '../../../Services/offers/offers.service';
import { Offers } from '../../../Models/offers/offers.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { getItemWithExpiration, Guid, setItemWithExpiration } from '../../../shared/utils';
import { FlightService } from '../../../api/api-nmviajes/services/flight.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
	selector: 'app-offers',
	templateUrl: './offers.component.html',
	styleUrls: [ './offers.component.scss' ]
})
export class OffersComponent implements OnInit, OnDestroy {
	isLoading = true;

	internationalFlights: any[] = [];
	nationalFlights: any[] = [];
	itineraries: any[] = [];

	offersSubscription = new Subscription();

	constructor(private offersService: OffersService,
	            private flightsService: FlightService,
	            private router: Router) {
	}

	ngOnInit(): void {
		this.getFlights();
		this.getOffers();
	}

	getFlights() {
		const storedFlights = getItemWithExpiration('mostWanted');
		if (storedFlights != null) {
			const mostWanted = this.mapFlights(storedFlights);
			this.internationalFlights = mostWanted.filter((item: any) => !item.isDomestic).slice(0, 6);
			this.nationalFlights = mostWanted.filter((item: any) => item.isDomestic).slice(0, 6);
		} else {
			this.flightsService.v1ApiFlightGetMostWantedGet({
				TrackingCode: Guid(),
				MuteExceptions: environment.muteExceptions,
				'Caller.Company': 'Expertia',
				'Caller.Application': 'NMViajes'
			}).subscribe((res: any) => {
				setItemWithExpiration('mostWanted', JSON.parse(res).Result, 5);
				const resJson = this.mapFlights(JSON.parse(res).Result);
				this.internationalFlights = resJson.filter((item: any) => !item.isDomestic).slice(0, 6);
				this.nationalFlights = resJson.filter((item: any) => item.isDomestic).slice(0, 6);
			});
		}
	}

	private mapFlights(flights: any[]): any[] {
		return flights.map((item: any) => {
			return {
				origin: 'Lima',
				destination: item.Destination,
				type: 1,
				flightType: 'ida y vuelta',
				price: item.Rate,
				image: item.Image,
				link: `/vuelos/destino/LIM/${item.DestinationCode}`,
				condition: 'Tarifa por persona, las tarifas son dinámicas.',
				isDomestic: item.Type === 'NAC',
				nights: null,
				packageIncludes: [],
				accommodationType: null
			};
		});
	}

	getOffers() {
		this.offersSubscription = this.offersService.getFlightsOffers().pipe(
				map(offers => offers.filter(o => o.mostrar))
		).subscribe({
			next: (flights: Offers[]) => {
				this.itineraries = flights
						.filter((f: Offers) => f.tipoOferta == 2)
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
							};
						});
				this.isLoading = false;
			},
			error: (err: any) => {
				this.isLoading = false;
				console.error(err);
			}
		});
	}

	onClick(url: string, useRouter: boolean) {
		if (useRouter) this.router.navigateByUrl(url);
		else location.href = url;
	}

	ngOnDestroy() {
		this.offersSubscription.unsubscribe();
	}
}
