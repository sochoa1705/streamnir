import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinyService {

  constructor(
    private http: HttpClient
  ) { }

  getDestiny(payload: any): Observable<any> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.DESTINY}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body'])
    )
  }

  getDestinyPaqueteDinamico(search: string, typeSearch: string): Observable<any> {
    let urlApiPaquete : string = environment.urlPaqueteDinamico;
    let urlApi = `${urlApiPaquete}${ENDPOINT_API.LOCATION_SEARCH}?tripType=${typeSearch}&query=${search}&micrositeId=nm_viajes&languageId=ES&departure=&specialTicket=false&searchType=origin&_=1636554156303`;
    return this.http.jsonp(urlApi, 'callback=test');
  }
}
