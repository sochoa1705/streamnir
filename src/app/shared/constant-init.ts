import { IBooking } from "../api/api-checkout/models/rq-checkout-booking";

export const detailPricingInit={
    passengersCount: 0,
    baseFareADT: 0,
    baseFareINF: 0,
    baseFareCNN: 0,
    taxes: 0,
    feeNMV: 0,
    feePTA: 0,
    totalPay: 0,
    totalADT: 0,
    totalCNN: 0,
    totalINF: 0
};


export const dataSteps = [
    {
        id: 0,
        name: 'Beneficios',
        active: true,
        check: false,
    },
    {
        id: 1,
        name: 'Pasajeros',
        active: false,
        check: false,
    },
    {
        id: 2,
        name: 'Revisar y pagar',
        active: false,
        check: false,
    }
];



export const dataInitBooking:IBooking={
    groupId:'',
    segmentSelected: [0,0],
    deviceSessionId: '',
    paymentType:0,
    brandedFareName: '',
    CuponPromoWeb: '',
    generateTicket: false,
    customer: {
        username: '',
        firstName: '',
        lastName: '',
        motherLastname: '',
        address: 'Lima - Peru',
        email: ''
    },
    card: {
        documentType: null,
        numberQuotes: 0,
        counter: 1
    },
    contact: {
        name: '',
        lastName: '',
        motherLastname: '',
        email: '',
        address: '',
        isBilling: true,
        ruc: '',
        phones: [],
        subCode: 0,
        company: {
            companyName: '',
            companyAddress: ''
        },
        idLoggin: 0
    },
    passengers:[]
};


export const detailSecureInit = {
    unitPrice:0,
    totalPrice:0,
    moneyExchange:0,
    isDomestic:false
};