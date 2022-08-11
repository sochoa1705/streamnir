import { EnumCabinsVuelos } from "src/app/shared/components/tabs/tabs.models";
import { IframeMotorVuelosProps, IframeMotorVuelosJsonProps } from './resultados.interfaces';

export class ResultadosPaginacion {

    constructor(
        public elemContainer: number,
        public elemPag: number

    ) { }

}

export class IframeMotorVuelos {
    public flightType: number;
    public flightClass: EnumCabinsVuelos;
    public departureLocation?: string = "";
    public arrivalLocation?: string = "";
    public departureDate?: string = "";
    public arrivalDate?: string = "";
    public adults: number = 1;
    public children: number = 0;
    public infants: number = 0;
    public selected_cabins: string = "";
    public excludedAirlines = null;
    public multicity = null;
    public json: string = "";
    public email: string = "";
    constructor({
        flightType,
        flightClass,
        departureLocation,
        arrivalLocation,
        departureDate,
        arrivalDate,
        adults,
        children,
        infants,
        json,
        email
    }: IframeMotorVuelosProps
    ) {
        this.flightType = flightType;
        this.flightClass = flightClass;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.adults = adults;
        this.children = children;
        this.infants = infants;
        this.json = json || "";
        this.email = email || "";
    }
}



export class IframeMotorVuelosJson {
    public flightType: number;
    public flightClass: EnumCabinsVuelos;
    public adults: number = 1;
    public children: number = 0;
    public infants: number = 0;
    public selected_cabins: string = "";
    public excludedAirlines = null;
    public multicity = null;
    public json: string = "";
    public email: string = "";
    constructor({
        flightType,
        flightClass,
        adults,
        children,
        infants,
        json,
        email
    }: IframeMotorVuelosJsonProps
    ) {
        this.flightType = flightType;
        this.flightClass = flightClass;
        this.adults = adults;
        this.children = children;
        this.infants = infants;
        this.json = json || "";
        this.email = email || "";
    }
}