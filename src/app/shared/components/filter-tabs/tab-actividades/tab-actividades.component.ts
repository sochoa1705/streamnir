import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ModelTaggingActividades, SearchExperiences } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { ParamsActividades, URLActividades } from '../../tabs/tabs.models';
import * as moment from 'moment';

@Component({
  selector: 'app-tab-actividades',
  templateUrl: './tab-actividades.component.html',
  styleUrls: ['./tab-actividades.component.scss']
})
export class TabActividadesComponent {
  form!: FormGroup;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  citys: Array<any> = [];
  origen: any;
  destino: any;

  distribution = '';
  hoveredDate: NgbDate | null = null;

  distributionObject: DistributionObjectA;

  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;

  constructor(
    private destineService: DestinyService,
    public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar,
    public inputValidator: InputValidationService,
    private _accountsService: AccountsService
  ) {
    this.form = new FormGroup({
      destino: new FormControl(''),
    });
  }

  autoComplete(e: any, typeSearch = 'ONLY_TICKET') {
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;

    let value = elemento.value;

    if (value.length >= 3) {
      this.getListCiudades(value, typeSearch);
    }
  }

  isValidate() {
    return this.popUpElement?.isValid();
  }

  getListCiudades(e: any, typeSearch = 'ONLY_TICKET') {
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

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  public async search() {
    if (!this.isValidate()) {
      this.openSnackBar("Error de validacion")
      return;
    }

    let url = this.getUrlActividades();

    const result = await this._accountsService.getAccountToken();
    if (result) {
      if (result.Result.IsSuccess) {
        const token: string = result.Result.Token;
        url = `${url}&token=${token}&submit=true`;
      }
    }

    this.navigateToResponseUrl(url);
  }

  public getUrlActividades() {
    let url: string;
    let params = this.getParamsActividades();
    this.insertTag(params);
    url = new URLActividades(params, this.distribution).getUrl();
    return url;
  }

  insertTag(params: any) {
    const getCodigoIata = (id: string) => {
      return id.split('::')[1];
    }

    const nombre = `${getCodigoIata(params.idDestino)}`;
    const diasAnticipacion = moment(params.startDate, 'DD/MM/YYYY').diff(moment(), 'days');
    const duracionViaje = moment(params.endDate, 'DD/MM/YYYY').diff(moment(params.startDate, 'DD/MM/YYYY'), 'days');

    const model = new ModelTaggingActividades(
        nombre,
        params.destino,
        this.distributionObject.pasajeros,
        this.distributionObject.adultos,
        this.distributionObject.ninos,
        0,
        this.distributionObject.habitacion,
        moment(params.startDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
        moment(params.endDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
        diasAnticipacion,
        duracionViaje
    )

    TaggingService.buscarActividades(model);

    const newModel: SearchExperiences = {
      event: 'nmv_actividades_buscar',
      operacion: {
        dias_anticipacion: diasAnticipacion
      },
      destino: {
        nombre: params.destino,
        codigo: nombre,
        pais: this.citys[0].country
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

    TaggingService.tagSearchExperiences(newModel);
  }

  getParamsActividades() {
    return new ParamsActividades(
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
