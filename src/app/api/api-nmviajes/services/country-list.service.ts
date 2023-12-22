import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICountry } from '../models/rq-contries-get';

@Injectable({providedIn: 'root'})
export class ContryService {
    
    constructor(private _httpClient: HttpClient) { }
    URL_API=environment.urlGeo;

    getContryList(){
        const url = `${this.URL_API}/ubigeo/country-list`;
        const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('not-loading', 'true')
		return this._httpClient.get<ICountry[]>(url,{headers});
    }
}