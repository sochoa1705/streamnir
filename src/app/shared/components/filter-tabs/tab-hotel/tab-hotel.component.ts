import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { URLHotel, ParamsHoteles } from '../../tabs/tabs.models';

@Component({
  selector: 'app-tab-hotel',
  templateUrl: './tab-hotel.component.html',
  styleUrls: ['./tab-hotel.component.scss']
})
export class TabHotelComponent {


  @ViewChild('popUp') popUpElement:PopUpPasajeroComponent | undefined;


  form!: FormGroup;
  fromDate: NgbDate | null
  citys: Array<any> = [];
  origen: any;
  destino: any;
  toDate: NgbDate | null;

  distribution = '';
  hoveredDate: NgbDate | null = null;
  

  constructor(private calendar: NgbCalendar,private destineService: DestinyService ,public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar) {
    this.form = new FormGroup({
      destino: new FormControl(''),
    });

   }


   isValidate(){
    return this.popUpElement?.isValid();
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
    if(!this.isValidate()){
      this.openSnackBar("Error de validacion")
      return ;
    }

    const url = this.getUrlAlojamiento();
    this.navigateToResponseUrl(url);
  }

  public getUrlAlojamiento(){
      let url = ''
      let params = this.getParamsAlojamiento();
      url = new URLHotel(params, this.distribution).getUrl();
      return url;
  }

  getParamsAlojamiento(){
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
