import { ContactGtmModel } from "./contact-gtm.model"

export interface PaymentMethodGtmModel extends ContactGtmModel {
	metodo_pago: MetodoPago
}

interface MetodoPago {
	opcion: string
}
