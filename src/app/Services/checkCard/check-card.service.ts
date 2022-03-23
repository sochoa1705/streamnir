import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENDPOINT_API } from 'src/app/shared/constant';

@Injectable({
  providedIn: 'root'
})
export class CheckCardService {

  constructor(
    public http: HttpClient,
  ) { } 
  
  checkCard(card: any): Observable<any> {
    const url = `${environment.urlSeguros}${ENDPOINT_API.CHECK_CARD} ?Parameter.Number=${card}&TrackingCode=qwertyuiiop&MuteExceptions=false&Caller.Company=Agil&Caller.Application=Expertia`
    return this.http.get<any>(url)
    // return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(map((observe: any) => observe))
  }
}
