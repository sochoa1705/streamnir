/* tslint:disable */
/* eslint-disable */
import { CeRequestCaller } from './ce-request-caller';
import { RqPayment } from './rq-payment';
export interface RqPaymentCeRequest1 {
  Caller: CeRequestCaller;
  MuteExceptions: boolean;
  Parameter: RqPayment;
  TrackingCode: string;
}
