import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  constructor(
    private http: HttpClient
  ) { }

  businessUnit(payload: any): Observable<any> {
    let url_api = `${environment.url_api}${ENDPOINT_API.BUSINESS_UNIT}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body'])
    )
  }
}
