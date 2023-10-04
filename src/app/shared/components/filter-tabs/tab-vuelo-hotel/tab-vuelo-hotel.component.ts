import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { ParamsVueloHotel, URLVueloHotel } from '../../tabs/tabs.models';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import * as moment from 'moment';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { InputValidationService } from '../../../../Services/inputValidation.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AccountsService } from 'src/app/Services/accounts.service';
import { InputRangeComponent } from '../../input-range/input-range.component';
import { InputClassComponent } from '../../input-class/input-class.component';

moment.locale('es')

@Component({
	selector: 'app-tab-vuelo-hotel',
	templateUrl: './tab-vuelo-hotel.component.html',
	styleUrls: [ './tab-vuelo-hotel.component.scss' ]
})
export class TabVueloHotelComponent {

	@ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;
	@ViewChild('childDates') childDates!: InputRangeComponent;
	@ViewChild('childClass') childClass!: InputClassComponent;

	form!: FormGroup;
	fromDate: NgbDate | null
	citysOrigenSelect: Array<any> = [];
	citysDestinosSelect: Array<any> = [];
	origen: any;
	destino: any;
	toDate: NgbDate | null;

	distribution = '';
	distributionObject: DistributionObjectA;
	hoveredDate: NgbDate | null = null;

	isSubmit = false;

	constructor(private calendar: NgbCalendar,
	            private destineService: DestinyService, public formatter: NgbDateParserFormatter,
	            private notification: NotificationService,
	            public inputValidator: InputValidationService,
	            private _accountsService: AccountsService
	) {
		this.createForm();
	}


	createForm() {
		this.form = new FormGroup({
			clase: new FormControl('economy'),
			origen: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
			destino: new FormControl('', [ Validators.required, Validators.minLength(3) ])
		});
	}

	navigateToResponseUrl(url: string): void {
		window.open(url, '_blank');
	}

	validateForm(field: string) {
		return this.form.controls[field].errors
				&& this.isSubmit;
	}


	getErrorsForm(form: FormGroup): string[] {
		let errors: any[] = [];

		if (form.controls['origen'].invalid) {
			errors.push('El campo origen es obligatorio');
		}
		if (form.controls['destino'].invalid) {
			errors.push('El campo destino es obligatorio');
		}
		if (!this.toDate) {
			errors.push('La fecha final es requerido');
		}
		if (!this.fromDate) {
			errors.push('La fecha de inicio es requerido');
		}

		return errors;
	}


	public async searchVueloHotel() {
		this.isSubmit = true;
		const valueClass=this.childClass.getValues();
        const newValue=valueClass.flightClass==0 ? 'economy' : 'business';
		const valuesDateRange=this.childDates.getValuesByHotel();
		this.form.controls.clase.setValue(newValue);
		this.toDate=valuesDateRange.arrivalDate;
		this.fromDate=valuesDateRange.departureDate;
		
		let errosInputs = this.getErrorsForm(this.form);

		if (errosInputs.length > 0) {
			this.notification.showNotificacion('Error', errosInputs.join(', '), 10);
			return;
		}

		let errorHabitaciones = this.popUpElement?.isValid();

		if (!errorHabitaciones?.isValid) {
			this.notification.showNotificacion('Error', errorHabitaciones?.message || 'Error en las habitaciones')
			return;
		}

		let url = this.getUrlVueloHotel();
	
		const result = await this._accountsService.getAccountToken();
		if (result) {
			if (result.Result.IsSuccess) {
				const token: string = result.Result.Token;
				url = `${url}&token=${token}&submit=true`;
			}
		}

		this.navigateToResponseUrl(url);
	}

	
	getParamsVueloHotel() {
		return new ParamsVueloHotel(
				this.fromDate,
				this.toDate,
				this.form,
				this.citysDestinosSelect,
				this.citysOrigenSelect
		).getParams();
	}

	public getUrlVueloHotel(): string {
		let url: string;
		let params = this.getParamsVueloHotel();
		
		url = new URLVueloHotel(params, this.distribution).getUrl();
		return url;
	}

	autoComplete(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
		// let elemento = this.origen.nativeElement;
		let elemento = e.target;

		// console.log(elemento,type);

		let value = elemento.value;
		/* if (value.length == 0) {
		  elemento.classList.remove('auto');
		} else {
		  elemento.classList.add('auto');
		} */
		if (value.length >= 3) {
			this.getListCiudades(value, type, typeSearch);
		}
	}


	getListCiudades(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
		this.destineService.getDestinyPaqueteDinamico(e, typeSearch).subscribe(
				data => {
					if (type === 1) {
						this.citysOrigenSelect = data;
					} else {
						this.citysDestinosSelect = data;
					}
				},
				err => console.log(err)
		)
	}

	changeDate(value: ClassValueCalendar) {
		this.toDate = value.toDate;
		this.fromDate = value.fromDate;
	}

}
