import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaVuelosService {

  constructor(
    private http: HttpClient
  ) { }

  reserva(payload: any, tokenJson: string): Observable<any> {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${tokenJson}`)
    let url_api = `http://10.75.131.17:10515/motor-vuelo/save-booking`;
    return this.http.post<any>(url_api, payload, {headers})
  }
}
