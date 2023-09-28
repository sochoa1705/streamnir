import { IDetailPricing } from "./rq-checkout-search"

export interface IBookingKayak {
    request: Request
    group: Group
    rules: Rules
    exchangeRate: ExchangeRate
  }
  
  export interface Request {
    flightType: number
    departureLocation: string
    arrivalLocation: string
    departureDate: string
    arrivalDate: string
    adults: number
    children: number
    infants: number
    flightClass: number
    incluyeEquipaje: boolean
    ndc: boolean
    trackingCode: string
  }
  
  export interface Group {
    sequenceNumber: number
    lowCost: boolean
    esOnline: boolean
    brandedFare: boolean
    id: string
    airline: Airline
    departure: Departure[]
    returns?: Returns
    pricingInfo: PricingInfo
    ndcInfo?: NdcInfo
    gds: Gds
    madBacValidation: number,
    detailPricing?:IDetailPricing
  }
  
  export interface Airline {
    code: string
    name: string
    imageUrl: string
  }
  
  export interface Departure {
    departureDate: string
    originCity: OriginCity
    destinationCity: DestinationCity
    segments: Segment[]
  }
  
  export interface OriginCity {
    code: string
    name: string
    airport: string
    country: string
    continent: string
  }
  
  export interface DestinationCity {
    code: string
    name: string
    airport: string
    country: string
    continent: string
  }
  
  export interface Segment {
    offerItemID: string
    startDateTime: string
    endDateTime: string
    stops: number
    segmentId: number
    flightDuration: string
    equipaje: Equipaje
    flightSegments: FlightSegment[]
  }
  
  export interface Equipaje {
    piezas: number
  }
  
  export interface FlightSegment {
    guarantee: boolean
    flightNumber: number
    lfId: number
    departureDateTime: string
    arrivalDateTime: string
    cabin: string
    fareBasis: string
    isReturn: boolean
    rph: number
    elapsedTime: string
    seatsRemaining: number
    idRegla: number
    departureAirport: DepartureAirport
    arrivalAirport: ArrivalAirport
    airEquipType: string
    operatingAirline: OperatingAirline
    marketingAirline: MarketingAirline
  }
  
  export interface DepartureAirport {
    code: string
    name: string
    airport: string
  }
  
  export interface ArrivalAirport {
    code: string
    name: string
    airport: string
  }
  
  export interface OperatingAirline {
    code: string
    flightNumber: number
    name: string
    imageUrl: string
  }
  
  export interface MarketingAirline {
    code: string
    flightNumber: number
    name: string
    imageUrl: string
  }
  
  export interface Returns {
    departureDate: string
    originCity: OriginCity2
    destinationCity: DestinationCity2
    segments: Segment2[]
  }
  
  export interface OriginCity2 {
    code: string
    name: string
    airport: string
    country: string
    continent: string
  }
  
  export interface DestinationCity2 {
    code: string
    name: string
    airport: string
    country: string
    continent: string
  }
  
  export interface Segment2 {
    offerItemID: string
    startDateTime: string
    endDateTime: string
    stops: number
    segmentId: number
    flightDuration: string
    equipaje: Equipaje2
    flightSegments: FlightSegment2[]
  }
  
  export interface Equipaje2 {
    piezas: number
  }
  
  export interface FlightSegment2 {
    guarantee: boolean
    flightNumber: number
    lfId: number
    departureDateTime: string
    arrivalDateTime: string
    cabin: string
    fareBasis: string
    isReturn: boolean
    rph: number
    elapsedTime: string
    seatsRemaining: number
    idRegla: number
    departureAirport: DepartureAirport2
    arrivalAirport: ArrivalAirport2
    airEquipType: string
    operatingAirline: OperatingAirline2
    marketingAirline: MarketingAirline2
  }
  
  export interface DepartureAirport2 {
    code: string
    name: string
    airport: string
  }
  
  export interface ArrivalAirport2 {
    code: string
    name: string
    airport: string
  }
  
  export interface OperatingAirline2 {
    code: string
    flightNumber: number
    name: string
    imageUrl: string
  }
  
  export interface MarketingAirline2 {
    code: string
    flightNumber: number
    name: string
    imageUrl: string
  }
  
  export interface PricingInfo {
    itinTotalFare: ItinTotalFare
    totalFare: number
  }
  
  export interface ItinTotalFare {
    isNdc: boolean
    isPrivate: boolean
    fareFamily: string
    fareBreakDowns: FareBreakDown[]
  }
  
  export interface FareBreakDown {
    passengerType: PassengerType
    passengerFare: PassengerFare
  }
  
  export interface PassengerType {
    code: string
    quantity: number
    equivalentCode: string
    passengerTypeSearch: string
  }
  
  export interface PassengerFare {
    baseFare: number
    taxes: number
    totalFare: number
    feeNMV: number
    feePTA: number
    currencyCode: string
    dsctoTaxes: number
    baseFareOrderBy: number
  }
  
  export interface NdcInfo {
    ownerCode: string
    segmentInfo: SegmentInfo[]
  }
  
  export interface SegmentInfo {
    segments: number[]
    uniqueOfferReference: string
    upSells: UpSell[]
    offerItems: OfferItem[]
  }
  
  export interface UpSell {
    offerID: string
    name: string
    description: string
    brandInitialSelected: boolean
    modifyPriceBrandSelected: boolean
    fareBreakDowns: FareBreakDown2[]
    fareFamilySegment: FareFamilySegment[]
    informationServices: InformationService[]
  }
  
  export interface FareBreakDown2 {
    passengerType: string
    equivalentCode: string
    passengerTypeSearch: string
    totalFare: number
    baseFare: number
    feeNMV: number
    feePTA: number
    priceVariation: number
    quantity: number
    taxes: Tax[]
    equipaje: Equipaje3
  }
  
  export interface Tax {
    fareAmount: number
  }
  
  export interface Equipaje3 {
    equipaje: Equipaje4[]
  }
  
  export interface Equipaje4 {
    piezas: number
    cabina?: Cabina
  }
  
  export interface Cabina {
    piezas: number
    peso: string
    descripcion1: string
  }
  
  export interface FareFamilySegment {
    offerItemID: string
    departureCode: string
    arrivalCode: string
    carrierCompany: string
    cabinWithFareBasis: CabinWithFareBasi[]
  }
  
  export interface CabinWithFareBasi {
    cabin: string
    fareBasis: string
  }
  
  export interface InformationService {
    itsInclude: boolean
    itsSubjectToCharges: boolean
    description: string
  }
  
  export interface OfferItem {
    offerItemId: string
  }
  
  export interface Gds {
    idGDS: number
    pcc: string
    officeId: string
    esFlyAndDrive: boolean
  }
  
  export interface Rules {
    datosRegla: DatosRegla
    datosWeb: DatosWeb
    configGenerales: ConfigGenerales
    lstReglaProveedores: LstReglaProveedore[]
    lstReglaPriorizacion: LstReglaPriorizacion[]
    lstReglaMultiticket: LstReglaMultiticket[]
    lstReglaProveedoresPseudo: LstReglaProveedoresPseudo[]
    lstReglaProveedoresReservaPseudo: any[]
    lstReglaBaneoAerolinea: LstReglaBaneoAerolinea[]
    lstReglaBaneoFarebTick: LstReglaBaneoFarebTick[]
    lstReglaBaneoBranded: any[]
    lstReglaBloqueoDestino: LstReglaBloqueoDestino[]
    lstReglaVentaAnticipada: LstReglaVentaAnticipada[]
    lstReglaPromocion: LstReglaPromocion[]
    lstReglaAirportAlternativo: LstReglaAirportAlternativo[]
  }
  
  export interface DatosRegla {
    reglaId: number
    descripcion: string
    webId: number
    nombreWeb: string
    vistaCompleta: number
    emiteAuto: boolean
    estado: number
  }
  
  export interface DatosWeb {
    webId: number
    nombre: string
    unidadNegocioAsociado: number
    dk: number
    subCodigo: number
    puntoVenta: number
    es_b2b: boolean
    dispositivos: string
    logo: string
    estado: number
  }
  
  export interface ConfigGenerales {
    configId: number
    habilitar12Cuotas: number
    habilitar24Cuotas: number
    activarDividelo: number
    montoMinimoDividelo: number
    vistaCompleta: number
    estado: number
  }
  
  export interface LstReglaProveedore {
    reglaId: number
    proveedorId: number
    nombreProveedor: string
    esGds: boolean
    tipoRuta: string
    ruta: string
    estado: number
    estadoProv: number
  }
  
  export interface LstReglaPriorizacion {
    registroId: number
    reglaId: number
    tipoRegla: string
    regla: string
    tipoRuta: string
    ruta: string
    aerolineas: string
    todasAerolineas: boolean
    lstPrioridadProveedores: LstPrioridadProveedore[]
    nombreProveedores: string
    fechaDesde: string
    fechaHasta: string
    estado: number
  }
  
  export interface LstPrioridadProveedore {
    registroId: number
    proveedorId: number
    nombreProv: string
    posicion: number
    estadoProv: number
  }
  
  export interface LstReglaMultiticket {
    registroId: number
    reglaId: number
    tipoRuta: string
    ruta: string
    lstDetalleMultiticket: LstDetalleMultiticket[]
    nombreProveedores: string
    descripPseudos: string
    estado: number
  }
  
  export interface LstDetalleMultiticket {
    registroId: number
    proveedorId: number
    nombreProv: string
    pseudoId: number
    descripcionPseudo: string
    posicion: number
    estadoProv: number
    estadoPseudo: number
  }
  
  export interface LstReglaProveedoresPseudo {
    reglaId: number
    proveedorId: number
    thread: number
    nombreProveedor: string
    pseudoIdPublicada: number
    nombrePseudoPublicada: string
    pseudoIdNegociada?: number
    nombrePseudoNegociada?: string
    todasCabinas: boolean
    todosDestinos: boolean
    incluirEquipaje: boolean
    estado: number
    estadoProv: number
    estadoPseudoPublicada: number
    estadoPseudoNegociada: number
    cabinas?: string
    accountCodes?: string
  }
  
  export interface LstReglaBaneoAerolinea {
    reglaId: number
    proveedorId: number
    nombreProveedor: string
    aerolineas: string
    todasAerolineas: boolean
    aerolineasMultiticket?: string
    estado: number
    estadoProv: number
    aerolineasFOID?: string
  }
  
  export interface LstReglaBaneoFarebTick {
    registroId: number
    reglaId: number
    tipoReferencia: string
    referencia: string
    valor: string
    comentarios: string
    estado: number
  }
  
  export interface LstReglaBloqueoDestino {
    registroId: number
    reglaId: number
    tipoDestino: string
    destino: string
    cadenaIatas: string
    estado: number
  }
  
  export interface LstReglaVentaAnticipada {
    aerolineas: string
    dk: number
    estado: number
    fechaDesde: string
    fechaHasta: string
    formaPagos: string
    horasAnticipo: number
    registroId: number
    reglaId: number
    ruta: string
    tipoRuta: string
    todasAerolineas: boolean
    lstFormaPagos: LstFormaPago[]
  }
  
  export interface LstFormaPago {
    pagoId: string
    descripcion: string
  }
  
  export interface LstReglaPromocion {
    reglaId: number
    proveedorId: number
    nombreProveedor: string
    ciudad: string
    codigoCuenta: string
    clases: string
    aerolinea: string
    fechaDesde: string
    fechaHasta: string
    estado: number
    estadoProv: number
  }
  
  export interface LstReglaAirportAlternativo {
    registroId: number
    reglaId: number
    proveedores: string
    ciudadAirport: string
    alternativos: string
    estado: number
  }
  
  export interface ExchangeRate {
    currency: string
    amount: number
  }
  