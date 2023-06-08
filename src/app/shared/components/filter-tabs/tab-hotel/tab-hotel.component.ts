import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ModelTaggingHoteles, SearchHotels } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { ParamsHoteles, URLHotel } from '../../tabs/tabs.models';
import * as moment from 'moment';

@Component({
  selector: 'app-tab-hotel',
  templateUrl: './tab-hotel.component.html',
  styleUrls: ['./tab-hotel.component.scss']
})
export class TabHotelComponent {
  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;

  form!: FormGroup;
  fromDate: NgbDate | null
  citys: Array<any> = [];
  origen: any;
  destino: any;
  toDate: NgbDate | null;

  distribution = '';

  distributionObject: DistributionObjectA;

  hoveredDate: NgbDate | null = null;

  isSubmit = false;

  constructor(private calendar: NgbCalendar, private destineService: DestinyService,
    public formatter: NgbDateParserFormatter,
    private notification: NotificationService,
    private _snackBar: MatSnackBar,
    public inputValidator: InputValidationService,
    private _accountsService: AccountsService
  ) {
    this.form = new FormGroup({
      destino: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  validateForm(field: string) {
    return this.form.controls[field]?.errors
      && this.isSubmit;
  }

  getErrorsForm(form: FormGroup): string[] {
    let errors: any[] = [];

    if (form.controls["destino"].invalid) {
      errors.push('El campo destino es obligatorio');
    }
    if (!this.toDate) {
      errors.push("La fecha final es requerido");
    }
    if (!this.fromDate) {
      errors.push("La fecha de inicio es requerido");
    }

    return errors;
  }

  autoComplete(e: any, typeSearch = 'ONLY_HOTEL') {
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;

    let value = elemento.value;

    if (value.length >= 3) {
      this.getListCiudades(value, typeSearch);
    }
  }

  getListCiudades(e: any, typeSearch = 'ONLY_HOTEL') {
    this.destineService.getDestinyPaqueteDinamico(e, typeSearch).subscribe(
      data => {
        this.citys = data;

      },
      err => console.log(err)
    )
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
  }

  public async searchAlojamiento() {
    this.isSubmit = true;

    let errosInputs = this.getErrorsForm(this.form);

    if (errosInputs.length > 0) {
      this.notification.showNotificacion("Error", errosInputs.join(", "), 10);
      return;
    }

    let errorHabitaciones = this.popUpElement?.isValid();

    if (!errorHabitaciones?.isValid) {
      this.notification.showNotificacion("Error", errorHabitaciones?.message || "Error en las habitaciones")
      return;
    }

    let url = this.getUrlAlojamiento();

    const result = await this._accountsService.getAccountToken();
    if (result) {
      if (result.Result.IsSuccess) {
        const token: string = result.Result.Token;
        url = `${url}&token=${token}&submit=true`;
      }
    }

    this.navigateToResponseUrl(url);
  }

  public getUrlAlojamiento() {
    let url: string;
    let params = this.getParamsAlojamiento();
    this.insertTag(params);
    url = new URLHotel(params, this.distribution).getUrl();
    return url;
  }

  insertTag(params: any) {
    const getCodigoIata = (id: string) => {
      return id.split("::")[1];
    }

    const nombre = `${getCodigoIata(params.idDestino)}`;
    const diasAnticipacion = moment(params.startDate, "DD/MM/YYYY").diff(moment(), 'days');
    const duracionViaje = moment(params.endDate, "DD/MM/YYYY").diff(moment(params.startDate, "DD/MM/YYYY"), 'days');

    const model = new ModelTaggingHoteles(
      nombre,
      params.destino,
      this.distributionObject.pasajeros,
      this.distributionObject.adultos,
      this.distributionObject.ninos,
      0,
      this.distributionObject.habitacion,
      moment(params.startDate, "DD/MM/YYYY").format("YYYY/MM/DD"),
      moment(params.endDate, "DD/MM/YYYY").format("YYYY/MM/DD"),
      diasAnticipacion,
      duracionViaje
    )

    TaggingService.buscarHoteles(model);

    const newModel: SearchHotels = {
      event: 'nmv_hoteles_buscar',
      operacion: {
        dias_anticipacion: diasAnticipacion
      },
      destino: {
        nombre: params.destino.split(',')[0],
        codigo: params.destino.split(',')[0].slice(0, 3).toUpperCase(),
        pais: params.destino.split(',')[1].trim()
      },
      hotel: {
        habitaciones: this.distributionObject.habitacion
      },
      pasajeros: {
        adultos: this.distributionObject.adultos,
        ninos: this.distributionObject.ninos,
        infantes: 0,
        total: this.distributionObject.pasajeros
      },
      fechas: {
        salida: moment(params.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        retorno: moment(params.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        estadia: duracionViaje
      }
    };

    TaggingService.tagSearchHotels(newModel);
  }

  getParamsAlojamiento() {
    return new ParamsHoteles(
        this.fromDate,
        this.toDate,
        this.form,
        this.citys,
    ).getParams();
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }

}
