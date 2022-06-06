/* tslint:disable */
/* eslint-disable */
import { CeSeguroAsegurados } from './ce-seguro-asegurados';
import { CeSeguroCobertura } from './ce-seguro-cobertura';
import { CeSeguroContacto } from './ce-seguro-contacto';
import { CeSeguroPago } from './ce-seguro-pago';
import { CeSeguroPrecio } from './ce-seguro-precio';
export interface CeSeguro {
  Asegurados?: null | Array<CeSeguroAsegurados>;
  Cobertura?: CeSeguroCobertura;
  Contacto?: CeSeguroContacto;
  Pago?: CeSeguroPago;
  Precio?: CeSeguroPrecio;
}
