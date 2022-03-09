/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqServiceDelete } from './rq-service-delete';
export interface RqServiceDeleteCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqServiceDelete;
  TrackingCode: string;
}
