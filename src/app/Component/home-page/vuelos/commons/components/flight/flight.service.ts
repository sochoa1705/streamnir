import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { paramsNmv } from 'src/app/shared/utils';
import { ResponseModelT } from 'src/app/shared/models';
import { IFlightRates, TYPE_PARAM } from './flight.models';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IAereolineas } from 'src/app/shared/components/aereolineas/aereolineas.interfaces';
import { MOCK_AEREOLINEAS } from './flight.mocked';

@Injectable()
export class FlightService {
    constructor(private httpClient: HttpClient) { }

    //TODO modelo servicio

    getPasajesAereos(type:TYPE_PARAM){
        const options = {
            params: paramsNmv.set('Parameter.Type', type)
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
        const options = {
            params: paramsNmv.set('Parameter.Status', true)
        }
        const url = environment.urlNmviajes + '/Airline';
        return this.httpClient.get<ResponseModelT<IAereolineas[]>>(url, options).pipe(
            map(resp=> resp.Result)
        )
    }

}