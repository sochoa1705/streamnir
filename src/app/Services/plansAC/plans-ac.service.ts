import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlansACService {

  constructor(
    private http: HttpClient
  ) { }

  // payload = {
  //   "Aplicacion": "Intranet",
  //   "CodigoSeguimiento": "Test",
  //   "CodigosEntorno": "DESA/NMO/NMO",
  //   "Parametros": {
  //     "UnidadNegocio": 5,
  //     "Dk": "23571",
  //     "SubCodigo": null,
  //     "CotizacionAC": {
  //       "Pais": "510",
  //       "CodigoAgencia": "87823",
  //       "NumeroSucursal": "0",
  //       "PlanFamiliar": "false",
  //       "Destino": "12",
  //       "CantidadDias": "10",
  //       "Clientes": {
  //         "ClienteCotizacion": [
  //           {
  //             "Edad": "40",
  //             "FechaNacimiento": "17/08/1981"
  //           },
  //           {
  //             "Edad": "10",
  //             "FechaNacimiento": "17/08/2011"
  //           }
  //         ]
  //       }
  //     }
  //   }
  // }

  plansAC(payload: any): Observable<any> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.PLANSAC}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado']),
      map((e: any) => {
        return e.map((i: any, index: any) => {
          i.change = (e[index].precioEmision * e[index].tipoCambio).toFixed(2)
          return i
        })
      })
    )
  }
}
