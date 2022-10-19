import { FormGroup } from "@angular/forms";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { Guid } from "../../utils";
import { ICardAutocomplete } from "../card-autocomplete/card-autocomplete.interface";
import { IForm } from '../filter-tabs/tab-vuelos/tab-vuelos.interfaces';


export enum EnumFlightType {
  ida_vuelta = 0,
  ida = 1,
  multy_city = 2
}

export enum EnumCabinsVuelos {
  economy = '0',
  business = '1',
  first_class = '2'
}


export enum EnumCabins {
  economico = 'Y',
  business = 'B',
}


interface Pasajeros {
  adultos: number;
  ninos: number;
  infantes: number;
}

// habitacion:number;

interface Params {
  startDate: string;
  endDate: string;
  destino: any;
  idDestino: string;
  origen?: any;
  businessClass?: boolean,
  idOrigen?: string;
  horaInicio?: string;
  horaDestino?: string;
  flightType?: string;
  countryCode?: string;
  idMonth?: string;
  idNoche?: string;
  idTheme?: string;
  token?: string;
  submit?: string;
}



export class PasajerosConHabitacion implements Pasajeros {
  constructor(
    public adultos: number,
    public ninos: number,
    public infantes: number,
    public habitacion: number
  ) { }
}

export class PasajerosSinHabitacion implements Pasajeros {
  constructor(
    public adultos: number,
    public ninos: number,
    public infantes: number
  ) { }
}

export type tapType = 'ONLY_HOTEL' | 'ONLY_CAR' | 'FLIGHT_HOTEL' | 'ONLY_HOTEL' | 'ONLY_TICKET' | 'ONLY_FLIGHT' | 'MULTI';
interface UrlNmViajes {
  url: string;
  getUrl: () => string
}
export class URLVueloHotel implements UrlNmViajes {

  public url = environment.urlPaqueteDinamico + 'home';

  private tab: tapType;
  private params: Params;
  private distribution: string;

  constructor(params: Params, distribution: string) {
    this.tab = 'FLIGHT_HOTEL';
    this.params = params;
    this.distribution = distribution;
  }

  getUrl() {
    return `${this.url}?directSubmit=true&tripType=${this.tab}&destination=${this.params.idDestino}&departure=${this.params.idOrigen}&departureDate=${this.params.startDate}&arrivalDate=${this.params.endDate}&distribution=${this.distribution}&businessCabin=${this.params.businessClass}&lang=ES`;
  }
}

export class URLVuelos implements UrlNmViajes {

  public url = '/vuelos/resultados';

  private tab: tapType;
  private params: ParamsVuelos;
  private distribution: any;

  constructor(params: ParamsVuelos, distribution: any) {
    this.tab = 'ONLY_FLIGHT';
    this.params = params;
    this.distribution = distribution;
  }

  getUrl() {
    return `${this.url}?directSubmit=true&tripType=${this.tab}&flightType=${this.params.flightType}&destination=${this.params.idDestino + "%20" + this.params.destino?.title || ''}&departure=${this.params.idOrigen + "%20" + this.params.origen?.title || ''}&departureDate=${this.params.startDate}&arrivalDate=${this.params.endDate}&adults=${this.distribution.adultos}&children=${this.distribution.ninos}&infants=${this.distribution.infantes}&flightClass=${this.params.cabinsVuelos}&lang=ES&email=${this.params.email}`;
  }
}

export class URLVuelosMulti implements UrlNmViajes {
  //public url = '/vuelos/resultados';
  public url = environment.urlIframeMotorVuelos;

  private tab: tapType;
  private distribution: any;
  private flightType: EnumFlightType;
  private cabinsVuelos: EnumCabinsVuelos;
  private email: string;

  constructor(flightType: any, distribution: any, email: string) {
    this.tab = 'ONLY_FLIGHT';
    this.distribution = distribution;
    this.flightType = flightType;
    //this.cabinsVuelos = cabinsVuelos;
    this.email = email;
  }

  getUrl() {
    return "";
  }

  getUrlMulti(json: string) {
    //let url = `${this.url}?directSubmit=true&tripType=${this.tab}&flightType=${this.flightType}&adults=${this.distribution.adultos}&children=${this.distribution.ninos}&infants=${this.distribution.infantes}&flightClass=${this.cabinsVuelos}&lang=ES&json=${json}&email=${this.email}`;

    this.url += '?rand=' + Math.round(Math.random() * 10000000000) + "&";
    this.url += `adults=${this.distribution.adultos}&children=${this.distribution.ninos}&infants=${this.distribution.infantes}&selected_cabins=&excludedAirlines=null&multicity=null&json=${json}&email=${this.email}&flightType=${this.flightType}&flightClass=${this.distribution.clase}`;

    //url = "/vuelos/resultados?directSubmit=true&tripType=ONLY_FLIGHT&flightType=2&adults=1&children=0&infants=0&flightClass=0&lang=ES&json=[{"departureLocation":"LIM Lima, Perú","arrivalLocation":"BOG Bogotá, Colombia","departureDate":"08/09/2022"},{"departureLocation":"LIM Lima, Perú","arrivalLocation":"BUE Buenos Aires (Todos Los Aeropuertos), Argentina","departureDate":"23/09/2022"}]&email="
    //https://vuelos.nmviajes.com/#/nmviajes/search/resultados?rand=5547733007&adults=1&children=0&infants=0&selected_cabins=&excludedAirlines=null&multicity=null&json=%5B%7B%22departureLocation%22%3A%22LIM%20Lima%2C%20Per%C3%BA%22%2C%22arrivalLocation%22%3A%22BOG%20Bogot%C3%A1%2C%20Colombia%22%2C%22departureDate%22%3A%2208%2F09%2F2022%22%7D%2C%7B%22departureLocation%22%3A%22LIM%20Lima%2C%20Per%C3%BA%22%2C%22arrivalLocation%22%3A%22BUE%20Buenos%20Aires%20(Todos%20Los%20Aeropuertos)%2C%20Argentina%22%2C%22departureDate%22%3A%2223%2F09%2F2022%22%7D%5D&email=&flightType=2&flightClass=0

    return this.url;
  }
}

export class URLHotel implements UrlNmViajes {

  public url = environment.urlPaqueteDinamico + 'home';

  private tab: tapType;
  private params: Params;
  private distribution: string;

  constructor(params: Params, distribution: string) {
    this.tab = "ONLY_HOTEL";
    this.params = params;
    this.distribution = distribution;
  }

  getUrl() {
    return `${this.url}?directSubmit=true&tripType=${this.tab}&distribution=${this.distribution}&lang=ES&carRental=false&hotelDestination=${this.params.idDestino}&departureDate=${this.params.startDate}&arrivalDate=${this.params.endDate}`;
  }
}

export class URLAutos implements UrlNmViajes {

  public url = environment.urlAutosNmViajes + 'es/site/search';

  private tab: tapType;
  private params: Params;

  constructor(params: Params) {
    this.tab = "ONLY_HOTEL";
    this.params = params;
  }

  getUrl() {
    let idOrigen = this.params.idOrigen || this.params.idDestino;
    return `${this.url}?pickUpDate=${this.params.startDate}&pickUpHour=${this.params.horaInicio}&dropOffDate=${this.params.endDate}&dropOffHour=${this.params.horaDestino}&pickUpLocation=${this.params.idDestino}&dropOffLocation=${idOrigen}&rateType=best&Country=${this.params.countryCode}`;
  }
}

export class URLActividades implements UrlNmViajes {

  public url = environment.urlPaqueteDinamico + 'home';

  private tab: tapType;
  private params: Params;
  private distribution: string;

  constructor(params: Params, distribution: string) {
    this.tab = "ONLY_TICKET";
    this.params = params;
    this.distribution = distribution;
  }

  getUrl() {
    return `${this.url}?directSubmit=true&tripType=${this.tab}&destination=${this.params.idDestino}&departureDate=${this.params.startDate}&arrivalDate=${this.params.endDate}&distribution=${this.distribution}&lang=ES`;
  }
}

export class URLArmaTuViaje implements UrlNmViajes {
  public url = environment.urlPaqueteDinamico + 'home';

  private tab: tapType;
  private params: Params;
  private distribution: string;

  constructor(params: Params, distribution: string) {
    this.tab = "MULTI";
    this.params = params;
    this.distribution = distribution;
  }

  getUrl() {
    return `${this.url}?directSubmit=true&tripType=${this.tab}&departureDate=${this.params.startDate}&distribution=${this.distribution}&businessCabin=${this.params.businessClass}&lang=ES`;
  }
}

export class URLPaquete implements UrlNmViajes {
  public url = environment.urlPaqueteDinamico + 'ES/holidays/availability';

  private tab: tapType;
  private params: Params;
  private country: string;

  constructor(
    params: Params,
    country: string
  ) {
    this.tab = "MULTI";
    this.params = params;
    this.country = country;
  }

  getUrl() {
    return `${this.url}?country=${this.params.idDestino}&month=${this.params.idMonth}&nights=${this.params.idNoche}&themes=${this.params.idTheme}`;
  }
}

interface ParamsTabs {
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  form: FormGroup;
  citysDestinosSelect: any[];

  getParams: () => Params;
}

export class ParamsHoteles implements ParamsTabs {
  constructor(
    public fromDate: NgbDate | null,
    public toDate: NgbDate | null,
    public form: FormGroup,
    public citysDestinosSelect: any[]
  ) { }

  getParams() {
    let startDateStr = `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
    let endDateStr = `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;
    let startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let endDate = moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let destino = this.form.controls['destino'].value;
    let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).id : 0;

    return { startDate, endDate, destino, idDestino };
  }
}

export class ParamsAutos implements ParamsTabs {
  constructor(
    public fromDate: NgbDate | null,
    public toDate: NgbDate | null,
    public form: FormGroup,
    public citysDestinosSelect: Array<any>,
    public citysRecojoSelect: Array<any>,
  ) { }

  getParams() {
    let startDateStr = `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
    let endDateStr = `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;
    let startDate = moment(startDateStr, 'D/M/YYYY').format('YYYY-MM-DD');
    let endDate = moment(endDateStr, 'D/M/YYYY').format('YYYY-MM-DD');
    let destino = this.form.controls['destino'].value;
    let recojo = this.form.controls['recojo'].value;
    let horaInicio = this.form.controls['initHour'].value.replace(':', '');
    let horaDestino = this.form.controls['lastHour'].value.replace(':', '');
    let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.value === destino)?.iata : '';
    let idOrigen = recojo !== '' ? (this.citysRecojoSelect || []).find(item => item.value === recojo)?.iata : '';
    let countryCode = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.value === destino)?.countryCode : '';

    return { startDate, endDate, destino, idDestino, countryCode, horaInicio, horaDestino, idOrigen };
  }
}

export class ParamArmaTuViaje implements ParamsTabs {
  constructor(
    public fromDate: NgbDate | null,
    public toDate: NgbDate | null,
    public form: FormGroup,
    public citysDestinosSelect: any[]
  ) { }

  getParams() {
    let endDateNow = new Date();
    let startDateStr = `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
    let endDateStr = `${(endDateNow!.getDay()).toString()}/${(endDateNow!.getMonth()).toString()}/${(endDateNow!.getFullYear()).toString()}`;
    let startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let endDate = moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let destino = this.form.controls['destino'].value;
    let businessClass = false;
    let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).id : 0;

    return { startDate, endDate, destino, businessClass, idDestino };
  }
}

export class ParamPaquete implements ParamsTabs {
  constructor(
    public fromDate: NgbDate | null,
    public toDate: NgbDate | null,
    public form: FormGroup,
    public citysDestinosSelect: any[],
    public themes: any[],
    public months: any[],
    public noches: any[]
  ) { }

  getParams() {
    let startDate = moment(new Date(), 'D/M/YYYY').format('DD/MM/YYYY');
    let endDate = moment(new Date(), 'D/M/YYYY').format('DD/MM/YYYY');
    let destino = this.form.controls['destino'].value;
    let businessClass = false;
    let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).code : 0;
    let idNoche = this.form.controls['noches'].value;
    let idTheme = this.form.controls['themes'].value;
    let idMonth = this.form.controls['months'].value;
    return { startDate, endDate, destino, businessClass, idDestino, idTheme, idNoche, idMonth };
  }
}
export class ParamsActividades extends ParamsHoteles {
  constructor(
    fromDate: any,
    toDate: any,
    form: any,
    citysDestinosSelect: any
  ) {
    super(fromDate, toDate, form, citysDestinosSelect);
  }
}
export class ParamsVueloHotel implements ParamsTabs {
  constructor(
    public fromDate: NgbDate | null,
    public toDate: NgbDate | null,
    public form: FormGroup,
    public citysDestinosSelect: any[],
    public citysOrigenSelect: any[],
  ) { }

  getParams() {
    let startDateStr = `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
    let endDateStr = `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;

    let startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let endDate = moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    let origen = this.form.controls['origen'].value;
    let destino = this.form.controls['destino'].value;
    let businessClass = this.form.controls['clase'].value === 'business';
    let idOrigen = (this.citysOrigenSelect || []).find(item => item.label === origen).id;
    let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).id : 0;

    return { startDate, endDate, origen, destino, businessClass, idOrigen, idDestino };
  }
}


export interface ParamsVuelosProps {
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  form: FormGroup;
  citysDestinosSelect: any[];
  citysOrigenSelect: any[];
  email?: string;
  clase: number;
}

export class ParamsVuelos {
  public startDate: string;
  public endDate: string;
  public origen: any;
  public destino: any;
  public cabinsVuelos: number;
  public idOrigen: string;
  public idDestino: string;
  public flightType: EnumFlightType;
  public email?: string;
  constructor(
    {
      fromDate,
      toDate,
      form,
      citysDestinosSelect,
      citysOrigenSelect,
      email,
      clase
    }: ParamsVuelosProps
  ) {
    let startDateStr = fromDate!.day != undefined ? `${(fromDate!.day).toString()}/${(fromDate!.month).toString()}/${(fromDate!.year).toString()}` : fromDate;
    let endDateStr = !toDate ? '' : toDate!.day != undefined ? toDate ? `${(toDate!.day).toString()}/${(toDate!.month).toString()}/${(toDate!.year).toString()}` : "" : toDate;

    this.startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
    this.endDate = endDateStr ? moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY') : "";
    this.origen = form.controls['origen'].value;
    this.destino = form.controls['destino'].value;
    this.cabinsVuelos = clase;
    this.idOrigen = this.origen.codigo;
    this.flightType = form.controls['viajes'].value;
    this.idDestino = this.destino.codigo;
    this.email = email;
  }

}
export class SaveModelVuelos {
  constructor(
    public fromDate: NgbDate | null,
    public toDate: NgbDate | null,
    public form: IForm,
    public pasajeros: { adultos: number, ninos: number, infantes: number }
  ) { }
}
export class ModelIForm {
  constructor(
    public clase: string,
    public viajes: number,
    public origen: ICardAutocomplete,
    public destino: ICardAutocomplete,
    public origenHotel: string
  ) { }
}

