/* tslint:disable */
/* eslint-disable */
import { RqTransactionAmount } from './rq-transaction-amount';
import { RqTransactionBooking } from './rq-transaction-booking';
import { RqTransactionExternal } from './rq-transaction-external';
import { RqTransactionHolderCard } from './rq-transaction-holder-card';
import { RqTransactionSetting } from './rq-transaction-setting';
import { RqTransactionSignIn } from './rq-transaction-sign-in';
export interface RqPostTransaction {
  Amount?: RqTransactionAmount;
  Booking?: RqTransactionBooking;
  External?: RqTransactionExternal;
  HolderCard?: RqTransactionHolderCard;
  Identifier?: null | string;
  Setting?: RqTransactionSetting;
  SignIn?: RqTransactionSignIn;
  TypeOfOperation?: null | string;
  TypeOfSale?: null | string;
}
