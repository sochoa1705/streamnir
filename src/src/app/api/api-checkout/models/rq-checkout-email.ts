export interface REmail {
    parameter: Parameter
  }
  
  export interface Parameter {
    to: string[]
    subject: string
    data: Data
  }
  
  export interface Data {
    numeroSolicitudCompra: string
    messageConfirm: string
    allowVoid: boolean
    agil: boolean
    precioFinal: PrecioFinal
    pasajeros: Pasajero[]
    itinerario: Itinerario[]
    contactos: Contacto[]
  }
  
  export interface PrecioFinal {
    precioDolares: string
    precioSoles: string
  }
  
  export interface Pasajero {
    tipoPasajero: string
    nombresApellidos: string
    fechaNacimiento: string
    numeroSolicitudCompra: string
  }
  
  export interface Itinerario {
    ciudadOrigen: string
    ciudadDestino: string
    duracion: string
    fechaSalida: string
    fechaLlegada: string
    horaSalida: string
    horaLlegada: string
    vuelos: string[]
    operadorPor: string
    escalas: number
    equipajeMano: boolean
    equipajeBodega: boolean
    adicionales: any[]
  }
  
  export interface Contacto {
    nombresApellidos: string
    correoElectronico: string
    telefonos: string
  }
  