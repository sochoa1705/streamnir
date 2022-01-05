import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseModelT } from 'src/app/shared/models';
import { paramsNmv } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { IDestinos } from '../destino.models';

@Injectable()
export class DestinosService {

  constructor(private httpClient:HttpClient) { }


  getVuelos(codeDestination:string,codeOrigin:string='LIM',type:string='A'){
    const options = {
      params: paramsNmv
              .set('Parameter.CodeDestination', codeDestination)
              .set('Parameter.CodeOrigin', codeOrigin)
              .set('Parameter.Type', type)
      }

      const url = environment.urlNmviajes + '/Flight/GetLastSearchesByCity';

      return this.httpClient.get<ResponseModelT<IDestinos[]>>(url, options).pipe(
        map(resp=> resp.Result)
    )
  }

}
