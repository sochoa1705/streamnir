export interface CreditCard{
    cardNumber: string,
		cvv: string,
		expiration:string,
		documentNumber:string,
		documentType: string,
		cardOwner: string,
		city: string,
		address: string,
		numberQuotes: number,
		email: string,
		counter: number
}

export interface Booking{
    CuponPromoWeb: string,
    generateTicket: boolean,
    paymentType: number,
    deviceSessionId: string
}

export interface Payment{
    creditCard:CreditCard,
    booking:Booking,
    acceptAdvertising:boolean
}

export const paymentInit:Payment={
    creditCard:{
        cardNumber: '',
        cvv: '',
        expiration:'',
        documentNumber:'',
        documentType: '',
        cardOwner: '',
        city: '',
        address: '',
        numberQuotes: 0,
        email: '',
        counter: 0
    },
    booking:{
        CuponPromoWeb: '',
        generateTicket: false,
        paymentType: 0,
        deviceSessionId: ''
    },
    acceptAdvertising:false
}