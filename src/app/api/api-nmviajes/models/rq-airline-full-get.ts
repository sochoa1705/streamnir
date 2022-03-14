/* tslint:disable */
/* eslint-disable */
import { RsAirlineDetail } from './rs-airline-detail';
import { RsAirlineGallery } from './rs-airline-gallery';
export interface RqAirlineFullGet {
  AirlineDetails?: null | Array<RsAirlineDetail>;
  AirlineGalleries?: null | Array<RsAirlineGallery>;
  IataCode?: null | string;
  Information?: null | string;
  Logo?: null | string;
  Name?: null | string;
  SmallLogo?: null | string;
  Status?: boolean;
}
