export interface EmailRequestModel {
  Caller: Caller
  MuteExceptions: boolean
  Parameter: Parameter
  TrackingCode: string
}

export interface Caller {
  Application: string
  Company: string
  FromIP: string
  FromBrowser: string
}

export interface Parameter {
  To: string[]
  Subject: string
  Data: Data
}

export interface Data {
  Contacto: Contacto
  Resultados: Resultado[]
  Url: string
}

export interface Contacto {
  Nombres: string
  Email: string
}

export interface Resultado {
  Salidas: Salida[]
  Retornos: Retornos
  DesgloseTarifa: DesgloseTarifa[]
  TarifaTotal: string
  TotalImpuestos: string
  TotalCargos: string
  Moneda: string
}

export interface Salida {
  FechaSalida: string
  CiudadSalida: string
  CiudadDestino: string
  Segmentos: Segmento[]
}

export interface Segmento {
  HoraInicio: string
  HoraFin: string
  UrlImagen: string
  DuracionVuelo: string
  Escalas: number
  IncluyeEquipajes: boolean
}

export interface Retornos {
  CiudadDestino: string
  CiudadSalida: string
  FechaSalida: string
  Segmentos: Segmento2[]
}

export interface Segmento2 {
  HoraInicio: string
  HoraFin: string
  UrlImagen: string
  DuracionVuelo: string
  Escalas: number
  IncluyeEquipajes: boolean
}

export interface DesgloseTarifa {
  CodigoTipoPasajero: string
  TarifaPasajero: string
  CantidadTipoPasajero: number
}

