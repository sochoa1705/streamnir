import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { ParamsVueloHotel, PasajerosConHabitacion, URLVueloHotel } from '../../tabs/tabs.models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab-vuelo-hotel',
  templateUrl: './tab-vuelo-hotel.component.html',
  styleUrls: ['./tab-vuelo-hotel.component.scss']
})
export class TabVueloHotelComponent  {

  @ViewChild('popUp') popUpElement:PopUpPasajeroComponent | undefined;
 
  form!: FormGroup;
  fromDate: NgbDate | null
  citysOrigenSelect: Array<any> = [];
  citysDestinosSelect: Array<any> = [];
  origen: any;
  destino: any;
  origenHotel: any;
  toDate: NgbDate | null;

  distribution = '';
  hoveredDate: NgbDate | null = null;


  constructor(private calendar: NgbCalendar,private destineService: DestinyService ,public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar
    ) {
    this.createForm();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  openSnackBar(message: string, action: string = "Error") {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl('economy'),
      origen: new FormControl(),
      destino: new FormControl(''),
      origenHotel: new FormControl(''),

    });
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
 }


  public searchVueloHotel() {
    if(!this.isValidate()){
      this.openSnackBar("Error de validacion")
      return ;
    }
    const url = this.getUrlVueloHotel();
    this.navigateToResponseUrl(url);
  }

  getParamsVueloHotel() {
    let params = new ParamsVueloHotel(
      this.fromDate,
      this.toDate,
      this.form,
      this.citysDestinosSelect,
      this.citysOrigenSelect
    ).getParams();
    return params;
  }
  public getUrlVueloHotel(): string {
    let url = ''
    let params = this.getParamsVueloHotel();
    url = new URLVueloHotel(params, this.distribution).getUrl();
    return url;
  }

  autoComplete(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;

    let value = elemento.value;
    if (value.length == 0) {
      elemento.classList.remove('auto');
    } else {
      elemento.classList.add('auto');
    }
    if (value.length >= 3) {
      this.getListCiudades(value, type, typeSearch);
    }
  }

  isValidate(){
    return this.popUpElement?.isValid();
  }


  getListCiudades(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
    this.destineService.getDestinyPaqueteDinamico(e, typeSearch).subscribe(
      data => {
        if(type === 1) {
          this.citysOrigenSelect = data;
        } else {
          this.citysDestinosSelect = data;
        }
      },
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }


  // FIXME: Pasar a nuevo componente 

  //NOTE Inicio datepicker
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  //NOTE : fin date picker


}
