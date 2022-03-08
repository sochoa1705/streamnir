import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  static readonly profilePasswordPutPath = '/v1/api/Profile/Password';

  update(payload: any) {
    const url = `${environment.urlNmviajesAccount}${PasswordService.profilePasswordPutPath}`;

    return this._httpClient.put<any>(url, payload);
  }
}
