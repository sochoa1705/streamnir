import { Fechas, Operacion, OrigenDestino, Pasajeros } from "./flight-search-gtm.model"

export interface AddToCardGtmModel {
	event: string,
	operacion: Operacion,
	precio: Precio,
	origen: OrigenDestino,
	destino: OrigenDestino,
	vuelo: Vuelo,
	ruta: Ruta,
	pasajeros: Pasajeros,
	fechas: Fechas
}

export interface Precio {
	moneda: string,
	precioNormal: number,
	precioFinal: number
}

export interface Vuelo {
	clase: string,
	tipo: string,
	equipaje_categoria: string,
	equipaje_label: string,
	group_id: string,
	gds: string,
	escalas: string
}

export interface Ruta {
	aerolinea_salida: string,
	aerolinea_regreso: string
}
