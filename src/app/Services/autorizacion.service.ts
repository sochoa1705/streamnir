import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CloseSession } from '../shared/utils';
import { HttpErrorResponse } from '@angular/common/http';

declare var iError: number;
@Injectable({ providedIn: 'root' })
export class AutorizacionService {
  constructor() {}

  public errorHandl(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error: ${error.status}\nMensaje: ${error.message}`;
    }
    if (error.status === 401) {
      if (localStorage.getItem('errorPmao')) {
        iError = Number(localStorage.getItem('errorPmao'));
        localStorage.setItem('errorPmao', JSON.stringify(iError++));
      } else {
        localStorage.setItem('errorPmao', JSON.stringify(0));
      }
      CloseSession();
    } else if (error.status === 500) {
      // _this.iziToast.show({position: 'center', color: 'red', message: 'Error al procesar la solicitud'});
    }
    console.log(errorMessage);
    return throwError(error);
  }
}
