import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  constructor(private http: HttpClient) { }

  createContact(payload: any): Observable<any> {
    let url = `${environment.brevoBaseUrl}/contacts`;
    return this.http.post(url, payload, { headers: {'api-key': environment.brevoApiKey}});
  }
}
