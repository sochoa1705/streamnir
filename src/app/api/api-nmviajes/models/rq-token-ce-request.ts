export interface RToken {
    accessToken: string
    expiresIn: number
    transactionId: string
    device: number
    configuraciones: Configuraciones
    reglasVentaAnticipada: ReglasVentaAnticipada[]
  }
  
  export interface Configuraciones {
    configId: number
    habilitar12Cuotas: number
    habilitar24Cuotas: number
    activarDividelo: number
    montoMinimoDividelo: number
    vistaCompleta: number
    estado: number
  }
  
  export interface ReglasVentaAnticipada {
    aerolineas: string
    dk: number
    estado: number
    fechaDesde: string
    fechaHasta: string
    formaPagos: string
    horasAnticipo: number
    registroId: number
    reglaId: number
    ruta: string
    tipoRuta: string
    todasAerolineas: boolean
    lstFormaPagos: LstFormaPago[]
  }
  
  export interface LstFormaPago {
    pagoId: string
    descripcion: string
  }
  