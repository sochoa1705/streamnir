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
    private http: HttpClient
  ) { }

  secureBooking(payload: any): Observable<any> {
    debugger

    let url_api = `${environment.url_api}${ENDPOINT_API.SECURE_BOOKING}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }
}