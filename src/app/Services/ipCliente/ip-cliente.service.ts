import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class IpClienteService {

  constructor(
    private http: HttpClient,
  ) { }

  ipCliente() {
    const url_api = 'http://api.ipify.org/?format=json'
    return this.http.get(url_api)
  }
}
