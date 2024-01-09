import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IOpenPayInfoRequest, IOpenPayInfoResponse } from '../models/rq-openpay';

@Injectable({ providedIn: 'root' })
export class PasarelaService {

	constructor(private http: HttpClient) {
	}

	getInfoTypePayment(request: IOpenPayInfoRequest): Observable<IOpenPayInfoResponse> {
		let url = `${environment.urlApiPasarela}Transaction/GetInfoTypePayment?Parameter.Currency=USD&Parameter.Company=${request.Parameter?.Company}&Parameter.Application=${request.Parameter?.Application}&TrackingCode=${request.TrackingCode}&MuteExceptions=${request.MuteExceptions}&Caller.Company=${request.Caller?.Company}&Caller.Application=${request.Caller?.Application}`;
		return this.http.get<IOpenPayInfoResponse>(url, {
			headers: {
				'booking': 'true',
			},
		});
	}
}
