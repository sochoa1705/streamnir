import { NMMessage } from "./NMMessage.interface";

export interface NMStatus {
  Ok: boolean;
  Mensajes: NMMessage[];
}