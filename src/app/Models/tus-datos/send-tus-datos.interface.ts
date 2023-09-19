export interface SendTusDatosRequest {
	passengers: Passenger[],
	idMedium: number;
	idStore: number;
	privacyPolicy: number;
	dataPolicy: number;
}

interface Passenger {
	docType: string;
	docNumber: string;
	names: string;
	lastName: string;
	mLastName: string;
	email: string;
	birthDate: string;
	phone: string;
}

export interface SendTusDatosResponse {
	ResultadoError: boolean;
	Mensaje: string;
}
