import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay, debounceTime } from 'rxjs/operators';
import { LoadingService } from '../Services/intermediary/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.busy();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.idle();
      })
    )
  }
}