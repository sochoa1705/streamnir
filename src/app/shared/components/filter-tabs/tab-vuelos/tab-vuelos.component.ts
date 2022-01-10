import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { ParamsVueloHotel, URLVueloHotel } from '../../tabs/tabs.models';

@Component({
  selector: 'app-tab-vuelos',
  templateUrl: './tab-vuelos.component.html',
  styleUrls: ['./tab-vuelos.component.scss']
})
export class TabVuelosComponent {


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
    private _snackBar: MatSnackBar, private router:Router
    ) {
    this.createForm();
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
      viajes: new FormControl('ida_vuelta'),
      origen: new FormControl(),
      destino: new FormControl(''),
      origenHotel: new FormControl(''),

    });
  }

  navigateToResponseUrl(id: string): void {
    this.router.navigateByUrl('/home/vuelos/resultados');
 }


  public searchVueloHotel() {
    if(!this.isValidate()){
      this.openSnackBar("Error de validacion")
      return ;
    }

    
    // const url = this.getUrlVueloHotel();
    this.navigateToResponseUrl('id');
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
    // let params = this.getParamsVueloHotel();
    // url = new URLVueloHotel(params, this.distribution).getUrl();
    return 'url';
  }

  autoComplete(e: any) {
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
      this.getListVuelos(value);
    }
  }

  isValidate(){
    return this.popUpElement?.isValid();
  }


  getListVuelos(e: any) {
    this.destineService.getGeoTree(e).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    )
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }

}
