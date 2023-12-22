import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { SaveSearchRequest } from "../models/rq-save-search-request";
import { EmailRequestModel } from "../models/ce-email-request.model";
import { environment } from "src/environments/environment";
import { EmailResponse } from "../models/rq-email-response";


@Injectable({
  providedIn: 'root'
})
export class ReengancheService {

  constructor(private http: HttpClient) {
  }

  saveClientsSearch(request: SaveSearchRequest): Observable<any> {
    let url = `${environment.urlApiDatosCliente}/GuardarBusquedaCliente`;
    return this.http.post<EmailResponse>(url, request, {
      headers: { 'not-loading': 'true' }
    });
  }

  sendFirstThreeFightsToEmail(request: EmailRequestModel): Observable<EmailResponse> {
    let url = `${environment.urlApiCorreos}/v1/api/Message/SendReengancheViajes`;
    return this.http.post<EmailResponse>(url, request);
  }
}
