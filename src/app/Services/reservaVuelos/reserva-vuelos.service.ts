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

  reserva(payload: any): Observable<any> {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3NTU1ZTJmOC0wNzcyLTQzYmQtYmI2OS1hOWNhYzM3MTEyN2QiLCJUcmFja2luZ0NvZGUiOiIxIiwiQ29tcGFueSI6IkFnaWwiLCJBcHBsaWNhdGlvbiI6IkludGVyYWdlbmNpYXMiLCJNdXRlRXhjZXB0aW9ucyI6IlRydWUiLCJuYmYiOjE2NDMxNDMxOTMsImV4cCI6MTY0MzI2MzE5MywiaWF0IjoxNjQzMTQzMTkzLCJpc3MiOiJFeHBlcnRpYSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0In0.yfCPbk2IgMchKfKH_SxnvonHadudRuQ3_wxzVNpcIkQ'
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    let url_api = `http://10.75.131.17:10515/motor-vuelo/save-booking`;

    return this.http.post<any>(url_api, payload, {headers})
  }
}
