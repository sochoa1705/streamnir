import { EnumCabinsVuelos } from "src/app/shared/components/tabs/tabs.models";
import { IframeMotorVuelosProps } from "./resultados.interfaces";

export class ResultadosPaginacion {

    constructor(
        public elemContainer:number,
        public elemPag:number

    ){}
    
}

export class IframeMotorVuelos{
    public flightType:number;
    public flightClass:EnumCabinsVuelos;
    public departureLocation:string;
    public arrivalLocation:string;
    public departureDate:string;
    public arrivalDate?:string;
    public adults:number = 1;
    public children:number = 0;
    public infants:number = 0;
    public selected_cabins:string = "";
    public excludedAirlines = null;
    public multicity = null; 
    constructor({
            flightType,
            flightClass,
            departureLocation,
            arrivalLocation,
            departureDate,
            arrivalDate,
            adults,
            children,
            infants
    }:IframeMotorVuelosProps
    ){
        this.flightType = flightType;
        this.flightClass = flightClass;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.adults = adults;
        this.children = children;
        this.infants = infants;
    }
}