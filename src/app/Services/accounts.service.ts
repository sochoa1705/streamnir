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

  private userConfirmate = new BehaviorSubject<boolean>(false);

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


  confirmationAccount(UserId: string) {
    let payload: any = {};

    const parameter = {
      UserId
    };

    const nmvModel = new NmvModel();

    payload = { ...nmvModel.getPayload(), parameter };

    const url = environment.urlNmviajesAccount + '/v1/api/Account/Confirmation';

    return this._http
      .put<ResponseModelT<any>>(url, payload)
      .pipe(map((resp) => resp.Result));
  }

  dispatchLogged(value: boolean) {
    this.userLogged.next(value);
  }

  dispatchConfirmate(value: boolean) {
    this.userConfirmate.next(value);
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


  deleteAccount(Id: number) {
    let payload: any = {};

    const parameter = {
      Id
    };

    const nmvModel = new NmvModel();

    payload = { ...nmvModel.getPayload(), parameter };

    const url = environment.urlNmviajesAccount + '/v1/api/Account';

    return this._http
      .delete<ResponseModelT<any>>(url,{body:payload})
      .pipe(map((resp) => resp.Result));
  }


  passwordSend(Email:string){
    let payload: any = {};

    const parameter = {
      Email
    };

    const nmvModel = new NmvModel();

    payload = { ...nmvModel.getPayload(), parameter };

    const url = environment.urlNmviajesAccount + '/v1/api/Account/PasswordSend';

    return this._http
      .post<ResponseModelT<any>>(url, payload)
      .pipe(map((resp) => resp.Result));
  }
}
