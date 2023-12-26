import {
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { InputPassengersComponent } from '../../input-passengers/input-passengers.component';
import { InputRangeComponent } from '../../input-range/input-range.component';
import { InputSearchFlightComponent } from '../../input-search-flight/input-search-flight.component';
import { InputClassComponent } from '../../input-class/input-class.component';
import { NotificationService } from 'src/app/Services/notification.service';
import { AccountsService } from 'src/app/Services/accounts.service';
import { Router } from '@angular/router';
import { Search } from 'src/app/api/api-nmviajes/models/ce-metasearch';
import { GlobalComponent } from 'src/app/shared/global';

@Component({
	selector: 'app-tab-vuelos-v2',
	templateUrl: './tab-vuelos-v2.component.html',
	styleUrls: ['./tab-vuelos-v2.component.scss']
})
export class TabVuelosV2Component implements OnInit{
	constructor(
		private _notification: NotificationService,
		private _accountService: AccountsService,
		private router: Router
	) {}
	@ViewChild('sliderRadios', { static: false }) sliderRadios: ElementRef;
	@ViewChild('childPassengers') childPassengers!: InputPassengersComponent;
	@ViewChild('childClass') childClass!: InputClassComponent;
	@ViewChild('childInputs') childInputs!: InputSearchFlightComponent;
	@ViewChild('childDates') childDates!: InputRangeComponent;
	@Output() reloadPageResult = new EventEmitter();

	isDown = false;
	startX: number;
	scrollLeft: number;
	typeFlight = 0;

	ngOnInit(): void {
		if(window.location.href.includes('resultados')){
			this.typeFlight=GlobalComponent.searchData.flightType || 0
		}
	}

	arrayMulti = [0];
	indexCounter = 0;
	counterSearch = 0;

	search() {
		this.counterSearch++;
		const valuesPassengers = this.childPassengers.getValues();
		const valuesClass = this.childClass.getValues();
		const valuesInputs = this.childInputs.getValues();
		const valuesDates = this.childDates.getValues();

		const errors = [];

		if (!valuesInputs.arrivalLocation) errors.push('El destino es requerido');
		if (!valuesInputs.departureLocation) errors.push('La salida es requerido');
		if (valuesDates.departureDate == '') errors.push('La fecha de salida es requerido');
		if (valuesDates.arrivalDate == '' && this.typeFlight == 0) errors.push('La fecha de llegada es requerido');
		if (errors.length > 0){
			    window.scroll({ top: 0, behavior: 'smooth' });
				this._notification.showNotificacion('Datos obligatorios sin completar', errors.join(' - '), 7);
		} else {
			const route = this.getRoute({ ...valuesClass, ...valuesPassengers, ...valuesInputs, ...valuesDates });
			localStorage.setItem('searchParams', route);
			this.router.navigateByUrl(route);
			this.reloadPageResult.emit();
		}
	}

	getRoute(data: Search) {
		const random = '?rand=' + Math.round(Math.random() * 10000000000);
		const userStorage = this._accountService.getUserStorage();
		const email = userStorage.email || '';
		return `/resultados${random}&departureLocation=${data.departureLocation}&arrivalLocation=${data.arrivalLocation}&departureDate=${data.departureDate}&arrivalDate=${data.arrivalDate}&adults=${data.adults}&children=${data.children}&infants=${data.infants}&flightType=${this.typeFlight}&flightClass=${data.flightClass}&lang=ES&email=${email}`;
	}

	searchDataMulti($event: any) {
		this.counterSearch++;
		const errors = [];

		$event.forEach((item: any) => {
			item = { ...item };
		});

		if ($event.some((item: any) => !item.departureLocation)) errors.push('La salidas son requeridos');
		if ($event.some((item: any) => !item.arrivalLocation)) errors.push('Los destinos son requeridos');
		if ($event.some((item: any) => item.departureDate == '')) errors.push('Las fechas de salidas son requeridos');

		if (errors.length > 0){
			window.scroll({ top: 0, behavior: 'smooth' });
			this._notification.showNotificacion('Datos obligatorios sin completar', errors.join(' - '), 7);
		}
		else this.getRouteMulti($event);
	}

	getRouteMulti(json: Search[]) {
		const valuesPassengers = this.childPassengers.getValues();
		const valuesClass = this.childClass.getValues();
		const dataGral = { ...valuesPassengers, ...valuesClass };

		const random = '?rand=' + Math.round(Math.random() * 10000000000);
		const userStorage = this._accountService.getUserStorage();
		const email = userStorage.email || '';

		const route = `/resultados${random}&adults=${dataGral.adults}&children=${dataGral.children}&infants=${
			dataGral.infants
		}&selected_cabins=&excludedAirlines=null&multicity=null&json=${JSON.stringify(
			json
		)}&email=${email}&flightType=2&flightClass=${dataGral.flightClass}`;
		localStorage.setItem('searchParams', route);
		this.router.navigateByUrl(route);
		this.reloadPageResult.emit();
	}

	changeType(index: number) {
		this.typeFlight = index;
	}
}
