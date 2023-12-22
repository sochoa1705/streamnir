export interface RPurchare {
    confirmed: boolean
    rptaNative?: RptaNative
    rptaNativeString?: string
    idGds: number
    pnr?: string
    pnrAirline?: string
    idCotizacion: number
    resultPasarela?: ResultPasarela
    esUATP: boolean
    ciP_SafetyPAY: number
    priceUpdated: number
    esMultiticket: boolean,
    lstRptaBookingMT?: LstRptaBookingMT[]
  }
  
  export interface RptaNative {
    dataLists: DataLists
    order: Order
  }

  export interface LstRptaBookingMT{
    rptaNative: RptaNative
    pnr: string
    pnrAirline: string
    pseudoReserva: string
    idGds: number
  }
  
  export interface DataLists {
    baggageAllowanceList: BaggageAllowanceList[]
    fareGroups: FareGroup[]
    originDestList: OriginDestList[]
    contactInfoList: ContactInfoList[]
    paxJourneyList: PaxJourneyList[]
    paxList: PaxList[]
    paxSegmentList: PaxSegmentList[]
    penaltyList: any[]
    priceClassList: PriceClassList[]
    serviceDefinitionList: ServiceDefinitionList[]
  }
  
  export interface BaggageAllowanceList {
    baggageAllowanceID: string
    descText: string
    pieceAllowance: PieceAllowance
    typeCode: string
    weightAllowance: any[]
  }
  
  export interface PieceAllowance {
    applicablePartyText: string
    totalQty: number
  }
  
  export interface FareGroup {
    fareCode: string
    isCombined: boolean
    fareDetail: FareDetail[]
    fareGroupID: string
  }
  
  export interface FareDetail {
    fareComponent: FareComponent
    farePriceType: FarePriceType
    paxRefID: string[]
  }
  
  export interface FareComponent {
    priceClassRefID: string
    paxSegmentRefIDs: string[]
  }
  
  export interface FarePriceType {
    farePriceTypeCode: string
    price: Price
  }
  
  export interface Price {
    baseAmount: BaseAmount
    taxSummary: TaxSummary[]
    totalAmount: TotalAmount
  }
  
  export interface BaseAmount {
    curCode: string
    value: number
  }
  
  export interface TaxSummary {
    amount: Amount
  }
  
  export interface Amount {
    curCode: string
    value: number
  }
  
  export interface TotalAmount {
    curCode: string
    value: number
  }
  
  export interface OriginDestList {
    destCode: string
    originCode: string
    paxJourneyRefIDs: any[]
  }
  
  export interface ContactInfoList {
    contactInfoID: string
    emailAddressText: string
    phone: Phone
  }
  
  export interface Phone {
    areaCodeNumber: string
    contactTypeText: string
    countryDialingCode: string
    phoneNumber: string
  }
  
  export interface PaxJourneyList {
    paxJourneyID: string
    paxSegmentRefIDs: string[]
  }
  
  export interface PaxList {
    identityDoc: IdentityDoc
    individual: Individual
    paxID: string
    ptc: string
  }
  
  export interface IdentityDoc {
    expiryDate: string
    identityDocID: string
    identityDocTypeCode: string
    issuingCountryCode: string
  }
  
  export interface Individual {
    genderCode: string
    givenName: string
    surname: string
  }
  
  export interface PaxSegmentList {
    arrival: Arrival
    cabinType: CabinType
    datedOperatingLeg: DatedOperatingLeg
    dep: Dep2
    duration: string
    marketingCarrierInfo: MarketingCarrierInfo
    operatingCarrierInfo: OperatingCarrierInfo
    paxSegmentId: string
    fareBasis: string
  }
  
  export interface Arrival {
    aircraftScheduledDateTime: string
    iatA_LocationCode: string
  }
  
  export interface CabinType {
    cabinTypeCode: string
    cabinTypeName: string
  }
  
  export interface DatedOperatingLeg {
    arrival: Arrival2
    carrierAircraftType: CarrierAircraftType
    datedOperatingLegID: string
    dep: Dep
  }
  
  export interface Arrival2 {
    iatA_LocationCode: string
  }
  
  export interface CarrierAircraftType {
    carrierAircraftTypeCode: string
  }
  
  export interface Dep {
    iatA_LocationCode: string
  }
  
  export interface Dep2 {
    aircraftScheduledDateTime: string
    iatA_LocationCode: string
  }
  
  export interface MarketingCarrierInfo {
    carrierDesigCode: string
    marketingCarrierFlightNumberText: number
  }
  
  export interface OperatingCarrierInfo {
    carrierDesigCode: string
  }
  
  export interface PriceClassList {
    cabinType: CabinType2
    code: string
    fareBasisCode: string
    name: string
    priceClassID: string
  }
  
  export interface CabinType2 {
    cabinTypeCode: string
    cabinTypeName: string
  }
  
  export interface ServiceDefinitionList {
    desc: string[]
    name: string
    serviceDefinitionID: string
  }
  
  export interface Order {
    bookingRef: BookingRef
    orderID: string
    orderItems: OrderItem[]
    ownerCode: string
    statusCode: string
    curCode: string
    totalAmount: number
  }
  
  export interface BookingRef {
    bookingID: string
  }
  
  export interface OrderItem {
    orderItemID: string
    fareDetails: FareDetail2[]
    flightAssociations: FlightAssociation[]
  }
  
  export interface FareDetail2 {
    farePriceType: FarePriceType2
    paxRefID: string[]
  }
  
  export interface FarePriceType2 {
    price: Price2
  }
  
  export interface Price2 {
    baseAmount: BaseAmount2
    taxSummary: TaxSummary2[]
    totalAmount: TotalAmount2
  }
  
  export interface BaseAmount2 {
    curCode: string
    value: number
  }
  
  export interface TaxSummary2 {
    amount: Amount2
    taxCode: string
  }
  
  export interface Amount2 {
    curCode: string
    value: number
  }
  
  export interface TotalAmount2 {
    curCode: string
    value: number
  }
  
  export interface FlightAssociation {
    paxSegmentRefID: string
  }
  
  export interface ResultPasarela {
    Operation_Id: string
    Transaction_id: string
    Payment_Expiration_Datetime: string
    Amounts: Amount3[]
    Payment_Locations: PaymentLocation[]
  }
  
  export interface Amount3 {
    Value: number
    Currency_Code: string
  }
  
  export interface PaymentLocation {
    Location_Url: string
    Location_Id: string
    Location_Name: string
    Payment_Instructions: PaymentInstruction[]
    Howto_Pay_Steps: HowtoPayStep[]
    Status: boolean
  }
  
  export interface PaymentInstruction {
    Name: string
    Value: string
    Display_Label: string
  }
  
  export interface HowtoPayStep {
    Step_Number: number
    Step_Instruction: string
  }
  