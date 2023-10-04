import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/Services/accounts.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { ParamsActividades, URLActividades } from '../../tabs/tabs.models';
import { InputRangeComponent } from '../../input-range/input-range.component';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-tab-actividades',
  templateUrl: './tab-actividades.component.html',
  styleUrls: ['../tab-hotel/tab-hotel.component.scss']
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
  @ViewChild('childDates') childDates!: InputRangeComponent;

  constructor(
    private destineService: DestinyService,
    public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar,
    public inputValidator: InputValidationService,
    private _accountsService: AccountsService,
    private notification: NotificationService,
  ) {
    this.form = new FormGroup({
      destino: new FormControl('',Validators.required),
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
    window.open(url, '_blank');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  public async search() {
    const valuesDateRange=this.childDates.getValuesByHotel();
		this.toDate=valuesDateRange.arrivalDate;
		this.fromDate=valuesDateRange.departureDate;
    
    let errors: any[] = [];
   
    if (this.form.controls["destino"].invalid) {
      this.notification.showNotificacion("Error",'El campo destino es obligatorio', 10);
      return;
    }

    if (!this.fromDate || !this.toDate) {
      this.notification.showNotificacion("Error",'La fecha de inicio y fin es requerido', 10);
      return;
    }

    if (!this.isValidate()) {
      this.notification.showNotificacion("Error",'El campo de pasajeros es inválido', 10);
      return;
    }

    let url = this.getUrlActividades();

    if (url && url.length > 0) {
      const result = await this._accountsService.getAccountToken();
      if (result) {
        if (result.Result.IsSuccess) {
          const token: string = result.Result.Token;
          url = `${url}&token=${token}&submit=true`;
        }
      }

      this.navigateToResponseUrl(url);
    }
  }

  public getUrlActividades() {
    let url: string;
    let params = this.getParamsActividades();
    if (params) {
      url = new URLActividades(params, this.distribution).getUrl();
      return url;
    } else return '';
  }

  getParamsActividades() {
    if (this.fromDate && this.toDate)
      return new ParamsActividades(
          this.fromDate,
          this.toDate,
          this.form,
          this.citys,
      ).getParams();
    else {
      this.openSnackBar('Las fechas de Salida y de Vuelta son obligatorias');
      return null;
    }
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }

}
