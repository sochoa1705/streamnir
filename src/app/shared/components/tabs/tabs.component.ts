import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DestinyService } from '../../../Services/destiny/destiny.service';
import { ROUTE_VIAJES } from '../../constant';
import { ParamsHoteles, ParamsVueloHotel, PasajerosConHabitacion, PasajerosSinHabitacion, URLHotel, URLVueloHotel } from './tabs.models';
export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() show!: boolean
  @Input() options: any
  form!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;
  selected = 'option1';
  model!: NgbDateStruct;

  dpFromDate: any;
  dpToDate: any;

  dpFromDate2: any;
  dpToDate2: any;

  dpFromDate3: any;
  dpToDate3: any;
  dpFromDate4: any;
  dpToDate4: any;
  // fechaInicial : NgbDate | undefined;
  // FechaFinal : NgbDate | undefined;
  diffInDays: number | undefined

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null
  fromDate2: NgbDate | null
  fromDate3: NgbDate | null
  fromDate4: NgbDate | null
  toDate: NgbDate | null;

  citys: Array<any> = [];
  citysOrigenSelect: Array<any> = [];
  citysDestinosSelect: Array<any> = [];
  origen: any;
  destino: any;
  origenHotel: any;

  validPasajeros = false;

  public pasajerosVueloHotel:PasajerosConHabitacion;
  public pasajerosHoteles:PasajerosConHabitacion;
  public pasajerosActividades:PasajerosSinHabitacion;

  constructor(
    public route: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private destineService: DestinyService
  ) {
    this.fromDate = calendar.getToday();
    this.fromDate2 = calendar.getToday();
    this.fromDate3 = calendar.getToday();
    this.fromDate4 = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.pasajerosVueloHotel = new PasajerosConHabitacion(0,0,0,1);
    this.pasajerosHoteles = new PasajerosConHabitacion(0,0,0,1);
    this.pasajerosActividades = new PasajerosSinHabitacion(0,0,0);
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

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

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  ngOnInit(): void {
    this.createForm();
    // this.getDestinyOrigin();
  }

  // private getDestinyOrigin(){
  //   this.destineService.getDestinyPaqueteDinamico('truji','FLIGHT_HOTEL').subscribe(res => {
  //     console.log('res ', res);
  //   });
  // }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl('economy'),
      origen: new FormControl(),
      destino: new FormControl(''),
      origenHotel: new FormControl(''),

    });

    this.form2 = new FormGroup({
      destino: new FormControl(''),
      origenHotel: new FormControl(''),
    });

    this.form3 = new FormGroup({
      origen: new FormControl(''),
      destino: new FormControl(''),

      initHour: new FormControl(''),
      lastHour: new FormControl('')
    });
  }


  // customers() {
  //   var cdr: any = document.getElementById('cdr');
  //   cdr.style = 'display:block'

  // }

  safeLink(e: any) {
    if (e.tab.textLabel === "seguros") {
      this.route.navigate(['/home/seguros'])
    }
  }

  autoComplete(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
    this.citys = [];
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


  getListCiudades(e: any, type: number, typeSearch = 'FLIGHT_HOTEL') {
    this.destineService.getDestinyPaqueteDinamico(e, typeSearch).subscribe(
      data => {
        this.citys = data;
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


  public getDistributionUrl(pasajeros:PasajerosSinHabitacion){
    let urlDistributon = pasajeros.adultos.toString();

    let ninos = pasajeros.infantes + pasajeros.ninos;

    if(ninos > 0) {
      urlDistributon += `-${ninos}-`;
    } else{
      urlDistributon += "-0";
    }
    for(let i=0;i<pasajeros.ninos;i++) {
      urlDistributon += "10,"
    }
    for(let i=0;i<pasajeros.infantes;i++) {
      urlDistributon += "2,"
    }
    urlDistributon = urlDistributon.charAt(urlDistributon.length - 1 ) === ',' ? urlDistributon.substring(0, urlDistributon.length - 1) : urlDistributon;
    return urlDistributon;
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
 }

 
 public searchVueloHotel(){
  const url = this.getUrlVueloHotel(); 
  this.navigateToResponseUrl(url);
}

getParamsVueloHotel(){
  let params = new ParamsVueloHotel(
    this.fromDate,
    this.toDate,
    this.form,
    this.citysDestinosSelect,
    this.citysOrigenSelect
  ).getParams();
  return params;
}

 public getUrlVueloHotel():string{
  let url = ''
  if(this.pasajerosVueloHotel.adultos > 0) {
    let params = this.getParamsVueloHotel();
    let distribution = this.getDistributionUrl(this.pasajerosVueloHotel);
    url = new URLVueloHotel(params,distribution).getUrl();
  }
  return url;
 }

  public searchAlojamiento() {
    const url = this.getUrlAlojamiento();
    this.navigateToResponseUrl(url);
  }
  public getUrlAlojamiento(){
    let url = ''
    if(this.pasajerosHoteles.adultos > 0) {
      let params = this.getParamsAlojamiento();
      let distribution = this.getDistributionUrl(this.pasajerosHoteles);
      url = new URLHotel(params,distribution).getUrl();
    }
    return url;
  }
  getParamsAlojamiento(){
    let params = new ParamsHoteles(
      this.fromDate,
      this.toDate,
      this.form2,
      this.citysDestinosSelect,
    ).getParams();
    return params;
  }


  public searchOnlyCar() {
    let tab = 'ONLY_CAR';
    let params = this.getParamsTabs(3);
    window.location.href = `https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=${tab}&dropoffPoint=${params.idOrigen}&destination=${params.idDestino}&departureDate=${params.startDate}&arrivalDate=${params.endDate}&useSameDropoff=false&pickupTime=${params.horaInicio}&dropoffTime=${params.horaDestino}&lang=ES`;
  }

  private getParamsTabs(typeTab: number): any {

    let startDateStr =  `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
    let endDateStr =  `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;

    let startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let endDate =  moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let origen = typeTab === 1 ? this.form.controls['origen'].value : typeTab === 2 ? this.form2.controls['origenHotel'].value : this.form3.controls['origen'].value;
    let destino = typeTab === 1 ? this.form.controls['destino'].value : this.form3.controls['destino'].value;
    let businessClass = this.form.controls['clase'].value === 'business';
    let idOrigen = (this.citysOrigenSelect || []).find(item => item.label === origen).id;
    let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).id : 0;
    let horaInicio = this.form3.controls['initHour'].value;
    let horaDestino = this.form3.controls['lastHour'].value;
    
    return {startDate, endDate, origen, destino, businessClass, idOrigen, idDestino, horaInicio, horaDestino};
  }

  changeTab(value:MatTabChangeEvent ){
    (value.index == 1)?this.navigateToResponseUrl(ROUTE_VIAJES.RUTA_PAQUETES):null;
  }

}
