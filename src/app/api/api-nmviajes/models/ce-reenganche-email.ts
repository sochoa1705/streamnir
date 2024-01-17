export interface ReengancheVuelosEmailModel {
  Contacto: Contacto;
  Resultados: Resultado[];
  Url: string;
}

interface Contacto {
  Nombres: string;
  Email: string;
}

interface Resultado {
  Salidas: Salida[];
  Retornos: Salida;
  DesgloseTarifa: DesgloseTarifa[];
  TarifaTotal: string;
  TotalImpuestos: string;
  TotalCargos: string;
  Moneda: string;
}

interface Salida {
  Segmentos: Segmento[];
  FechaSalida: string;
  CiudadSalida: string;
  CiudadDestino: string;
}

export interface Segmento {
  HoraInicio: string;
  HoraFin: string;
  UrlImagen: string;
  Escalas: number;
  DuracionVuelo: string;
  IncluyeEquipajes: boolean;
}

interface DesgloseTarifa {
  CodigoTipoPasajero: string;
  CantidadTipoPasajero: number;
  TarifaPasajero: string;
}
