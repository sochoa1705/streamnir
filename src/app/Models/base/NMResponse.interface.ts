import { NMStatus } from "./NMStatus.interface";

export interface NMResponse<T> {
  Estatus: NMStatus;
  Resultado: T;
}