import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ENDPOINT_API } from '../../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class DollarChangeService {

  constructor(
    private http: HttpClient,
  ) { }

  changeDollar(payload: any){
    // const url_api = 'http://10.75.131.17:8091/api/generales/TipoCambio' //cambiar ruta
    // `${environment.urlBase}${ENDPOINT_API.CIUDADES}?${ENDPOINT_API.ciudad}=${value}`
    const url_api = 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/generales/TipoCambio' //cambiar ruta
    //const url_api = `${environment.endpoint}${ENDPOINT_API.CHANGE}`
    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }

}

