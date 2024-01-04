/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqServicePut } from './rq-service-put';
export interface RqServicePutCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqServicePut;
  TrackingCode: string;
}
