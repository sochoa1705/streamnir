/* tslint:disable */
/* eslint-disable */
import { PaymentMethodEnum } from './payment-method-enum';
import { RqAmmount } from './rq-ammount';
import { RqBank } from './rq-bank';
import { RqBooking } from './rq-booking';
import { RqCard } from './rq-card';
import { RqCustomer } from './rq-customer';
import { RqSetting } from './rq-setting';
import { RqSignIn } from './rq-sign-in';

export interface RqPayment {
  Amount?: RqAmmount;
  Bank?: RqBank;
  Booking?: RqBooking;
  Card?: RqCard;
  Customer?: RqCustomer;
  Method?: PaymentMethodEnum;
  Setting?: RqSetting;
  SignIn?: RqSignIn;
  TransactionCode?: null | string;
  TypeOfOperation?: null | string;
}
