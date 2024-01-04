import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { ENDPOINT_API } from '../../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class LibroReclamacionesService {

  constructor(private http: HttpClient) {}
  libroData(payload: any): Observable<any> {
    let url_api = `${environment.urlLibro}/${ENDPOINT_API.LIBRO_RECLAMO}`
    return this.http
      .post<any>(url_api, payload)}
}
