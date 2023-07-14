import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SearchAssemblePackages } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { EnumCabins, EnumFlightType, ParamArmaTuViaje, URLArmaTuViaje } from '../../tabs/tabs.models';
import { SaveModelVuelos } from 'src/app/shared/components/tabs/tabs.models';
import { NotificationService } from 'src/app/Services/notification.service';
import { AccountsService } from 'src/app/Services/accounts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab-arma-paquetes',
  templateUrl: './tab-arma-paquetes.component.html',
  styleUrls: ['./tab-arma-paquetes.component.scss']
})
export class TabArmaPaquetesComponent {

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

  private _vuelosTab: SaveModelVuelos;

  isSubmit = false;

  EnumCabins = EnumCabins;
  EnumFlightType = EnumFlightType;

  @Input() set vuelosTab(value: SaveModelVuelos) {
    if (value) {
      this.form.setValue(value.form);
      this._vuelosTab = value;
    }
  }

  get vuelosTab() {
    return this._vuelosTab;
  }

  constructor(private calendar: NgbCalendar,
    private destineService: DestinyService,
    private notification: NotificationService,
    public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar,
    private _accountsService: AccountsService
  ) {
    this.form = new FormGroup({
      clase: new FormControl(EnumCabins.economico),
      destino: new FormControl(''),
    });
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

  getErrorsForm(form: FormGroup): string[] {
    let errors: any[] = [];

    if (form.controls["destino"].invalid) {
      errors.push('El campo destino es obligatorio');
    }

    if (!this.fromDate) {
      errors.push("La fecha de inicio es requerido");
    }

    return errors;
  }

  public async searchPaquete() {
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

    let url = this.getUrlPaquete();

    const result = await this._accountsService.getAccountToken();
    if (result) {
      if (result.Result.IsSuccess) {
        const token: string = result.Result.Token;
        url = `${url}&token=${token}&submit=true`;
      }
    }

    this.navigateToResponseUrl(url);
  }

  public getUrlPaquete() {
    let url: string;
    let params = this.getParamsAlojamiento();
    this.newInsertTag(params);
    url = new URLArmaTuViaje(params, this.distribution).getUrl();
    return url;
  }

  newInsertTag(params: any) {
    const daysFromNow = moment(params.startDate, 'DD/MM/YYYY').diff(moment(), 'days');

    const model: SearchAssemblePackages = {
      event: 'nmv_armaTuViaje_buscar',
      operacion: {
        dias_anticipacion: daysFromNow
      },
      vuelo: {
        clase: params.businessClass ? 'business' : 'economy',
        tipo: ''
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
        retorno: '',
        estadia: 0
      }
    };

    TaggingService.tagSearchAssemblePackages(model);
  }

  getParamsAlojamiento() {
    return new ParamArmaTuViaje(
        this.fromDate,
        this.toDate,
        this.form,
        this.citys
    ).getParams();
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }

}