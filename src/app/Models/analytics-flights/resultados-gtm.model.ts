import { Fechas, Operacion, OrigenDestino, Pasajeros, Vuelo } from "./flight-search-gtm.model"

export interface ResultadosGtmModel {
	event: string,
	operacion: Operacion,
	precio: Precio,
	origen: OrigenDestino,
	destino: OrigenDestino,
	vuelo: Vuelo,
	pasajeros: Pasajeros,
	fechas: Fechas,
	resultados: Resultado[]
}

interface Precio {
	moneda: string
}

export interface Resultado {
	posicion: string,
	precioFinal: number,
	gds: string,
	group_id: string,
	aerolinea_salida: string,
	aerolinea_regreso: string,
	equipaje_categoria: string,
	escalas: string
}