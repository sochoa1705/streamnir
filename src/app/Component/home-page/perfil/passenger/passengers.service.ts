import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseModelT } from '../../../../shared/models';
import { NmvModel } from '../../../../shared/utils';

export interface Passenger {
  Id: number;
  UserId: number;
  Firstname: string;
  FatherLastname: string;
  MotherLastname: string;
  Birthdate: string;
  Nationality: string;
  CountryId: number;
  DocumentType: string;
  DocumentNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  static readonly passengersGetPath = '/v1/api/Passenger';
  static readonly passengersGetByIdPath = '/v1/api/Passenger/Id';
  static readonly passengersPostPath = '/v1/api/Passenger';
  static readonly passengersPutPath = '/v1/api/Passenger';
  static readonly passengersDeletePath = '/v1/api/Passenger';

  getAll(userId: number) {
    const nmvModel = new NmvModel();

    const options = {
      params: nmvModel.params.set('Parameter.UserId', userId)
    };

    const url = `${environment.urlNmviajesAccount}${PassengersService.passengersGetPath}`;

    return this._httpClient
      .get<ResponseModelT<Array<Passenger>>>(url, options)
      .pipe(map((resp) => resp.Result));
  }

  get(userId: number, id: number) {
    const nmvModel = new NmvModel();

    const options = {
      params: nmvModel.params
        .set('Parameter.UserId', userId)
        .set('Parameter.Id', id)
    };

    const url = `${environment.urlNmviajesAccount}${PassengersService.passengersGetByIdPath}`;

    return this._httpClient
      .get<ResponseModelT<Passenger>>(url, options)
      .pipe(map((resp) => resp.Result));
  }

  save(payload: any) {

    // const nmvModel = new NmvModel();

    // const options = {
    //   params: nmvModel.params
    //     .set('Parameter', payload)
    // };

    const url = `${environment.urlNmviajesAccount}${PassengersService.passengersPostPath}`;

    return this._httpClient.post<any>(url, payload);
  }

  update(payload: any) {
    // const nmvModel = new NmvModel();

    // const options = {
    //   params: nmvModel.params
    //     .set('Parameter', payload)
    // };

    const url = `${environment.urlNmviajesAccount}${PassengersService.passengersPutPath}`;

    return this._httpClient.put<any>(url, payload);
  }

  delete(userId: number, id: number) {

    const payload = {
      TrackingCode: "123qwe",
      MuteExceptions: environment.muteExceptions,
      Caller: {
        Company: "Agil",
        Application: "Interagencias"
      },
      Parameter: {
        Id: id,
        UserId: userId
      }
    };

    const url = `${environment.urlNmviajesAccount}${PassengersService.passengersDeletePath}`;

    return this._httpClient
      .delete<any>(url, { body: payload });
  }
}

