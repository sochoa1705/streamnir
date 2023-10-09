export interface IUpSell {
  index?:number
  name: string
  description: string
  brandInitialSelected: boolean
  modifyPriceBrandSelected: boolean
  fareBreakDowns: FareBreakDown[]
  fareFamilySegment: FareFamilySegment[]
  informationServices: InformationService[],
  dataBags?:InformationService[],
  dataExtras?:InformationService[],
  totalPay?:number,
  includeHandBag?:boolean,
  includesHoldBag?:boolean
}

export interface FareBreakDown {
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
  equipaje: Equipaje
}

export interface Tax {
  countryCode: string
  fareAmount: number
}

export interface Equipaje {
  equipaje: Equipaje2[]
}

export interface Equipaje2 {
  segmentos: Segmento[]
  piezas: number
}

export interface Segmento {
  id: number
}

export interface FareFamilySegment {
  departureCode: string
  arrivalCode: string
  cabinWithFareBasis: CabinWithFareBasi[]
}

export interface CabinWithFareBasi {
  cabin: string
  fareBasis: string
  brandCode: string
}

export interface InformationService {
  itsInclude: boolean
  itsSubjectToCharges: boolean
  description: string
  isBag?:boolean
}


export interface Step {
  id:number,
  name:string,
  active:boolean,
  check:boolean,
}