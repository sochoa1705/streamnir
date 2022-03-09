/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqTicketFullGet } from './rq-ticket-full-get';
export interface RqTicketFullGetCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqTicketFullGet;
  TrackingCode: string;
}
