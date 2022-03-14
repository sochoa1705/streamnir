/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqAirlineFullGet } from './rq-airline-full-get';
export interface RqAirlineFullGetCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqAirlineFullGet;
  TrackingCode: string;
}
