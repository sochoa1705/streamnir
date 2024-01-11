export interface IValidateBooking {
    idWeb: number
    idLang: number
    orientacion: number
    rutaBusqueda: string
    fechaSalida: string
    fechaRetorno: string
    fechasMulticity: string
    esRutaNacional: boolean
    idLogSearch: number
    pasajeros: Pasajero[]
    segmentos: Segmento[]
    lineaValidadora: string
  }
  
  export interface Pasajero {
    nombre: string
    apellido: string
    numeroDocumento: string
    tipoDocumento: string
  }
  
  export interface Segmento {
    ciudadOrigen: string
    ciudadDestino: string
  }
  


  export interface RValidateBooking {
    success: boolean
    isChurning: boolean
    isDuplicate: boolean
    isMT: boolean
    mensajeError: string
    bookings?:any;
  }
  