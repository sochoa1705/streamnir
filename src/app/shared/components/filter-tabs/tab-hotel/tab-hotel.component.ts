import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ModelTaggingHoteles } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { URLHotel, ParamsHoteles } from '../../tabs/tabs.models';

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


  get destinoField() {
    return this.form.controls["destino"];
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




  autoComplete(e: any, typeSearch = 'FLIGHT_HOTEL') {
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;

    let value = elemento.value;

    if (value.length >= 3) {
      this.getListCiudades(value, typeSearch);
    }
  }



  getListCiudades(e: any, typeSearch = 'FLIGHT_HOTEL') {
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

  openSnackBar(message: string, action: string = "Error") {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  public searchAlojamiento() {
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
    const token = this._accountsService.getAccountTokenOfLocalStorage();

    if (token.length > 0)
      url = `${url}&token=${token}&submit=true`;

    this.navigateToResponseUrl(url);
  }

  public getUrlAlojamiento() {
    let url = ''
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
  }


  getParamsAlojamiento() {
    let params = new ParamsHoteles(
      this.fromDate,
      this.toDate,
      this.form,
      this.citys,
    ).getParams();
    return params;
  }


  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }


}
