import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../Services/intermediary/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(private loadingService: LoadingService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!request.headers.get('not-loading') || request.headers.get('not-loading')=='false') {
			this.loadingService.busy();
		}
		
		return next.handle(request).pipe(
			finalize(() => {
				this.loadingService.idle();
			})
		);
	}
} 
