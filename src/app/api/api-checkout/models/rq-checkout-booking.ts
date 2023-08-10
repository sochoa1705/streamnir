export interface IBooking {
    groupId: string
    segmentSelected: number[]
    paymentType: number
    card: Card
    contact: Contact
    customer: Customer
    passengers: Passenger[]
    brandedFareName: string
    CuponPromoWeb: string
    generateTicket: boolean
    deviceSessionId: string
    secure?: Secure
  }
  
  export interface Card {
    cardNumber?: string
    cvv?: string
    expiration?: string
    documentNumber?: string
    documentType: number | null
    cardOwner?: string
    city?: string
    address?: string
    numberQuotes: number
    email?: string
    counter: number
  }
  
  export interface Contact {
    name: string
    lastName: string
    motherLastname: string
    email: string
    address: string
    isBilling: boolean
    ruc: string
    phones: Phone[]
    subCode: number
    company: Company
    idLoggin: number
  }
  
  export interface Phone {
    type: string
    phoneNumber: string
    areaCode: string
    countryCode: string
  }
  
  export interface Company {
    companyName: string
    companyAddress: string
  }
  
  export interface Customer {
    username: string
    firstName: string
    lastName: string
    motherLastname: string
    address: string
    email: string
  }
  
  export interface Passenger {
    type: string
    name: string
    lastName: string
    birthday: string
    nationality: string
    documentType: number
    documentNumber: string
    phone: string
    gender: string
    isFrecuently: boolean
    email:string
  }
  
  export interface Secure {
    unitPrice: number
    totalPrice: number
    moneyExchange: number
    isDomestic: boolean
  }
