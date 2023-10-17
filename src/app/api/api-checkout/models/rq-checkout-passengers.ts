export interface PassengersInfo{
    passengers:Passenger[],
    contact:Contact,
    billing:Billing,
    acceptPolitics:boolean
}

export interface Passenger {
    type: string
    name: string
    lastName: string
    birthday: string
    nationality: string
    documentType: string
    documentNumber: string
    fullPhone: string
    phone: string
    email: string
    gender: string
    isFrecuently: boolean
    day: number
    month: number
    year: number,
    index:number
}


export interface Contact {
    name: string
    lastName: string
    motherLastname: string
    phones: Phone[]
    fullPhone: FullPhone | null
    email: string
    isBilling: boolean
    subCode: number
    address: string
    idLoggin: number
  }
  
  export interface Phone {
    type: string
    phoneNumber: string
    areaCode: string
    countryCode: string
  }
  
  export interface FullPhone {
    number: string
    internationalNumber: string
    nationalNumber: string
    e164Number: string
    countryCode: string
    dialCode: string
  }


  export interface Billing {
    ruc: string
    company: Company | string
    companyName: string
    companyAddress: string
  }
  
  export interface Company {
    companyName: string
    companyAddress: string
  }
  

  export const passengerInfoInit:PassengersInfo={
    passengers:[],
    contact:{
        name: '',
        lastName:'',
        motherLastname: '',
        phones: [],
        fullPhone: null,
        email: '',
        isBilling: false,
        subCode: 0,
        address: '',
        idLoggin: 0,
    },
    billing:{
        ruc: "",
        company: "",
        companyName: "",
        companyAddress: ""
    },
    acceptPolitics:false
  }