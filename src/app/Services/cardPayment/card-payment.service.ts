import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardPaymentService {

  constructor(
    public http: HttpClient,
  ) { }

  cardPayment(payload: any): Observable<any> {
    const url = 'http://10.75.102.23:10003/'
    const url_api = `${url}${ENDPOINT_API.CARD_PAYMENT}`
    return this.http.post<any>(url_api, payload)
  }
}
