/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqDestinationGetById } from './rq-destination-get-by-id';
export interface RqDestinationGetByIdCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqDestinationGetById;
  TrackingCode: string;
}
