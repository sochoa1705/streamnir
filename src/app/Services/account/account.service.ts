import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/app.component';
import { ResponseModelT } from 'src/app/shared/models';
import { NmvModel } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

export interface AuthDTO {
  IsSuccess:      boolean;
  Message:        string;
  Id:             number;
  MotherLastname: string;
  FatherLastname: string;
  Firstname:      string;
  Status:         boolean;
  Email:          string;
}

export interface UserStorage{
  email:string,
  name: string,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  saveAccount(payload: any): Observable<any> {

    const url = environment.urlNmviajesAccount + '/Account/Signup';

    return this.http.post<any>(url, payload);
  }



    signIn(login:Login){

        let payload:any = {};
    
        const parameter = {
            Username: login.email,
            Password: login.password,
            IsPerson: !login.business,
        };

        const nmvModel = new NmvModel();

        payload = {...nmvModel.getPayload()}

        payload.parameter = parameter;
    
        const url = environment.urlNmviajesAccount + '/Account/Signin';
    
        return this.http
          .post<ResponseModelT<AuthDTO>>(url,payload)
          .pipe(map((resp) => resp.Result));
    }

    dispatchLogged(value:boolean){
      this.userLogged.next(value)
    }

    isLogged(){
      return this.userLogged.asObservable();
    }


    guardarStorage(usuario:AuthDTO){
      const user = {
        email:usuario.Email,
        name: usuario.Firstname + ' '+ usuario.FatherLastname,
        id: usuario.Id
      }

      localStorage.setItem('usuario', JSON.stringify(user));

      this.dispatchLogged(true);
    }
    
    
    getUserStorage():UserStorage{
      const userStr:string = localStorage.getItem('usuario') || '';

      return userStr.length>0?JSON.parse(userStr):'';
    }

    signOut(): void {
      // this.authService.signOut();
      localStorage.removeItem('usuario');

      this.dispatchLogged(false);
    }


}


