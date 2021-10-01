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


  getCoverage(payload: any): Observable<Coverage[]> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.coverage}`;
    let headers = new HttpHeaders({
      "content-type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    })

    return this.http.post<any>(url_api, payload, { headers })
  }
}
