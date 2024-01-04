import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NmvModel } from 'src/app/shared/utils';
import { ResponseModelT } from 'src/app/shared/models';
import { IFlightRates, IVuelos, TYPE_PARAM } from './flight.models';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IAereolineas } from 'src/app/shared/components/aereolineas/aereolineas.interfaces';
import { MOCK_AEREOLINEAS } from './flight.mocked';

@Injectable()
export class FlightService {
    constructor(private httpClient: HttpClient) { }

    //TODO modelo servicio

    getPasajesAereos(type:TYPE_PARAM){
        const nmvModel = new NmvModel()
        const options = {
            params: nmvModel.params.set('Parameter.Type', type)
        }
        const url = environment.urlNmviajes + '/Flight/GetMostWanted'
        return this.httpClient.get<ResponseModelT<IFlightRates[]>>(url, options).pipe(
            map(resp=> resp.Result)
        )
    }

    // getAereolineas(){
    //     return of(MOCK_AEREOLINEAS)
    // }
    getAereolineas(){
        const nmvModel = new NmvModel()

        const options = {
            params: nmvModel.params.set('Parameter.Status', true)
        }
        const url = environment.urlNmviajes + '/Airline';
        return this.httpClient.get<ResponseModelT<IAereolineas[]>>(url, options).pipe(
            map(resp=> resp.Result)
        )
    }

    getVuelos(){
        const nmvModel = new NmvModel()
        const options = {
            params: nmvModel.params.set('Parameter.Status', true)
        }
        const url = environment.urlNmviajes + '/Flight/GetContinents';
        return this.httpClient.get<ResponseModelT<IVuelos[]>>(url, options).pipe(
            map(resp=> resp.Result)
        )
    }

    // http://10.75.102.23:10001/v1/api/Flight/GetLastSearchesByContinent?Parameter.ContinentCode=SA&Parameter.DestinationCode=peru&TrackingCode=12345&MuteExceptions=false&Caller.Company=Agil&Caller.Application=Interagencias
    // getVuelos(){
    //     const nmvModel = new NmvModel()
    //     const options = {
    //         params: nmvModel.params.set('Parameter.Status', true)
    //     }
    //     const url = environment.urlNmviajes + '/Flight/GetContinents';
    //     return this.httpClient.get<ResponseModelT<IVuelos[]>>(url, options).pipe(
    //         map(resp=> resp.Result)
    //     )
    // }

}