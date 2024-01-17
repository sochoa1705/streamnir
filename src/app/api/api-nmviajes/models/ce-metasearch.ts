export interface Search {
	flightClass: number;
	adults: number;
	children: number;
	infants: number;
	arrivalLocation: string | null;
	departureLocation: string | null;
	fullArrivalLocation?: string | null;
	fullDepartureLocation?: string | null;
	arrivalDate: string;
	departureDate?: string;
	flightType?:number
	multicity?:Multicity[]
}


export interface Params {
	flightType: number
	flightClass: number
	adults: number
	children: number
	infants: number
	email: string
	departureLocation?: string
	arrivalLocation?: string
	departureDate?: string
	arrivalDate?: string
	multicity?: Multicity[]
}
  
export interface Multicity {
	departureLocation: string
	arrivalLocation: string
	arrivalDate: string
	departureDate: string
	fullDepartureLocation?: string
	fullArrivalLocation?: string
}