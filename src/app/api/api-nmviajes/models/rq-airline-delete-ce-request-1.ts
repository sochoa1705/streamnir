/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqAirlineDelete } from './rq-airline-delete';
export interface RqAirlineDeleteCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqAirlineDelete;
  TrackingCode: string;
}
