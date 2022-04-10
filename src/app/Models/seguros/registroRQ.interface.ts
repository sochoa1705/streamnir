
export interface RegistrarSeguroRQ {
  res_seguro_id?: number;
  fec_salida: string;
  fec_retorno: string;
  cant_paxes: number;
  destino: string;
  edades: string;
  fec_registro?: Date;
  estado?: number;
  prod_id: string;
  prod_nom: string;
  prod_familia: string;
  moneda_lista: string;
  moneda_local: string;
  precio_bruto: number;
  precio_bruto_local: number;
  precio_emision: number;
  precio_emision_local: number;
  precio_unitario: number;
  tipo_cambio: string;
  vuelo_res_id: number;
  contacto_nom: string;
  contacto_ape: string;
  contacto_email: string;
  contacto_direccion: string;
  contacto_telfs: string;
  contacto_emerg_nom: string;
  contacto_emerg_ape: string;
  contacto_emerg_email: string;
  contacto_emerg_telf: string;
  ruc: string;
  razon_social: string;
  comentario: string;
  webs_cid: number;
  usuweb_id: number;
  destinonacional: string;
  numeroruc?: string;
  comprobantepago: string;
  usobilletera: string;
  codigobloqueo: string;
  dkcliente: string;
  producto: string;
  pnr: string;
  pais_ac: number;
  agencia_ac: number;
  sucursal_ac: number;
  counter_ac: string;
  id_destino: number;
  facturar_pta: number;
  id_sucursal: number;
  id_punto: number;
  id_subcodigo: number;
  id_solicitante_agencia: string;
  id_comisionista: string;
  id_solicitante_area: string;
  comision: number;
  incentivo: number;
  incentivo_adicional: number;
  gasto_emision: number;
  id_file: number;
  aplica_descuento: number;
  direccion_fiscal?: string;
  id_unidad_negocio: number;
  aplica_factura_comision: number;
  forma_de_pago: string;
  nro_intentos_facturacion: number;
  nro_intentos_emision: number;
  porcentaje_descuento: number;
  usosafetypay: string;
  codigo_safetypay: string;
  nro_pedido_srv: number;
  fee_safetypay: number;
  pasajeros: Pasajero[];
  cobertura: Cobertura[];
  idfileautomatico: number;
  validarDuplicidad: boolean;
  fchExpiraSafetyPay?: string;
  xPagarSafetyPay: number;
  idTipoTarifa: number;
  idReciboSafetyPay: number;
}

export interface Cobertura {
  res_seguro_id?: number;
  atr_id?: number;
  atr_nom: string;
  valor: string;
  unidad: string;
}

export interface Pasajero {
  res_seguro_id?: number;
  pax_id?: number;
  pax_nom: string;
  pax_ape_pat: string;
  doc_cid: string;
  pax_num_doc: string;
  pax_fec_nac: Date;
  pax_voucher_travelace: string;
  pax_control_travelace: string;
  pax_void_travelace: string;
  pax_boleto: string;
  pax_voideo_pta: string;
  pax_facturado_pta: number;
  pax_precio_emision: number;
  pax_precio_emision_local: number;
  pax_precio_neto: number;
  idtipodoc_ac?: number;
}

export interface ActualizarEstadoSeguroRQ {
  res_seguro_id: number,
  usosafetypay: number
}

export interface ActualizarCodigoSafetyPaySeguroRQ {
  res_seguro_id: number,
  usosafetypay: string,
  codigo_safetypay: string,
  nro_pedido_srv: number,
  fee_safetypay: number
}