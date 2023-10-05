import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerToCapitalice } from '../shared/utils';

interface IBodyResponse {
  Result: {
    Id: number;
    IsSuccess: boolean;
    Message: string;
    Status: boolean;
  };
  State: { ok: boolean };
  TrackingCode: string;
}

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }
  generateErrorCategory(url: string, method: string, status: number) {
    return (
      'Error: ' + this.generateCategory(url) + ' - ' + method + ':' + status
    );
  }

  generateCategory(url: string) {
    const category = url.split('?')[0].split('v1/api')[1];

    return category ? routerToCapitalice(category) : '';
  }
}
