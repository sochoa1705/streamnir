import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetalleBookingService{
  constructor(private http: HttpClient) { }
  getBookingDetail(idClicot: string, reservaId: string, tipo: string ): Observable<any>{
    return this.http.get<any>(`${environment.urlApiMotorVuelos}get-booking-detail?IdClicot=${idClicot}&ReservaId=${reservaId}&Tipo=${tipo}`);
  }
}
