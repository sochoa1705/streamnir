import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ENDPOINT_API } from 'src/app/shared/constant';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  constructor(
    private http: HttpClient
  ) { }

  goMailing(payload: any): Observable<any> {
    let url_api = `${environment.urlBAse23}:${environment.portNewsletter}/${ENDPOINT_API.NEWSLETTER}`

    return this.http.post<any>(url_api, payload, { observe: 'response' })
  }
}
