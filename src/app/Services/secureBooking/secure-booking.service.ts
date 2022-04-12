import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecureBookingService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  generateInsuranceReserve(payload: any): Observable<any> {
    const url_api = `${environment.url_api}${ENDPOINT_API.SECURE_BOOKING}`;

    return this._httpClient.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }

  updateSafetypayPaymentCode(payload: any): Observable<any> {
    const url_api = `${environment.url_api}${ENDPOINT_API.UPDATE_PAY}`;

    return this._httpClient.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }

  updateStatusInInsuranceReserve(payload: any): Observable<any> {
    const url_api = `${environment.url_api}${ENDPOINT_API.UPDATE_STATE}`;

    return this._httpClient.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }

}