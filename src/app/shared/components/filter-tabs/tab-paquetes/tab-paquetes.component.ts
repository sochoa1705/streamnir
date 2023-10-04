import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { EnumFlightType, ParamPaquete, URLPaquete } from '../../tabs/tabs.models';
import { SaveModelVuelos } from 'src/app/shared/components/tabs/tabs.models';
import { InputValidationService } from '../../../../Services/inputValidation.service';
import { AccountsService } from 'src/app/Services/accounts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab-paquetes',
  templateUrl: './tab-paquetes.component.html',
  styleUrls: ['./tab-paquetes.component.scss']
})
export class TabPaquetesComponent {

  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;

  form!: FormGroup;
  fromDate: NgbDate | null
  origen: any;
  destino: any;
  toDate: NgbDate | null;

  distribution = '';

  distributionObject: DistributionObjectA;

  hoveredDate: NgbDate | null = null;

  private _vuelosTab: SaveModelVuelos;

  EnumFlightType = EnumFlightType;

  countries: Array<any> = [];
  countriesPackage: Array<any> = [];
  countriesPackageSearch: Array<any> = [];
  themes: Array<any> = [];
  months: Array<any> = [];
  noches: Array<any> = [{ code: '3,4,5', name: 'de 1 a 5 noches' }, { code: '6', name: 'de 6 a 10 noches' }, { code: '11', name: 'de 11 a 15 noches' }, { code: '15', name: 'Más de 15 noches' }];

  @Input() set vuelosTab(value: SaveModelVuelos) {
    if (value) {
      this.form.setValue(value.form);
      this._vuelosTab = value;
    }
  }

  get vuelosTab() {
    return this._vuelosTab;
  }

  constructor(
    private destineService: DestinyService,
    public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar,
    public inputValidator: InputValidationService,
    private _accountsService: AccountsService
  ) {
    this.form = new FormGroup({
      destino: new FormControl(''),
      themes: new FormControl(''),
      months: new FormControl(''),
      noches: new FormControl(''),
    });
    this.getListCountries();
    this.getPackageCountries();
    this.getThemes();
    this.getMonths();
  }

  autoCompleteInit(): void {
    this.countriesPackageSearch = [];
    this.countriesPackageSearch = this.countriesPackage;
  }

  autoComplete(e: any) {
    // let elemento = this.origen.nativeElement;
    this.countriesPackageSearch = [];
    let elemento = e.target;

    let value = elemento.value;

    if (value.length >= 1) {
      //this.getListCiudades(value, typeSearch);
      this.countriesPackageSearch = this.countriesPackage.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    }
  }

  getThemes() {
    this.destineService.getThemes().subscribe(
      data => {
        this.themes = data;
      },
      err => console.log(err)
    )
  }

  getMonths() {
    this.destineService.getFilters().subscribe(
      data => {
        this.months = data.months;
      },
      err => console.log(err)
    )
  }

  getListCountries() {
    this.destineService.getDestinyCountriesPaqueteDinamico().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  getPackageCountries(): void {
    this.destineService.getPackageCountry().subscribe(data => {
      this.countriesPackage = data;
    },
      err => console.log(err)
    )
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
  }

  public async searchPaquete() {
    // const errors = this.validateTab();

    /* if (errors.length > 0) {
      this.openSnackBar(errors.join(" - "))
      return;
    } */

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

  /* validateTab() {
    const errors = [];
    if (this.form.controls['destino'].value == '') {
      errors.push("El destino es requerido");
    }
    if (this.form.controls['months'].value == '') {
      errors.push("El mes es requerido");
    }
    return errors;
  } */

  public getUrlPaquete() {
    let url: string;
    let params = this.getParamsAlojamiento();
    url = new URLPaquete(params, params.idDestino).getUrl();
    return url;
  }

  getParamsAlojamiento() {
    return new ParamPaquete(
        this.fromDate,
        this.toDate,
        this.form,
        this.countriesPackageSearch,
        this.themes,
        this.months,
        this.noches
    ).getParams();
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }
}