import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { EnumCabins, EnumFlightType } from '../../flights/models/flights.interface';
import { IDistributionObject, PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { ParamsVueloHotel, ParamsVuelos, URLVueloHotel, URLVuelos } from '../../tabs/tabs.models';

@Component({
  selector: 'app-tab-vuelos',
  templateUrl: './tab-vuelos.component.html',
  styleUrls: ['./tab-vuelos.component.scss']
})
export class TabVuelosComponent {


  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;

  form!: FormGroup;
  fromDate: NgbDate | null
  citysOrigenSelect: Array<any> = [];
  citysDestinosSelect: Array<any> = [];
  origen: any;
  destino: any;
  origenHotel: any;
  toDate: NgbDate | null;

  distributionObject: IDistributionObject;
  hoveredDate: NgbDate | null = null;

  EnumFlightType = EnumFlightType;
  EnumCabins = EnumCabins;


  constructor(private calendar: NgbCalendar, private destineService: DestinyService, public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar, private router: Router
  ) {
    this.createForm();


    //  const data = this.destineService.searchMv();
    //  console.log(data);

  }

  openSnackBar(message: string, action: string = "Error") {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl(EnumCabins.economico),
      viajes: new FormControl(EnumFlightType.ida_vuelta),
      origen: new FormControl(),
      destino: new FormControl(''),
      origenHotel: new FormControl('')

    });
  }

  navigateToResponseUrl(url: string): void {
    this.router.navigateByUrl(url);
  }


  public searchVueloHotel() {
    if (!this.isValidate()) {
      this.openSnackBar("Error de validacion")
      return;
    }


    const url = this.getUrl();
    this.navigateToResponseUrl(url);
  }

  getParams() {
    let params = new ParamsVuelos(
      this.fromDate,
      this.toDate,
      this.form,
      this.citysDestinosSelect,
      this.citysOrigenSelect
    ).getParams();
    return params;
  }
  public getUrl() {
    let url = ''
    let params = this.getParams();
    // nuevo
    let adultosCount = this.distributionObject['adultos'],
      ninosCount = this.distributionObject['ninos'],
      infantesCount = this.distributionObject['infantes'],
      pasajeros = this.distributionObject['pasajeros']

    let adultosN = { item: 'Adulto' }
    let ninosN = { item: 'Niño' }
    let infantesN = { item: 'Infante' }

    if (adultosCount > 0) {
      for (let i = 0; i < adultosCount; i++) {
        pasajeros.push(adultosN)
      }
    }
    if (ninosCount > 0) {
      for (let i = 0; i < ninosCount; i++) {
        pasajeros.push(ninosN)
      }
    }
    if (infantesCount > 0) {
      for (let i = 0; i < infantesCount; i++) {
        pasajeros.push(infantesN)
      }
    }

    let vuelo = { ...params, ...this.distributionObject }
    console.log(this.distributionObject)


    localStorage.setItem('filtroVuelo', JSON.stringify(vuelo))

    url = new URLVuelos(params, this.distributionObject).getUrl();
    return url;
  }

  autoComplete(e: any, type: 'origen' | 'destino') {
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;

    // console.log(elemento,type);

    let value = elemento.value;
    // if (value.length == 0) {
    //   elemento.classList.remove('auto');
    // } else {
    //   elemento.classList.add('auto');
    // }
    if (value.length >= 3) {
      this.getListVuelos(value, type);
    }
  }

  isValidate() {
    return this.popUpElement ?.isValid();
  }


  getListVuelos(e: any, type: 'origen' | 'destino') {
    this.destineService.getGeoTree(e).subscribe(
      data => {
        if (type == 'origen') {
          this.citysOrigenSelect = data;
        } else if (type == 'destino') {
          this.citysDestinosSelect = data;
        }

      },
      err => console.log(err)
    )
  }


  displayWithOrigen(value: string) {
    return value ? this.citysOrigenSelect.find(_ => _.city_code === value).city : undefined;
  }

  displayWithDestino(value: string) {
    return value ? this.citysDestinosSelect.find(_ => _.city_code === value).city : undefined;
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }

}
