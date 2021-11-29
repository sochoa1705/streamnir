import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Core, Path } from '../shared/constant';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AutorizacionService } from './autorizacion.service';
import { UserRequest } from '../Models/Request/UserRequest';
import { ResponseNumber } from '../Models/general/general.interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  urlWebApi: string;
  constructor(
    private http: HttpClient,
    private autorizacionService: AutorizacionService
  ) { 
    this.urlWebApi = environment?.serverUrlApi;
  }


  GetUserId = (userRequest: UserRequest): Observable<ResponseNumber> => {
    return this.http
      .post<ResponseNumber>(this.urlWebApi + Path.Core + Core.GetUserId, {
        observe: 'body',
        params: {
          userRequest: JSON.stringify(userRequest),
        },
      })
      .pipe(retry(0), catchError(this.autorizacionService.errorHandl));
  };

 /* ObtenerOfertaVuelos = (userRequest: any): Observable<any> => {
    return this.http
      .post<any>("http://10.75.131.17:8097/api/flights/Lista_Tarifas", {
        observe: 'body',
        params: {
          userRequest: JSON.stringify(userRequest),
        },
      })
      .pipe(retry(0), catchError(this.autorizacionService.errorHandl));
  };*/

  ObtenerOfertaVuelos(payload: any): Observable<any> {
    let url_api = `http://10.75.131.17:8097/api/flights/Lista_Tarifas`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body'])
    )
  }
}
