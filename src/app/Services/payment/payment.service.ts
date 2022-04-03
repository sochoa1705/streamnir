import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    public http: HttpClient,
  ) { }

  payment(payload: any): Observable<any> {
    // const url =  environment.url_api
    const url =  'http://10.75.102.23:10005/v1/api/'
    const url_api = `${url}${ENDPOINT_API.PAYMENT}`
    return this.http.post<any>(url_api, payload)
  }
}
