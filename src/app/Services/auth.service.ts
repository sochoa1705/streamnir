import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NmvModel } from '../shared/utils';
import { Login } from '../app.component';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private httpClient: HttpClient) { }
    
    

    signIn(login:Login){

        let payload:any = {};
    
        const parameter = {
            Username: login.email,
            Password: login.password,
            IsPerson: !login.business,
        };

        payload = {...new NmvModel()}

        payload.parameter = parameter;
    
        const url = environment.urlNmviajes + '/Airline/IataCode';
    
        // return this.httpClient
        //   .get<ResponseModelT<IAerolineaInf>>(url, options)
        //   .pipe(map((resp) => resp.Result));
    }

}