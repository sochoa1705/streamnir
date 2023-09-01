import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TaggingService } from '../Services/analytics/tagging.service';
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
      tap((resp) => this.getErrorHttp200(resp, req)),
      catchError((error) => {
        //this.getErrorHttpResponse(error, req);
        return throwError(error.error);
      })
    );
  }

  getErrorHttp200(resp: HttpEvent<IBodyResponse>, req: HttpRequest<any>) {
    if (resp instanceof HttpResponse) {
      if (!resp.ok || !resp.body) {
        TaggingService.errorService(
            this.generateErrorCategory(req.url, req.method, resp.status),
            resp?.body?.Result?.Message || 'Error Genérico',
            req.url
        );
      }
    }
  }

  getErrorHttpResponse(resp: HttpErrorResponse, req: HttpRequest<any>) {
    TaggingService.errorService(
        this.generateErrorCategory(req.url, req.method, resp.status),
        resp?.error.State.Messages[0].Value || resp.name,
        req.url
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
