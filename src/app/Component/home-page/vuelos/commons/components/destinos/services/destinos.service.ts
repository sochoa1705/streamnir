import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModelT } from 'src/app/shared/models';
import { NmvModel } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { IDestinos } from '../destino.models';

@Injectable({
  providedIn: 'root'
})

export class DestinosService {

  private paramCiudad = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient) { }


  setParam(path: string) {

    const pathArray = path.split("/");

    const indiceDestino = pathArray.indexOf("destino");

    if (indiceDestino === -1) {
      this.paramCiudad.next("");
    } else {
      const codigoCiudad = pathArray[indiceDestino + 2];

      this.paramCiudad.next(codigoCiudad);
    }
  }

  getParam() {
    return this.paramCiudad.asObservable();
  }

  getVuelos(codeDestination: string, codeOrigin: string = 'LIM', type: string = 'A') {
    const nmvModel = new NmvModel()

    const options = {
      params: nmvModel.params
        .set('Parameter.CodeDestination', codeDestination)
        .set('Parameter.CodeOrigin', codeOrigin)
        .set('Parameter.Type', type)
    }

    const url = environment.urlNmviajes + '/Flight/GetLastSearchesByCity';

    return this.httpClient.get<ResponseModelT<IDestinos[]>>(url, options).pipe(
      map(resp => resp.Result)
    )
  }

}
