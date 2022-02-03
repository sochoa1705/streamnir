import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckCardService {

  constructor(
    public http: HttpClient,
  ) { } 
  
  checkCard(card: any): Observable<any> {
    const url = `http://10.75.102.23:10003/v1/api/Card/Check?Parameter.Number=${card}&TrackingCode=qwertyuiiop&MuteExceptions=false&Caller.Company=Agil&Caller.Application=Expertia`
    return this.http.get<any>(url)
    // return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(map((observe: any) => observe))
  }
}
