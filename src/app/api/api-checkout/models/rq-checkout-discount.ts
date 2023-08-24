export interface RDiscount {
	result: Result;
	trackingCode: string;
}

export interface Result {
	isSuccess: boolean;
	amount: number;
	amountDiscount: number;
	totalWithDiscount: number;
	discount: Discount;
	message: string;
	campaignName: string;
}

export interface Discount {
	type: string;
	max: number;
	value: number;
}



export interface RDiscountCupon {
  result: ResultCupon
  trackingCode: string
}

export interface ResultCupon {
  isSuccess: boolean
  message: string
  codigoPromocionalId: number
  codigo: string
  descripcion: string
  promoWebId: number
  origenId: string
  destinoId: string
  aerolineaId: string
  tipoDescuento: string
  montoDescuento: number
  montoMaximo: number
  tipoUso: string
  cantidadLimite: number
  cantidadUsada: number
  fechaInicio: string
  fechaFin: string
  usuarioCreacion: number
  fechaCreacion: string
  usuarioModificacion: number
  fechaModificacion: string
}
