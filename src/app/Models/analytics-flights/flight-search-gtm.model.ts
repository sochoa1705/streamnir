export interface FlightSearchGtmModel {
	event: string,
	operacion: Operacion,
	origen: OrigenDestino,
	destino: OrigenDestino,
	vuelo: Vuelo,
	pasajeros: Pasajeros,
	fechas: Fechas
}

export interface Operacion {
	id:string,
	dias_anticipacion: number
}

export interface OrigenDestino {
	codigo: string,
	nombre: string,
	pais?: string
}

export interface Vuelo {
	clase: string,
	tipo: string
}

export interface Pasajeros {
	adultos: number,
	ninos: number,
	infantes: number,
	total: number
}

export interface Fechas {
	salida: string,
	retorno: string,
	estadia: number
}