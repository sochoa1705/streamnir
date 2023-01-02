import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DestinyService } from '../../../Services/destiny/destiny.service';
import { ParamsVueloHotel } from './tabs.models';
import { ChangeRQ } from '../../../Models/general/changeRQ.interface';
import { environment } from '../../../../environments/environment.prod';
import { NMRequestBy } from '../../../Models/base/NMRequestBy';
import { DollarChangeService } from '../../../Services/dollarChange/dollar-change.service';
import { take } from 'rxjs/operators';
import { NMRequest } from '../../../Models/base/NMRequest';
import { AccountsService } from 'src/app/Services/accounts.service';
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

  tabResult: any = 'tab1';

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

  RUTA_PAQUETES = environment.urlPaqueteDinamico + 'ES/holidays/search';
  RUTA_AUTOS = environment.url_autos;


  selectedTab: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private destineService: DestinyService,
    public dollarChangeService: DollarChangeService
  ) {
    this.fromDate = calendar.getToday();
    this.fromDate2 = calendar.getToday();
    this.fromDate3 = calendar.getToday();
    this.fromDate4 = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.createForm()

    this._activatedRoute.params.subscribe((product) => {
      const url = this._router.url;

      debugger

      if (url === '/vuelos' ||
        url === '/paquetes' ||
        url === '/armapaquete' ||
        url === '/vuelohotel' ||
        url === '/hoteles' ||
        url === '/autos' ||
        url === '/actividades')
        this.casos(url);
      else
        this.casos(product.tab);
    });
  }

  casos(e: any) {
    switch (e) {
      case 'vuelos':
      case '/vuelos':
        this.selectedTab = '0'
        break;
      case 'paquetes':
      case '/paquetes':
        this.selectedTab = '1'
        break;
      case 'armapaquete':
      case '/armapaquete':
        this.selectedTab = '2'
        break;
      case 'vuelohotel':
      case '/vuelohotel':
        this.selectedTab = '3'
        break;
      case 'hoteles':
      case '/hoteles':
        this.selectedTab = '4'
        break;
      case 'autos':
      case '/autos':
        this.selectedTab = '5'
        break;
      case 'actividades':
      case '/actividades':
        this.selectedTab = '6'
        break;
      default:
      // code block
    }
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

    this.form3 = new FormGroup({
      origen: new FormControl(''),
      destino: new FormControl(''),

      initHour: new FormControl(''),
      lastHour: new FormControl('')
    });
  }

  safeLink(e: any) {
    if (e.tab.textLabel === "seguros") {
      this._router.navigate(['/seguros'])
    }
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
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

  public searchOnlyCar() {
    let tab = 'ONLY_CAR';
    let params = this.getParamsTabs(3);
    window.location.href = `https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=${tab}&dropoffPoint=${params.idOrigen}&destination=${params.idDestino}&departureDate=${params.startDate}&arrivalDate=${params.endDate}&useSameDropoff=false&pickupTime=${params.horaInicio}&dropoffTime=${params.horaDestino}&lang=ES`;
  }

  private getParamsTabs(typeTab: number): any {

    let startDateStr = `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
    let endDateStr = `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;

    let startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let endDate = moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let origen = typeTab === 1 ? this.form.controls['origen'].value : typeTab === 2 ? this.form2.controls['origenHotel'].value : this.form3.controls['origen'].value;
    let destino = typeTab === 1 ? this.form.controls['destino'].value : this.form3.controls['destino'].value;
    let businessClass = this.form.controls['clase'].value === 'business';
    let idOrigen = (this.citysOrigenSelect || []).find(item => item.label === origen).id;
    let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).id : 0;
    let horaInicio = this.form3.controls['initHour'].value;
    let horaDestino = this.form3.controls['lastHour'].value;

    return { startDate, endDate, origen, destino, businessClass, idOrigen, idDestino, horaInicio, horaDestino };
  }

  changeTab(value: MatTabChangeEvent) {
    // (value.index == 1) ? this.navigateToResponseUrl(this.RUTA_PAQUETES) : null;
    //(value.index == 4) ? this.navigateToResponseUrl(this.RUTA_AUTOS) : null;

    if (value.index == 7) {
      this.callService();
    }
  }

  //TODO ELIMINAR

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
        if (type === 1) {
          this.citysOrigenSelect = data;
        } else {
          this.citysDestinosSelect = data;
        }
      },
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }

  callService(): void {
    this.getChange();
    this.listDestiny();
  }

  getChange() {
    console.log(new Date());

    let lChange: ChangeRQ = {
      Fecha: environment.today(new Date()),
      IdMoneda: "SOL",
      IdEmpresa: "1"
    }
    let payload = new NMRequestBy<ChangeRQ>(lChange)
    this.dollarChangeService.changeDollar(payload).pipe(take(5)).subscribe({
      next: (response) => {
        localStorage.setItem('tipoCambio', response);
      }
    })
  }

  listDestiny() {
    let payload = new NMRequest();

    this.destineService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        localStorage.setItem('destiny', JSON.stringify(response['Resultado']));
      },
      error: error => console.log(error),
    }
    )
  }
}
