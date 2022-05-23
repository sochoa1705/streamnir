/* tslint:disable */
/* eslint-disable */
import { CeReservaAdicional } from './ce-reserva-adicional';
export interface CeReservaItinerario {
  Adicionales?: null | Array<CeReservaAdicional>;
  CiudadDestino?: null | string;
  CiudadOrigen?: null | string;
  Duracion?: null | string;
  FechaLlegada?: null | string;
  FechaSalida?: null | string;
  HoraLlegada?: null | string;
  HoraSalida?: null | string;
  OperadorPor?: null | string;
  Vuelos?: null | Array<string>;
}
