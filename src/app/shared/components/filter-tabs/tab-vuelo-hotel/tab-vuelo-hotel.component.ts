import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { ParamsVueloHotel, URLVueloHotel } from '../../tabs/tabs.models';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { ModelTaggingVuelosHoteles } from 'src/app/Services/analytics/tagging.models';
import * as moment from 'moment';
import { DistributionObjectA } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { InputValidationService } from '../../../../Services/inputValidation.service';
import { NotificationService } from 'src/app/Services/notification.service';
moment.locale('es')

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
  distributionObject:DistributionObjectA;
  hoveredDate: NgbDate | null = null;

  isSubmit = false;

  constructor(private calendar: NgbCalendar,
    private destineService: DestinyService ,public formatter: NgbDateParserFormatter,
    private notification: NotificationService,
    public inputValidator : InputValidationService
    ) {
    this.createForm();
  }


  createForm() {
    this.form = new FormGroup({
      clase: new FormControl('economy'),
      origen: new FormControl('', [Validators.required, Validators.minLength(3)]),
      destino: new FormControl('',[Validators.required, Validators.minLength(3)])
    }); 
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
 }


 get origenField(){
   return this.form.controls["origen"];
 }

 get destinoField(){
  return this.form.controls["destino"];
}

  
validateForm(field: string) {
  return this.form.controls[field].errors
    && this.isSubmit;
}


getErrorsForm(form:FormGroup): string[] {
  let errors:any[] = [];

  if (form.controls["origen"].invalid) {
    errors.push('El campo origen es obligatorio');
  } 
  if (form.controls["destino"].invalid) {
    errors.push('El campo destino es obligatorio');
  } 

  return errors;
}



  public searchVueloHotel() {

    this.isSubmit = true;

    let errosInputs = this.getErrorsForm(this.form);

    if(errosInputs.length > 0){
      this.notification.showNotificacion("Error", errosInputs.join(", "),10);
      return ;
    }
    

    let errorHabitaciones = this.popUpElement?.isValid();

    if(!errorHabitaciones?.isValid){
      this.notification.showNotificacion("Error", errorHabitaciones?.message || "Error en las habitaciones" )
      return ;
    }

    const url = this.getUrlVueloHotel();

    this.navigateToResponseUrl(url);
  } 

  insertTag(params:any){

    const getCodigoIata = (id:string)=>{
      return id.split("::")[1];
    }
  
    const nombre = `${getCodigoIata(params.idOrigen)}_${getCodigoIata(params.idDestino)}_${params.businessClass?'BS':'EC'}`;
    const diasAnticipacion = moment( params.startDate, "DD/MM/YYYY").diff(moment(), 'days');
    const duracionViaje =  moment( params.endDate, "DD/MM/YYYY").diff(moment( params.startDate, "DD/MM/YYYY"), 'days');


    const model = new ModelTaggingVuelosHoteles(
      nombre,
      params.origen,
      params.destino,
      params.businessClass?'BS':'EC',
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
    
    TaggingService.buscarVuelosHoteles(model);

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
    this.insertTag(params);

    url = new URLVueloHotel(params, this.distribution).getUrl();
    return url;
  }

  autoComplete(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
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
      this.getListCiudades(value, type, typeSearch);
    }
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
      err => console.log(err)
    )
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }



}
