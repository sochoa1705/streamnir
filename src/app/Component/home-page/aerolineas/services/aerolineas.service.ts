import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NmvModel } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { ResponseModelT } from 'src/app/shared/models';
import { IAerolineaInf } from '../models/aerolineas.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class AerolineasService {
  constructor(private httpClient: HttpClient) {}

  getInformation(codAerolinea: string) {
    const nmvModel = new NmvModel();

    const options = {
      params: nmvModel.params.set('Parameter.IataCode', codAerolinea),
    };

    const url = environment.urlNmviajes + '/Airline/IataCode';

    return this.httpClient
      .get<ResponseModelT<IAerolineaInf>>(url, options)
      .pipe(map((resp) => resp.Result));
  }
}
