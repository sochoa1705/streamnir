
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NmvModel } from 'src/app/shared/utils';
import { ResponseModelT } from 'src/app/shared/models';
import { map } from 'rxjs/operators';

export interface ContactInformationHeader {
  UserId: number;
  Firstname: string;
  FatherLastname: string;
  MotherLastname: string;
  Birthdate: Date;
  Nationality: string;
  CountryId: number;
  DocumentType: string;
  DocumentNumber: string;
}

export interface ContactInformationDetail {
  UserId: number;
  CountryId: number;
  ProvinceId: number;
  CityId: number;
  Number: string;
  InteriorNumber: string;
  DistrictId: number;
  PostalCode: string;
  Phone: string;
  MobilePhone: string;
}

@Injectable()
export class ContactoService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  static readonly contactInformationHeaderGetPath = '/v1/api/Profile/GetData';
  static readonly contactInformationDetailGetPath = '/v1/api/Profile/GetContact';
  static readonly contactInformationHeaderPutPath = '/v1/api/Profile/Data';
  static readonly contactInformationDetailPutPath = '/v1/api/Profile/Contact';

  getContactInformationHeader(userId: number) {
    const nmvModel = new NmvModel();

    const options = {
      params: nmvModel.params
        .set('Parameter.UserId', userId)
    };

    const url = `${environment.urlNmviajesAccount}${ContactoService.contactInformationHeaderGetPath}`;

    return this._httpClient
      .get<ResponseModelT<ContactInformationHeader>>(url, options)
      .pipe(map((resp) => resp.Result));
  }

  getContactInformationDetail(userId: number) {
    const nmvModel = new NmvModel();

    const options = {
      params: nmvModel.params
        .set('Parameter.UserId', userId)
    };

    const url = `${environment.urlNmviajesAccount}${ContactoService.contactInformationDetailGetPath}`;

    return this._httpClient
      .get<ResponseModelT<ContactInformationDetail>>(url, options)
      .pipe(map((resp) => resp.Result));
  }

  updateContactInformationHeader(payload: any) {
    const url = `${environment.urlNmviajesAccount}${ContactoService.contactInformationHeaderPutPath}`;

    return this._httpClient.put<any>(url, payload);
  }

  updateContactInformationDetail(payload: any) {
    const url = `${environment.urlNmviajesAccount}${ContactoService.contactInformationDetailPutPath}`;

    return this._httpClient.put<any>(url, payload);
  }
}