export interface SaveSearchRequest {
	names: string,
	email: string,
	flightType: number,
	flights: FlightSearched[],
	adults: number,
	children: number,
	infants: number,
	flightClass: number,
	currency: string,
	filtros: SearchFilters
}

interface FlightSearched {
	departureLocation: string,
	departureDate: string,
	arrivalLocation: string,
	arrivalDate: string | null
}

interface SearchFilters {
	equipaje: string,
	escalas: string,
	aerolineas: string,
	minPrice: number,
	maxPrice: number
}