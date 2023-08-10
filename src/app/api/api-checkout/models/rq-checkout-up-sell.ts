export interface IUpSell {
  index?:number
  name: string
  description: string
  brandInitialSelected: boolean
  modifyPriceBrandSelected: boolean
  fareBreakDowns: FareBreakDown[]
  fareFamilySegment: FareFamilySegment[]
  informationServices: InformationService[]
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
}


export interface Step {
  id:number,
  name:string,
  active:boolean,
  check:boolean,
  url:string
}