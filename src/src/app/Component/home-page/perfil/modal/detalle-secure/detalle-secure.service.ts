import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetalleSecureService{
  constructor(private http: HttpClient) { }
  getSecureDetail(idClicot: string, reservaId: string, tipo: string ): Observable<any>{
    return this.http.get<any>(`${environment.urlApiMotorVuelos}secure/get-booking-detail?IdClicot=${idClicot}&ReservaId=${reservaId}`);
  }
}
