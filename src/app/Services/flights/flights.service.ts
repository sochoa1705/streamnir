import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  getCiudades(ciudad: string){
    let url_api = `http://10.75.131.17:10508/GetCiudades_AutoComplete?pStrIdCiudad=${ciudad}`;
    return this.http.get(url_api)
  }
}
