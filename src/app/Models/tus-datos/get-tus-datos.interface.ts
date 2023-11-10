export interface GetTusDatos {
	resultados: PassengerData[];
}

interface PassengerData {
	Nombres: string;
	ApePaterno: string;
	ApeMaterno: string;
	FechaNacimiento: string;
	Email: string;
	Telefono: string;
  gender: string;
  country: string;
  district: string;
  address: string;
}
