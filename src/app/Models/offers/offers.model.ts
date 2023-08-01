export interface Offers {
	origen: string,
	destino: string,
	precio: number,
	tipoOferta: number,
	tipoVuelo: number,
	urlImagen: string,
	link: string,
	tyc: string,
	mostrar: boolean,
	esNacional: boolean,
	incluye: string[],
	noches: number,
	tipoAlojamiento: string
}
