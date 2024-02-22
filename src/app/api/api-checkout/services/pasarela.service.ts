import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IOpenPayInfoRequest, IOpenPayInfoResponse } from '../models/rq-openpay';
import { map } from 'rxjs/operators';
import { IDiscountResult, IOpenPayDiscountRequest } from '../models/rq-openpay-discount';

@Injectable({ providedIn: 'root' })
export class PasarelaService {

	private static binLength = 6;

	constructor(private http: HttpClient) {
	}

	getInfoTypePayment(request: IOpenPayInfoRequest): Observable<IOpenPayInfoResponse> {
		let url = `${environment.urlApiPasarela}Transaction/GetInfoTypePayment?Parameter.Currency=USD&Parameter.Company=${request.Parameter?.Company}&Parameter.Application=${request.Parameter?.Application}&TrackingCode=${request.TrackingCode}&MuteExceptions=${request.MuteExceptions}&Caller.Company=${request.Caller?.Company}&Caller.Application=${request.Caller?.Application}`;
		return this.http.get<IOpenPayInfoResponse>(url, { headers: { 'booking': 'true' } });
	}

	getDiscount(request: IOpenPayDiscountRequest): Observable<IDiscountResult | null> {
		const bin = request.Parameter?.Bin;
		if (bin && bin.length === PasarelaService.binLength) {
			const url = `${environment.urlApiPasarela}Discount?Parameter.Bin=${request.Parameter?.Bin}&Parameter.TypeOfOperation=${request.Parameter?.TypeOfOperation}&Parameter.Amount=${request.Parameter?.Amount}&Parameter.Destination=${request.Parameter?.Destination}&Parameter.SourceId=${request.Parameter?.SourceId}&Parameter.AirlineId=${request.Parameter?.AirlineId}&Parameter.FlightClass=${request.Parameter?.FlightClass}&Parameter.FareBasis=${request.Parameter?.FareBasis}&TrackingCode=${request.TrackingCode}&MuteExceptions=${request.MuteExceptions}&Caller.Company=${request.Caller?.Company}&Caller.Application=${request.Caller?.Application}`;
			return this.http.get<IDiscountResult>(url)
					.pipe(
							map((res: any) => {
								return res.Result;
							})
					);
		}
		return of(null);
	}
}
