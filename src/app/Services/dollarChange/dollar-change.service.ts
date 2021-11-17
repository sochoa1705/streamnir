import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DollarChangeService {

  constructor(
    private http: HttpClient,
  ) { }

  changeDollar(payload: any){
    const url_api = 'http://10.75.131.17:8091/api/generales/TipoCambio' //cambiar ruta
    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }

}

