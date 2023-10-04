import { Precio, Ruta, Vuelo} from "./add-to-card-gtm.model"
import { Fechas, OrigenDestino, Pasajeros } from "./flight-search-gtm.model"

export interface ContactGtmModel {
	event: string,
	precio: Precio,
	usuario: Usuario,
	origen: OrigenDestino,
	destino: OrigenDestino,
	vuelo: Vuelo,
	ruta: Ruta,
	pasajeros: Pasajeros,
	fechas: Fechas
}

interface Usuario {
	email: string,
	primerNombre: string,
	primerApellido: string,
	fechaNacimiento: string,
	nacionalidad: string,
	genero: string,
	documento_tipo: string,
	documento_numero: string,
	telefono_tipo: string,
	telefono_codigo: string,
	telefono_numero: string,
	frecuencia: string
}
