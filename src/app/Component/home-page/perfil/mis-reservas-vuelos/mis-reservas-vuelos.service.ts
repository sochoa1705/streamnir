import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetMyBookings } from "./mis-reservas-vuelos.models";

@Injectable({
  providedIn: 'root'
})
export class MisReservasService{
  constructor(private http: HttpClient) { }
  getAllBooking(userId: string): Observable<GetMyBookings[]>{
    return this.http.get<GetMyBookings[]>(`${environment.urlApiMotorVuelos}get-all-bookings?userId=${userId}`);
  }
}
