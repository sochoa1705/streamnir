import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { InputPassengersComponent } from '../../input-passengers/input-passengers.component';
import { InputRangeComponent } from '../../input-range/input-range.component';
import { InputSearchFlightComponent } from '../../input-search-flight/input-search-flight.component';
import { InputClassComponent } from '../../input-class/input-class.component';
import { NotificationService } from 'src/app/Services/notification.service';
import { AccountsService } from 'src/app/Services/accounts.service';
import { Router } from '@angular/router';
export interface Search {
	flightClass: number;
	adults: number;
	children: number;
	infants: number;
	arrivalLocation: string | null;
	departureLocation: string | null;
	arrivalDate: string;
	departureDate?: string;
}

@Component({
	selector: 'app-tab-vuelos-v2',
	templateUrl: './tab-vuelos-v2.component.html',
	styleUrls: ['./tab-vuelos-v2.component.scss']
})
export class TabVuelosV2Component implements OnInit {
	constructor(
		private _notification: NotificationService,
		private _accountService: AccountsService,
		private router: Router
	) {}

	@ViewChild('childPassengers') childPassengers!: InputPassengersComponent;
	@ViewChild('childClass') childClass!: InputClassComponent;
	@ViewChild('childInputs') childInputs!: InputSearchFlightComponent;
	@ViewChild('childDates') childDates!: InputRangeComponent;

	ngOnInit(): void {}

	typeFlight = 0;

	arrayMulti = [0];
	indexCounter = 0;

	search() {
		const valuesPassengers = this.childPassengers.getValues();
		const valuesClass = this.childClass.getValues();
		const valuesInputs = this.childInputs.getValues();
		const valuesDates = this.childDates.getValues();
		let messageError = '';

		if (!valuesInputs.arrivalLocation) messageError = 'El destino es requerido';

		if (!valuesInputs.departureLocation) messageError = messageError + ' - La salida es requerido';

		if (valuesDates.departureDate == '') messageError = messageError + ' - La fecha de salida es requerido';

		if (valuesDates.arrivalDate == '' && this.typeFlight == 0)
			messageError = messageError + ' - La fecha de llegada es requerido';

		if (messageError !== '') this._notification.showNotificacion('Datos obligatorios sin completar', messageError);
		else {
			const route = this.getRoute({ ...valuesClass, ...valuesPassengers, ...valuesInputs, ...valuesDates });
			localStorage.setItem('searchParams', route);
			this.router.navigateByUrl(route);
		}
	}

	getRoute(data: Search) {
		const random = '?rand=' + Math.round(Math.random() * 10000000000);
		const userStorage = this._accountService.getUserStorage();
		const email = userStorage.email || '';
		return `/resultados${random}&departureLocation=${data.departureLocation}&arrivalLocation=${data.arrivalLocation}&departureDate=${data.departureDate}&arrivalDate=${data.arrivalDate}&adults=${data.adults}&children=${data.children}&infants=${data.infants}&flightType=${this.typeFlight}&flightClass=${data.flightClass}&lang=ES&email=${email}`;
	}

	searchDataMulti($event: any) {
		let messageError = '';

		$event.forEach((item: any) => {
			item = { ...item };
		});

		if ($event.some((item: any) => !item.departureLocation)) {
			messageError = messageError + ' salidas';
		}

		if ($event.some((item: any) => !item.arrivalLocation)) {
			const separate = messageError !== '' ? ',' : '';
			messageError = messageError + separate + ' destinos';
		}

		if ($event.some((item: any) => item.departureDate == '')) {
			const separate = messageError !== '' ? ',' : '';
			messageError = messageError + separate + ' fechas';
		}

		if (messageError !== '')
			this._notification.showNotificacion(
				'Datos obligatorios sin completar',
				'Todos los campos de' + messageError + ' son requeridos'
			);
		else this.getRouteMulti($event);
	}

	getRouteMulti(json: Search[]) {
		const valuesPassengers = this.childPassengers.getValues();
		const valuesClass = this.childClass.getValues();
		const dataGral = { ...valuesPassengers, ...valuesClass };

		const random = '?rand=' + Math.round(Math.random() * 10000000000);
		const userStorage = this._accountService.getUserStorage();
		const email = userStorage.email || '';

		const route = `/resultados${random}&adults=${dataGral.adults}&children=${dataGral.children}&infants=${dataGral.infants}&selected_cabins=&excludedAirlines=null&multicity=null&json=${JSON.stringify(json)}&email=${email}&flightType=2&flightClass=${dataGral.flightClass}`;
		localStorage.setItem('searchParams', route);
		this.router.navigateByUrl(route);
	}

	changeType(index: number) {
		this.typeFlight = index;
	}
}
