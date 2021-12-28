import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { ParamsActividades, URLActividades } from '../../tabs/tabs.models';

@Component({
  selector: 'app-tab-actividades',
  templateUrl: './tab-actividades.component.html',
  styleUrls: ['./tab-actividades.component.scss']
})
export class TabActividadesComponent  {

  form!: FormGroup;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  citys: Array<any> = [];
  origen: any;
  destino: any;

  distribution = '';
  hoveredDate: NgbDate | null = null;
  
  @ViewChild('popUp') popUpElement:PopUpPasajeroComponent | undefined;


  constructor(private destineService: DestinyService ,public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar) {
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

  isValidate(){
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


 openSnackBar(message: string, action: string = "Error") {
  this._snackBar.open(message, "", {
    duration: 2000,
    panelClass: ['mat-toolbar', 'mat-warn']
  });
}


  public search() {
    if(!this.isValidate()){
      this.openSnackBar("Error de validacion")
      return ;
    }
    const url = this.getUrlActividades();
    this.navigateToResponseUrl(url);
  }

  public getUrlActividades(){
      let url = ''
      let params = this.getParamsActividades();
      url = new URLActividades(params, this.distribution).getUrl();
      return url;
  }

  getParamsActividades(){
    let params = new ParamsActividades(
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
