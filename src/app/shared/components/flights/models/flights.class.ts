import { EnumCabins, EnumFlightType } from "./flights.interface"

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



