import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ModelTaggingHoteles } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { URLHotel, ParamsHoteles, ParamArmaTuViaje, URLArmaTuViaje } from '../../tabs/tabs.models';
import { SaveModelVuelos } from 'src/app/shared/components/tabs/tabs.models';
import { EnumCabins, EnumFlightType } from '../../flights/models/flights.interface';



@Component({
    selector: 'app-tab-arma-paquetes',
    templateUrl: './tab-arma-paquetes.component.html',
    styleUrls: ['./tab-arma-paquetes.component.scss']
  })
  export class TabArmaPaquetesComponent {
  
    @ViewChild('popUp') popUpElement:PopUpPasajeroComponent | undefined;

    form!: FormGroup;
  fromDate: NgbDate | null
  citys: Array<any> = [];
  origen: any;
  destino: any;
  toDate: NgbDate | null;

  distribution = '';

  distributionObject:DistributionObjectA;

  
  hoveredDate: NgbDate | null = null;

  private _vuelosTab: SaveModelVuelos;

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

  constructor(private calendar: NgbCalendar,private destineService: DestinyService ,public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar) {
    this.form = new FormGroup({
      clase: new FormControl(EnumCabins.economico),
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

  get viajesForm(){
    return this.form.get("destino")?.value;
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

  public searchPaquete() {
    if(!this.isValidate()){
      this.openSnackBar("Error de validacion")
      return ;
    }
    const url = this.getUrlPaquete();
    this.navigateToResponseUrl(url);
  }


  public getUrlAlojamiento(){
      let url = ''
      let params = this.getParamsAlojamiento();
      this.insertTag(params);
      url = new URLHotel(params, this.distribution).getUrl();
      return url;
  }

  public getUrlPaquete() {
    let url = ''
    let params = this.getParamsAlojamiento();
    url = new URLArmaTuViaje(params, this.distribution).getUrl();
    return url;
  }


  insertTag(params:any){

    const getCodigoIata = (id:string)=>{
      return id.split("::")[1];
    }
  
    const nombre = `${getCodigoIata(params.idDestino)}`;
    const diasAnticipacion = moment( params.startDate, "DD/MM/YYYY").diff(moment(), 'days');
    const duracionViaje =  moment( params.endDate, "DD/MM/YYYY").diff(moment( params.startDate, "DD/MM/YYYY"), 'days');


    const model = new ModelTaggingHoteles(
      nombre,
      params.destino,
      this.distributionObject.pasajeros,
      this.distributionObject.adultos,
      this.distributionObject.ninos,
      0,
      this.distributionObject.habitacion,
      moment( params.startDate, "DD/MM/YYYY").format("YYYY/MM/DD"),
      moment( params.endDate, "DD/MM/YYYY").format("YYYY/MM/DD"),
      diasAnticipacion,
      duracionViaje
    )
    
    TaggingService.buscarHoteles(model);
  }


  getParamsAlojamiento(){
    let params = new ParamArmaTuViaje(
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