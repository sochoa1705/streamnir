import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { paramsNmv } from 'src/app/shared/utils';
import { ResponseModelT } from 'src/app/shared/models';
import { IFlightRates, TYPE_PARAM } from './flight.models';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

const response = {
    "Result": [
      {
        "Destination": "Mexico",
        "Type": "I",
        "Rate": 357,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\mexico.jpg"
      },
      {
        "Destination": "New York",
        "Type": "I",
        "Rate": 398,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\new_york.jpg"
      },
      {
        "Destination": "Los Angeles",
        "Type": "I",
        "Rate": 402,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\los_angeles.jpg"
      },
      {
        "Destination": "Bogota",
        "Type": "I",
        "Rate": 228,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\bogota.jpg"
      },
      {
        "Destination": "Cancun",
        "Type": "I",
        "Rate": 341,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\cancun.jpg"
      },
      {
        "Destination": "Buenos Aires",
        "Type": "I",
        "Rate": 289,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\buenos_aires.jpg"
      },
      {
        "Destination": "Madrid",
        "Type": "I",
        "Rate": 569,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\madrid.jpg"
      },
      {
        "Destination": "Miami",
        "Type": "I",
        "Rate": 184,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\miami.jpg"
      },
      {
        "Destination": "Santiago de Chile",
        "Type": "I",
        "Rate": 135,
        "Currency": "USD",
        "Image": "https://www.nmviajes.com/Images/paquetes\\santiago_de_chile.jpg"
      }
    ],
    "TrackingCode": "af51",
    "State": {
      "Ok": true
    }
  }


@Injectable()
export class FlightService {
    constructor(private httpClient: HttpClient) { }

    //TODO modelo servicio

    getPasajesAereos(type:TYPE_PARAM){
        const options = {
            params: paramsNmv.set('Parameter.Type', type)
        }
        const url = environment.urlNmviajes + '/Flight/GetRates'
        return this.httpClient.get<ResponseModelT<IFlightRates[]>>(url, options).pipe(
            map(resp=> resp.Result)
        )
    }

}