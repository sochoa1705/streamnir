import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DestinyService {
  //private httpOptions: any;
  constructor(
    private http: HttpClient
  ) { 

     const httpOptions = { headers: new 
      HttpHeaders({ 'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origins':'*'})};
   

  }

  getDestiny(payload: any): Observable<any> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.DESTINY}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body'])
    )
  }



  ObtenerOfertaVuelos(payload: any): Observable<any> {
    debugger;
    //let url_api = `http://10.75.131.17:8097/api/flights/Lista_Tarifas/`;
    let url_api = `http://localhost:21555/api/flights/Lista_Tarifas/`;
    return this.http.post<any>(url_api , payload );
  }


 

  getDestinyPaqueteDinamico(search: string, typeSearch: string): Observable<any> {
    let urlApiPaquete : string = environment.urlPaqueteDinamico;
    let urlApi = `${urlApiPaquete}${ENDPOINT_API.LOCATION_SEARCH}?tripType=${typeSearch}&query=${search}&micrositeId=nm_viajes&languageId=ES&departure=&specialTicket=false&searchType=origin&_=1636554156303`;
    return this.http.jsonp(urlApi, 'callback=test');
  }

}
