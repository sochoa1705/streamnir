import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginPerson } from 'src/app/app.component';
import { ResponseModelT } from 'src/app/shared/models';
import { NmvModel } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

export interface AuthDTO {
  IsSuccess: boolean;
  Message: string;
  Id: number;
  MotherLastname: string;
  FatherLastname: string;
  Firstname: string;
  Status: boolean;
  Email: string;
}

export interface UserStorage {
  email: string;
  name: string;
  id: number;
  image:string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private userLogged = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  saveAccount(payload: any): Observable<any> {
    const url = environment.urlNmviajesAccount + '/v1/api/Account/Signup';
    return this._http.post<any>(url, payload);
  }

  signIn(login: LoginPerson, isPerson: boolean) {
    let payload: any = {};

    const parameter = {
      Username: login.email,
      Password: login.password,
      IsPerson: isPerson,
    };

    const nmvModel = new NmvModel();

    payload = { ...nmvModel.getPayload() };

    payload.parameter = parameter;

    const url = environment.urlNmviajesAccount + '/v1/api/Account/Signin';

    return this._http
      .post<ResponseModelT<AuthDTO>>(url, payload)
      .pipe(map((resp) => resp.Result));
  }

  dispatchLogged(value: boolean) {
    this.userLogged.next(value);
  }

  isLogged() {
    return this.userLogged.asObservable();
  }

  guardarStorage(usuario: AuthDTO, image?:string) {
    const user = {
      email: usuario.Email,
      name: usuario.Firstname + ' ' + usuario.FatherLastname,
      id: usuario.Id,
      image: image || ""
    };

    localStorage.setItem('usuario', JSON.stringify(user));

    this.dispatchLogged(true);
  }

  guardarImage(image:string){
    const user = this.getUserStorage();
    user.image = image;
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  getUserStorage(): UserStorage {
    const userStr: string = localStorage.getItem('usuario') || '';

    return userStr.length > 0 ? JSON.parse(userStr) : '';
  }

  signOut(): void {
    // this.authService.signOut();
    localStorage.removeItem('usuario');

    this.dispatchLogged(false);
  }
}
