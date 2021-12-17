import { FormGroup } from "@angular/forms";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";
import * as moment from "moment";
import { ROUTE_VIAJES } from "../../constant";

interface Pasajeros{
    adultos:number;
    ninos:number;
    infantes:number;
}

// habitacion:number;

export class PasajerosConHabitacion implements Pasajeros{
    constructor(
        public adultos:number,
        public ninos:number,
        public infantes:number,
        public habitacion:number
    ){}
}

export class PasajerosSinHabitacion implements Pasajeros{
    constructor(
        public adultos:number,
        public ninos:number,
        public infantes:number
    ){}
}

interface Params {
    startDate: string;
    endDate: string;
    destino: string;
    idDestino: string;
    origen?: string;
    businessClass?: boolean,
    idOrigen?: string;
    horaInicio?: string;
    horaDestino?: string;
}

export type tapType = 'ONLY_HOTEL' | 'ONLY_CAR' | 'FLIGHT_HOTEL' | 'ONLY_HOTEL' | 'ONLY_TICKET';
interface UrlNmViajes{
    url: string;
    getUrl:() => string
}
export class URLVueloHotel implements UrlNmViajes{

    public url = ROUTE_VIAJES.RUTA_GET;

    private tab:tapType;
    private params:Params;
    private distribution:string;
    
    constructor(params:Params,distribution:string){
        this.tab= 'FLIGHT_HOTEL';
        this.params= params;
        this.distribution= distribution;
    }

    getUrl(){
        return `${this.url}?directSubmit=true&tripType=${this.tab}&destination=${this.params.idDestino}&departure=${this.params.idOrigen}&departureDate=${this.params.startDate}&arrivalDate=${this.params.endDate}&distribution=${this.distribution}&businessCabin=${this.params.businessClass}&lang=ES`;
    }
}
export class URLHotel implements UrlNmViajes{

    public url = ROUTE_VIAJES.RUTA_GET;

    private tab:tapType;
    private params:Params;
    private distribution:string;
    
    constructor(params:Params,distribution:string){
        this.tab= "ONLY_HOTEL";
        this.params= params;
        this.distribution= distribution;
    }

    getUrl(){
        return  `${this.url}?directSubmit=true&tripType=${this.tab}&distribution=${this.distribution}&lang=ES&carRental=false&hotelDestination=${this.params.idDestino}&departureDate=${this.params.startDate}&arrivalDate=${this.params.endDate}`;
    }
}
export class URLActividades implements UrlNmViajes{

    public url = ROUTE_VIAJES.RUTA_GET;

    private tab:tapType;
    private params:Params;
    private distribution:string;
    
    constructor(params:Params,distribution:string){
        this.tab= "ONLY_TICKET";
        this.params= params;
        this.distribution= distribution;
    }

    getUrl(){
        return `${this.url}?directSubmit=true&tripType=${this.tab}&destination=${this.params.destino}&departureDate=${this.params.startDate}&arrivalDate=${this.params.endDate}&distribution=${this.distribution}&lang=ES`;
    }
}

interface ParamsTabs{
    fromDate: NgbDate | null;
    toDate: NgbDate | null;
    form:FormGroup;
    citysDestinosSelect:any[];

    getParams:()=>Params;
}

export class ParamsHoteles implements ParamsTabs{
    constructor(
        public fromDate: NgbDate | null,
        public toDate: NgbDate | null,
        public form:FormGroup,
        public citysDestinosSelect:any[]
    ){}

    getParams(){
        let startDateStr =  `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
        let endDateStr =  `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;
        let startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
        let endDate =  moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
        let destino = this.form.controls['destino'].value;
        let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).id : 0;

        return {startDate, endDate, destino, idDestino};
    }
}
export class ParamsVueloHotel implements ParamsTabs{
    constructor(
        public fromDate: NgbDate | null,
        public toDate: NgbDate | null,
        public form:FormGroup,
        public citysDestinosSelect:any[],
        public citysOrigenSelect:any[],
    ){}

    getParams(){
        let startDateStr =  `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
        let endDateStr =  `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;
    
        let startDate = moment(startDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
        let endDate =  moment(endDateStr, 'D/M/YYYY').format('DD/MM/YYYY');
        let origen = this.form.controls['origen'].value;
        let destino = this.form.controls['destino'].value;
        let businessClass = this.form.controls['clase'].value === 'business';
        let idOrigen = (this.citysOrigenSelect || []).find(item => item.label === origen).id;
        let idDestino = destino !== '' ? (this.citysDestinosSelect || []).find(item => item.label === destino).id : 0;

        return {startDate, endDate, origen, destino, businessClass, idOrigen, idDestino};
    }
}