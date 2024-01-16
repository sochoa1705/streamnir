import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, pluck, retry, switchMap } from 'rxjs/operators';
import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { IGeoTree } from 'src/app/shared/components/filter-tabs/tab-vuelos/tab-vuelos.interfaces';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';
import { ISuggest, IPackageCountry } from '../../shared/components/filter-tabs/tab-vuelos/tab-vuelos.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DestinyService {
  //private httpOptions: any;
  constructor(private http: HttpClient) {}

  private sessionRequestRates = 'ratesRequestExpertia';

  getDestiny(payload: any): Observable<any> {
    let url_api = `${environment.url_api}${ENDPOINT_API.DESTINY}`;
    return this.http
      .post<any>(url_api, payload, { observe: 'response' })
      .pipe(map((observe: any) => observe['body']));
  }

  getRates(request: any, fecIni: string, fecFin: string): Observable<any> {
    request.fecIni = fecIni;
    request.fecFin = fecFin;
    this.saveRequestRates(request);
    let url = `${environment.urlGeo}/search-rates`;
    return this.http.post<any>(url, request, {
      headers: {
        'not-loading': 'true',
      },
    });
  }

  saveRequestRates(request: any) {
    sessionStorage.setItem(this.sessionRequestRates, JSON.stringify(request));
  }

  getDestinyPaqueteDinamico(
    search: string,
    typeSearch: string
  ): Observable<any> {
    let urlApiPaquete: string = environment.urlPaqueteDinamico;
    let urlApi = `${urlApiPaquete}${ENDPOINT_API.LOCATION_SEARCH}?tripType=${typeSearch}&query=${search}&micrositeId=nm_viajes&languageId=ES&departure=&specialTicket=false&searchType=origin&_=1636554156303`;
    return this.http.jsonp(urlApi, 'callback=test');
  }

  getGeoTree(query: string) {
    const url = environment.urlGeo + `/ubigeo/geotree/${query}`;
    const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('not-loading', 'true')
    return this.http.get<IGeoTree[]>(url, {headers});
  }

  getDestinyCountriesPaqueteDinamico(
  ): Observable<any> {
    let urlApiPaquete: string = environment.urlPaqueteDinamico;
    let urlApi = `${urlApiPaquete}${ENDPOINT_API.LOCATION_SEARCH_COUNTRIES}?lang=ES&_=1650245018201`;
    return this.http.jsonp(urlApi, 'callback=test');
  }

  getSuggest(
    search: string
  ): Observable<any> {
    const url = environment.urlSuggest + `?lang=es&query=${search}`;
    return this.http.get<ISuggest[]>(url);
  }

  getPackageCountry(): Observable<any> {
    let urlApiPaquete: string = environment.urlPaqueteDinamico;
    let urlApi = `${urlApiPaquete}${ENDPOINT_API.LOCATION_SEARCH_COUNTRIES_PACKAGE}?lang=ES&_=1650392708010`;
    return this.http.jsonp(urlApi, 'callback=jQuery112402763568406322572_1650392708009');
  }

  getThemes(): Observable<any> {
    let urlApiPaquete: string = environment.urlPaqueteDinamico;
    let urlApi = `${urlApiPaquete}${ENDPOINT_API.LOCATION_SEARCH_THEMES_PACKAGE}?lang=ES&_=1650245018201`;
    return this.http.jsonp(urlApi, 'callback=test');
  }

  getFilters(): Observable<any> {
    let urlApiPaquete: string = environment.urlPaqueteDinamico;
    let urlApi = `${urlApiPaquete}${ENDPOINT_API.RESOURCES_FILTERS}?lang=ES&_=1650245018201`;
    return this.http.jsonp(urlApi, 'callback=test');
  }
}
