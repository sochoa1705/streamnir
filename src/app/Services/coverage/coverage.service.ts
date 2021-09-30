import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coverage } from 'src/app/Models/general/coverage';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoverageService {

  constructor(
    private http: HttpClient
  ) { }


  getCoverage(): Observable<Coverage[]> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.coverage}`;
    let headers = new HttpHeaders({
      "cache-control": "no-cache",
      "content-type": "application/json; charset=utf-8",
      "expires": "-1",
      "pragma": "no-cache",
      "server": "Microsoft-IIS/8.5",
      "x-aspnet-version": "4.0.30319",
      "x-powered-by": "ASP.NET"
    })
    let body = {
      "Aplicacion": "Intranet",
      "CodigoSeguimiento": "Test",
      "CodigosEntorno": "PROD/NMO/NMO",
      "Parametros": {
        "CodigoISOPais": "510",
        "Agencia": "87823",
        "Sucursal": "0",
        "CodigoProducto": "MX",
        "CodigoTarifa": "96045",
        "Edad": "40",
        "TipoModalidad": "1"
      }
    }
    return this.http.post<any>(url_api, body, { headers})
  }
}
