import { PaymentMethodGtmModel } from 'src/app/Models/analytics-flights/payment-method-gtm.model';
import { GlobalComponent } from '../global';


export const getBodyGTMPayment = (): PaymentMethodGtmModel => {
    const dataBooking=GlobalComponent.appBooking;
	return {
        ...GlobalComponent.GMTContact,
        event: 'nmv_vuelos_checkout_seleccionarPago',
        metodo_pago:{
            opcion: dataBooking.paymentType==0 ? "CreditCard" : "SafetyPay",
        }
	};
};

export const searchCountryName=(code:string):string=>{
    const textNationality = GlobalComponent.listCountries.find(item=>item.code==code)?.name || code;
    return textNationality; 
}