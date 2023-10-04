import { PaymentMethodGtmModel } from "./payment-method-gtm.model"

export interface FlightPurchaseGtmModel extends PaymentMethodGtmModel {
	operacion: Operacion
}

interface Operacion {
	id: string,
	dias_anticipacion: number
}