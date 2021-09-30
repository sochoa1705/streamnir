import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/Models/general/city';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(
    private http: HttpClient
  ) { }

  getCiudades(value: City): Observable<City[]> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.ciudades}?${ENDPOINT_API.ciudad}=${value}`;
    return this.http.get<City[]>(url_api)
  }
}
