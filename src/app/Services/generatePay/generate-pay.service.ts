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
  // payload = {
  //   "Aplicacion": "Intranet",
  //   "CodigoSeguimiento": "[Web: midominio.com - Agente: demo - Id: 19082021101601]",
  //   "CodigosEntorno": "DESA/NMO/NMO",
  //   "Parametros": {
  //     "PromoterName": "",
  //     "CustomerName": "PEREZ ANA",
  //     "CustomerDocumentNumber": "10078410452",
  //     "IdClient": 12758,
  //     "WebId": "3",
  //     "Mail": "anaperez@gmail.com",
  //     "DKClient": "61649",
  //     "UserAgent": "Assist Card",
  //     "IdUser": "87614",
  //     "IpUser": "119.5.166.59",
  //     "Amount": {
  //       "FeeAmount": 0.9,
  //       "RechargeAmount": 64,
  //       "Currency": "USD"
  //     }
  //   }
  // }

  generatePay(payload: any): Observable<any> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.GENERATE_PAY}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }
}
