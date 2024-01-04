import { EnumCabinsVuelos } from "src/app/shared/components/tabs/tabs.models";

export interface IMotorVuelo {
    groups: IAerolineas[];
    airlinesFilter: AirlinesFilter[];
    exchangeRate: ExchangeRate;
}

export interface AirlinesFilter {
    code: string;
    name: string;
    imageUrl: string;
}

export interface ExchangeRate {
    currency: string;
    amount: number;
}
export interface IAerolineas {
    sequenceNumber: number;
    lowCost: boolean;
    esOnline: boolean;
    id: string;
    departure: Returns[];
    returns: Returns;
    pricingInfo: PricingInfo;
    gds: Gds;
    kiwiBooking?: KiwiBooking;
    promoWeb?: string;
    airline?: Airline;
    validate?: Validate;
}

export interface Airline {
    code?: string;
    name: string;
    imageUrl?: string;
}



export interface Returns {
    departureDate: string;
    originCity: NCity;
    destinationCity: NCity;
    segments: Segment[];
}

export interface NCity {
    code: string;
    name: string;
    country: string;
    continent: string;
    airport?: string;
}

export interface Segment {
    startDateTime: string;
    endDateTime: string;
    stops: number;
    segmentId: number;
    flightDuration: string;
    duracionVuelo?: string;
    equipaje?: EquipajeElement;
    flightSegments: FlightSegment[];
}

export interface EquipajeElement {
    piezas: number;
    segmentos?: Segmento[];
    cabina?: Cabina;
    descripcion1?: string;
}

export interface Cabina {
    piezas: number;
    peso: string;
    descripcion1: string;
    descripcion2?: string;
}


export interface Segmento {
    id: number;
}


export interface FlightSegment {
    guarantee: boolean;
    flightNumber: number;
    departureDateTime: string;
    arrivalDateTime: string;
    cabin: string;
    isReturn: boolean;
    rph: number;
    idFlightSegment: number;
    seatsRemaining: number;
    idRegla: number;
    departureAirport: Airport;
    arrivalAirport: Airport;
    airEquipType: string;
    operatingAirline: Airline;
    marketingAirline: Airline;
    elapsedTime?: string;
}

export interface Airport {
    code: string;
    name: string;
    airport?: string;
}

export interface Gds {
    idGDS: string;
    webSessionID: string;
    officeId?: string;
    esFlyAndDrive: boolean;
    origenSearch?: string;
    idLogSearch?: string;
    pcc?: string;
    searchDate?: string;
}


export interface KiwiBooking {
    token: string;
}

export interface PricingInfo {
    itinTotalFare: ItinTotalFare;
    totalFare: number;
}

export interface ItinTotalFare {
    isPrivate: boolean;
    validatingCarrier: string;
    fareFamily: string;
    fareBreakDowns: FareBreakDown[];
}

export interface FareBreakDown {
    passengerType: PassengerType;
    fareBasisCodes: FareBasisCode[];
    passengerFare: PassengerFare;
    equipaje?: FareBreakDownEquipaje;
}

export interface FareBreakDownEquipaje {
    equipaje: EquipajeElement[];
}

export interface FareBasisCode {
    code: string;
    cabin: string;
}


export interface PassengerFare {
    baseFare: number;
    taxes: number;
    totalFare: number;
    feeNMV: number;
    feePTA: number;
    dsctoTaxes: number;
    baseFareOrderBy: number;
}

export interface PassengerType {
    code: CodePassenger;
    quantity: number;
    equivalentCode: string;
    passengerTypeSearch: CodePassenger;
    fareType?: string;
}


export interface Validate {
    tarifaTotalAdulto: string;
    tarifaNetaAdulto: string;
    listaClases: string;
    lineaAereaValidadora: string;
    impuestos: string;
}


export type CodePassenger = "ADT" | "CNN" | "INF" | "CH" | "CHD";


export interface IParamsVuelos {
    directSubmit: string;
    tripType: string;
    destination: string;
    departure: string;
    departureDate: string;
    arrivalDate: string;
    adults: string;
    children: string;
    infants: string;
    flightClass: string;
    lang: string;
    flightType: string;
}


export class ParamsVuelos implements IParamsVuelos {
    constructor(
        public flightType: string,
        public departure: string,
        public destination: string,
        public departureDate: string,
        public arrivalDate: string,
        public adults: string,
        public children: string,
        public infants: string,
        public flightClass: EnumCabinsVuelos,
        public excludedAirlines = null,
        public multicity = null,
        public directSubmit: string = "",
        public tripType: string = "",
        public lang: string = "",
        public json: string = "",
        public email: string = ""
    ) { }
}


export interface IframeMotorVuelosProps {
    flightType: number;
    departureLocation?: string;
    arrivalLocation?: string;
    departureDate?: string;
    arrivalDate?: string;
    adults: number;
    children: number;
    infants: number;
    flightClass: EnumCabinsVuelos;
    selected_cabins?: string;
    excludedAirlines?: string;
    multicity?: string;
    json?: string
    email?: string
}

export interface IframeMotorVuelosJsonProps {
    flightType: number;
    adults: number;
    children: number;
    infants: number;
    flightClass: EnumCabinsVuelos;
    selected_cabins?: string;
    excludedAirlines?: string;
    multicity?: string;
    json?: string;
    email?: string;
}