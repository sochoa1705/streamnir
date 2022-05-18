/* tslint:disable */
/* eslint-disable */
import { CeReservaContacto } from './ce-reserva-contacto';
import { CeReservaItinerario } from './ce-reserva-itinerario';
import { CeReservaPago } from './ce-reserva-pago';
import { CeReservaPasajero } from './ce-reserva-pasajero';
import { CeReservaPrecio } from './ce-reserva-precio';
export interface CeReserva {
  Contactos?: null | Array<CeReservaContacto>;
  Itinerario?: null | Array<CeReservaItinerario>;
  NumeroSolicitudCompra?: null | string;
  Pago?: CeReservaPago;
  Pasajeros?: null | Array<CeReservaPasajero>;
  PrecioFinal?: CeReservaPrecio;
}
