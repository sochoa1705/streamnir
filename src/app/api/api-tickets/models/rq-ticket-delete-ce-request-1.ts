/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqTicketDelete } from './rq-ticket-delete';
export interface RqTicketDeleteCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqTicketDelete;
  TrackingCode: string;
}
