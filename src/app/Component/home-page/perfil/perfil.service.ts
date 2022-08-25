import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'src/app/shared/utils';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PerfilService{
  constructor(private http: HttpClient) {  }
  generarToken(email: string){
    var url = `${environment.urlZonaPrivada}/v1/api/Account/token?Parameter.email=${email}&TrackingCode=${Guid()}&MuteExceptions=true&Caller.Company=Expertia&Caller.Application=NMViajes`;
    return this.http.get(url);
  }
}
