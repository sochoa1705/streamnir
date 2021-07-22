import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Core, Path } from '../shared/constant';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
}
