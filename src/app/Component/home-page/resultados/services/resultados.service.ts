import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MockedResultados } from '../resultados.mocked';
import { IAerolineas, IMotorVuelo } from '../models/resultados.interfaces';
import { environment } from 'src/environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable()
export class ResultadosService {
    constructor(private http: HttpClient) { }

    
    private getMotorDeReglas(): any {
        const url =
          environment.urlMaster +
          ':10517/v1/api/ReglasNegocio/ObtenerReglasDeNegocioXIdWeb/3?estado=1';
        return this.http.get(url).toPromise();
      }
    
      async getToken():Promise<string> {
        const url = environment.urlMaster + ':10530/api/auth/token';
        const rules = await this.getMotorDeReglas();
    
        const payload = {
          muteExceptions: true,
          TrackingCode: '1',
          Caller: {
            Company: 0,
            Application: 0,
          },
          rules,
        };
    
        return this.http.post(url,payload).pipe(
          pluck<any,string>('accessToken')
        ).toPromise()
      }
    
      async searchMv(body:any):Promise<IMotorVuelo>{
        // const url = environment.urlMaster + ':10515/motor-vuelo/search';
        const url = environment.urlMaster + ':10515/motor-vuelo/search-new';
    
        const token = await this.getToken();
        localStorage.setItem('token', JSON.stringify(token))
    
        const headers = new HttpHeaders()
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${token}`)
    
        // const body = {
        //   "flightType": 2,
        //   "departureLocation": "LIM",
        //   "arrivalLocation": "CUZ",
        //   "departureDate": "2022-02-26T17:21:06.204Z", 
        //   "arrivalDate": "2022-02-28T17:21:06.204Z",  
        //   "adults": 1,
        //   "children": 1,
        //   "infants": 0,
        //   "selected_cabins": "",
        //   "excludedAirlines": null,
        //   "multicity": null
        // }
        return this.http.post<Promise<IMotorVuelo>>(url,  body , {headers}).toPromise()
      }

    getResultados():Observable<IAerolineas[]>{
        return of(MockedResultados)
    }


}