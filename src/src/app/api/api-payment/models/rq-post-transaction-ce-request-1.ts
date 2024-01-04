/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqPostTransaction } from './rq-post-transaction';
export interface RqPostTransactionCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqPostTransaction;
  TrackingCode: string;
}
