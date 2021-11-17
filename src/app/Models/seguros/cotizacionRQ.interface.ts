export interface CotizarSeguroRQ {
  UnidadNegocio: number;
  Dk: string;
  SubCodigo: null | string;
  CotizacionAC: CotizacionAC;
}

export interface CotizacionAC {
  Pais: string;
  CodigoAgencia: string;
  NumeroSucursal: string;
  PlanFamiliar: string;
  Destino: string;
  CantidadDias: string;
  Clientes: Clientes;
}

export interface Clientes {
  ClienteCotizacion: ClienteCotizacion[];
}

export interface ClienteCotizacion {
  Edad: string;
  FechaNacimiento: string;
}