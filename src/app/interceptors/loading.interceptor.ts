import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../Services/intermediary/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(private loadingService: LoadingService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!request.url.includes('search-nm') && !request.url.includes('promotional')) {
			this.loadingService.busy();
		} else {
			if (request.url.includes('search-nm')) {
				if (this.loadingService.requestSearchCount <= 6) this.loadingService.busy();

				this.loadingService.requestSearchCount =
					this.loadingService.requestSearchCount === 8 ? 0 : this.loadingService.requestSearchCount + 1;
			}
		}

		return next.handle(request).pipe(
			finalize(() => {
				this.loadingService.idle();
			})
		);
	}
}
