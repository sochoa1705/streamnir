export interface RAdvanceSaleRule {
    aerolineas: string;
    dk: number;
    estado: number;
    fechaDesde: string;
    fechaHasta: string;
    formaPagos: string;
    horasAnticipo: number;
    registroId: number;
    reglaId: number;
    ruta: string;
    tipoRuta: string;
    todasAerolineas: boolean;
    lstFormaPagos: FormPayments[];
  }
export interface FormPayments {
    pagoId: string;
    descripcion: string;
}
  