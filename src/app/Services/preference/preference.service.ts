import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT_API } from '../../shared/constant';
import { environment } from '../../../environments/environment';
import { NmvModel } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) { }

  preference(payload: any): Observable<any> {
    let url_api = `${environment.urlNmviajesAccount}/${ENDPOINT_API.PREFERENCE}`
    return this.http
      .post<any>(url_api, payload)
  }

  countries(): Observable<any> {
    const nmvModel = new NmvModel()
    const options = {
      params: nmvModel.params.set('Parameter.IataCode', ''),
    }
    let url_api = `${environment.urlNmviajesAccount}/${ENDPOINT_API.COUNTRIES}`
    return this.http
      .get<any>(url_api, options)
  }
  departments(option: any): Observable<any> {
    const nmvModel = new NmvModel()
    const options = {
      params: nmvModel.params.set('Parameter.Code', option),
    }
    let url_api = `${environment.urlNmviajesAccount}/${ENDPOINT_API.DEPARTAMENTS}`
    return this.http
      .get<any>(url_api, options)
  }
  districts(option: any): Observable<any> {
    const nmvModel = new NmvModel()
    const options = {
      params: nmvModel.params.set('Parameter.Code', option),
    }
    let url_api = `${environment.urlNmviajesAccount}/${ENDPOINT_API.DISTRICTS}`
    return this.http
      .get<any>(url_api, options)
  }

}
