import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { paramsNmv } from 'src/app/shared/utils';
import { ResponseModelT } from 'src/app/shared/models';
import { IFlightRates, TYPE_PARAM } from './flight.models';
import { map } from 'rxjs/operators';


@Injectable()
export class FlightService {
    constructor(private httpClient: HttpClient) { }

    getPasajesAereos(type:TYPE_PARAM){
        const options = {
            params: paramsNmv.set('Parameter.Type', type)
        }
        const url = environment.urlNmviajes + '/Flight/GetRates'
        return this.httpClient.get<ResponseModelT<IFlightRates[]>>(url, options).pipe(
            map(resp=> resp.response)
        )
    }

}