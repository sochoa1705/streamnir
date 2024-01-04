import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneratePayService {

  constructor(
    private http: HttpClient
  ) { }

  generatePay(payload: any): Observable<any> {
    let url_api = `${environment.url_api}${ENDPOINT_API.GENERATE_PAY}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }
}
