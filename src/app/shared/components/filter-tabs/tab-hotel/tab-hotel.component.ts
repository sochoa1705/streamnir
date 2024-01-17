import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/Services/accounts.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { ParamsHoteles, URLHotel } from '../../tabs/tabs.models';
import { InputRangeComponent } from '../../input-range/input-range.component';

@Component({
  selector: 'app-tab-hotel',
  templateUrl: './tab-hotel.component.html',
  styleUrls: ['./tab-hotel.component.scss']
})
export class TabHotelComponent {
  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;
  @ViewChild('childDates') childDates!: InputRangeComponent;


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
    window.open(url, '_blank');
  }

  public async searchAlojamiento() {
    this.isSubmit = true;
    const valuesDateRange=this.childDates.getValuesByHotel();
		this.toDate=valuesDateRange.arrivalDate;
		this.fromDate=valuesDateRange.departureDate;
    
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
    url = new URLHotel(params, this.distribution).getUrl();
    return url;
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
