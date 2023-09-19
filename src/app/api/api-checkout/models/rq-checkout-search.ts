export interface ISearchResponse {
	indexGroup?:number,
	groups: Group[];
	airlinesFilter: AirlinesFilter[];
	exchangeRate: ExchangeRate;
}

export interface Group {
	sequenceNumber: number;
	lowCost: boolean;
	promoWeb?: string;
	esOnline: boolean;
	brandedFare: boolean;
	id: string;
	airline: Airline;
	departure: Departure[];
	returns?: Returns | null;
	pricingInfo: PricingInfo;
	gds: Gds;
	validate?: Validate;
	ndcInfo?:any;
	madBacValidation: number;
	isDirect?:boolean;
	isOneScale?:boolean;
	isMultiScale?:boolean;
	typeBag?:string;
	airlineCodeFilter?:string;
	detailPricing?:IDetailPricing;
	flightDurationProm?:number;
	orderByScales?:number;
	dateOrder?:DateOrder[];
	durationDeparture?:number;
	durationReturn?:number;
	maxWaitingTimeDep?:number;
	maxWaitingTimeRet?:number;
}

export interface DateOrder {
	dateEarlyDep:any,
	dateLaterDep:any,
	dateEarlyArr:any,
	dateLaterArr:any,
}

export interface Airline {
	code: string;
	name: string;
	imageUrl: string;
}

export interface Departure {
	departureDate: string;
	originCity: OriginCity;
	destinationCity: DestinationCity;
	segments: Segment[];
}

export interface OriginCity {
	code: string;
	name: string;
	airport: string;
	country: string;
	continent: string;
}

export interface DestinationCity {
	code: string;
	name: string;
	airport: string;
	country: string;
	continent: string;
}

export interface Segment {
	startDateTime: string;
	endDateTime: string;
	stops: number;
	segmentId: number;
	flightDuration: string;
	equipaje: Equipaje;
	flightSegments: FlightSegment[];
	flightDurationMin?:number;
	waitingTime?:number;
}

export interface Equipaje {
	segmentos?: Segmento[];
	piezas: number;
	cabina?: {
		piezas: number;
	};
}

export interface Segmento {
	id: number;
}

export interface FlightSegment {
	guarantee: boolean;
	flightNumber: number;
	lfId: number;
	departureDateTime: string;
	arrivalDateTime: string;
	brandCode?: string;
	cabin: string;
	fareBasis: string;
	isReturn: boolean;
	rph: number;
	elapsedTime: string;
	seatsRemaining: number;
	idRegla: number;
	departureAirport: DepartureAirport;
	arrivalAirport: ArrivalAirport;
	airEquipType: string;
	operatingAirline: OperatingAirline;
	marketingAirline: MarketingAirline;
}

export interface DepartureAirport {
	code: string;
	name: string;
	airport: string;
}

export interface ArrivalAirport {
	code: string;
	name: string;
	airport: string;
}

export interface OperatingAirline {
	code: string;
	flightNumber: number;
	name: string;
	imageUrl: string;
}

export interface MarketingAirline {
	code: string;
	flightNumber: number;
	name: string;
	imageUrl: string;
}

export interface Returns {
	departureDate: string;
	originCity: OriginCity2;
	destinationCity: DestinationCity2;
	segments: Segment2[];
}

export interface OriginCity2 {
	code: string;
	name: string;
	airport: string;
	country: string;
	continent: string;
}

export interface DestinationCity2 {
	code: string;
	name: string;
	airport: string;
	country: string;
	continent: string;
}

export interface Segment2 {
	startDateTime: string;
	endDateTime: string;
	stops: number;
	segmentId: number;
	flightDuration: string;
	equipaje: Equipaje2;
	flightSegments: FlightSegment2[];
	flightDurationMin?:number;
	waitingTime?:number;
}

export interface Equipaje2 {
	segmentos?: Segmento2[];
	piezas: number;
	cabina?: {
		piezas: number;
	};
}

export interface Segmento2 {
	id: number;
}

export interface FlightSegment2 {
	guarantee: boolean;
	flightNumber: number;
	lfId: number;
	departureDateTime: string;
	arrivalDateTime: string;
	brandCode?: string;
	cabin: string;
	fareBasis: string;
	isReturn: boolean;
	rph: number;
	elapsedTime: string;
	seatsRemaining: number;
	idRegla: number;
	departureAirport: DepartureAirport2;
	arrivalAirport: ArrivalAirport2;
	airEquipType: string;
	operatingAirline: OperatingAirline2;
	marketingAirline: MarketingAirline2;
}

export interface DepartureAirport2 {
	code: string;
	name: string;
	airport: string;
}

export interface ArrivalAirport2 {
	code: string;
	name: string;
	airport: string;
}

export interface OperatingAirline2 {
	code: string;
	flightNumber: number;
	name: string;
	imageUrl: string;
}

export interface MarketingAirline2 {
	code: string;
	flightNumber: number;
	name: string;
	imageUrl: string;
}

export interface PricingInfo {
	itinTotalFare: ItinTotalFare;
	totalFare: number;
}

export interface ItinTotalFare {
	idPricingInfoSabre?: string;
	isNdc: boolean;
	isPrivate: boolean;
	validatingCarrier?: string;
	fareFamily?: string;
	fareBreakDowns: FareBreakDown[];
}

export interface FareBreakDown {
	passengerType: PassengerType;
	passengerFare: PassengerFare;
	equipaje?: Equipaje3;
	fareComponents?: FareComponent[];
}

export interface PassengerType {
	code: string;
	quantity: number;
	equivalentCode: string;
	passengerTypeSearch: string;
	fareType?: string;
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

export interface Equipaje3 {
	equipaje: Equipaje4[];
}

export interface Equipaje4 {
	segmentos: Segmento3[];
	piezas: number;
}

export interface Segmento3 {
	id: number;
}

export interface FareComponent {
	brandId: string;
	segments: Segment3[];
}

export interface Segment3 {
	legIndex: number;
	flightIndex: number;
}

export interface Gds {
	origenSearch?: string;
	idGDS: number;
	idLogSearch?: string;
	webSessionID?: string;
	pcc?: string;
	esFlyAndDrive: boolean;
	searchDate?: string;
	officeId?: string;
}

export interface Validate {
	tarifaTotalAdulto: string;
	tarifaNetaAdulto: string;
	listaClases: string;
	lineaAereaValidadora: string;
	impuestos: string;
}

export interface AirlinesFilter {
	code: string;
	name: string;
	imageUrl: string;
	minPrice: number;
	minPriceWithScales: number;
}

export interface ExchangeRate {
	currency: string;
	amount: number;
}

export interface PricingDetail {
	passengersCount: number;
	baseFareADT: number;
	baseFareINF: number;
	baseFareCNN: number;
	taxes: number;
	feeNMV: number;
	feePTA: number;
	totalADT: number;
	totalINF: number;
	totalCNN: number;
	totalPay: number;
}


export interface DetailFlight{
	totalDaysTravel:number,
	departure:Departure[],
	return:Returns | null
}


export interface IDetailPricing{
    passengersCount:number
    baseFareADT:number
    baseFareINF:number
    baseFareCNN:number
    taxes:number
    feeNMV:number
    feePTA:number
    totalADT:number
    totalINF:number
    totalCNN:number
    totalPay:number
  }
