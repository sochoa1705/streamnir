import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  saveAccount(payload: any): Observable<any> {

    const url = environment.urlNmviajesAccount + '/Account/Signup';

    return this.http.post<any>(url, payload);
  }



}


