import { PassengerFare, PassengerType, Segment } from "src/app/Component/home-page/resultados/models/resultados.interfaces";
import { EnumCabins, EnumFlightType, IEscalaDetalleSegment, IMovDetalleSegment, IVueloDetalleSegment } from "./flights.interface"

export class DisponibilidadPayload {
    constructor(
        public flightType:number,
        public departureLocation:string,
        public arrivalLocation:string,
        public departureDate:string,
        public arrivalDate:string,
        public adults:number,
        public children:number,
        public infants:number,
        public selected_cabins:string,
        public excludedAirlines = null,
        public multicity = null, 
    ){}
}


export class ClassDetalleModalSegment {
    constructor(
        public general:ClassDetalleModalGeneralSegment,
        public detalle:ClassDetalleSegment[]
    ){}
}
export class ClassDetalleModalGeneralSegment {
    public titulo:string;
    constructor(
        public origen:string,
        public destino:string,
        public ida:boolean,
        public cabina:number,
        public piezas:number,
        public escalas:ClassEscalasDetalle[] = []
    ){
        this.titulo = this.ida? `De ${origen} a ${destino} (Ida)`: `De ${origen} a ${destino} (Vuelta)`
    }
}

export class ClassEscalasDetalle {
    constructor(
        public nombre_ciudad:string,
        public tiempo_espera:string
    ){}
}
export class ClassPricingInfoDetalle {
    constructor(
        public persona:number,
        public impuestos:number,
        public cargos:number,
        public nroAdultos:number,
        public precioFinal:number,
        public totalPrecioAdultos:number,
        public precioSoles:number,
    ){}
}

export class ClassDetalleSegment {
    constructor(
        public salida:IMovDetalleSegment,
        public llegada:IMovDetalleSegment,
        public vuelo:IVueloDetalleSegment,
        public escala?:IEscalaDetalleSegment
    ){}
}


export class ClassDetalleLocalSt {
    constructor(
        public segmentoDeparture:ClassDetalleModalSegment,
        public segmentoReturn:ClassDetalleModalSegment | null,
        public pricingInfo:ClassPricingInfoDetalle
    ){}
}