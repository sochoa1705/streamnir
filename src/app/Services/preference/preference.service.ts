import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT_API } from '../../shared/constant';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) {}
  preference(payload: any): Observable<any> {
    let url_api = `${environment.urlPreference}${ENDPOINT_API.PREFERENCE}`
    return this.http
      .post<any>(url_api, payload)
    }
}
