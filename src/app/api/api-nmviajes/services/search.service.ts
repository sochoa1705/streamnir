import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAvailability, RAvailable } from '../models/rq-search-ce-request';
import { environment } from 'src/environments/environment';
import { GlobalComponent } from 'src/app/shared/global';
import { Observable, of } from 'rxjs';
import { ISearchResponse } from '../../api-checkout/models/rq-checkout-search';
import { map, mergeMap } from 'rxjs/operators';
import { IUpSell } from '../../api-checkout/models/rq-checkout-up-sell';

@Injectable({ providedIn: 'root' })
export class SearchService {
	constructor(private _httpClient: HttpClient) {}

	validateAvailability(): Observable<RAvailable> {
		const request: IAvailability = {
			groupId: GlobalComponent.appGroupSeleted.id,
			segmentSelected: GlobalComponent.segmentSelected
		};
		const headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);

		let url = `${environment.urlApiMotorVuelos}/mv/validate-availability`;
		return this._httpClient.post<RAvailable>(url, request, { headers });
	}

	getAllDataGroups(body:any): Observable<ISearchResponse> {
		const url = `${environment.urlApiMotorVuelos}/mv/search`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<ISearchResponse>(url, body, { headers }).pipe(
			map((response) => {
				response.groups.sort( (a,b) => a.sequenceNumber - b.sequenceNumber );
				GlobalComponent.appExchangeRate=response.exchangeRate;
				GlobalComponent.appResponseGroups=response.groups;
				return response;
			})
		);
	}

	getAllDataSearch(body:any, searchId:string): Observable<any> {
		const listGDS = Object.values(environment.GDS);
		const endpoint = environment.urlApiMotorVuelos.includes('qa') ? 'search-nm' : 'search'
		const url = `${environment.urlApiMotorVuelos}/mv/${endpoint}`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		
		return of(...listGDS).pipe(
				mergeMap(gds => this._httpClient.post(url, {...body, gds, searchId}, { headers }))
		);
	}

	getUpSellGroup() {
		const url = `${environment.urlApiMotorVuelos}/mv/up-sell`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		const group = GlobalComponent.appGroupSeleted;
		const credentials = localStorage.getItem('usuario');
	
		const payload = {
			group,
			groupId: group.id,
			segmentSelected: GlobalComponent.segmentSelected,
			brandedFareName: '',
			exchangeRate: GlobalComponent.appExchangeRate,
			email: credentials ? JSON.parse(credentials).email : '',
			totalFare:parseFloat(GlobalComponent.detailPricing.totalPay.toFixed(2))
		};
		return this._httpClient.post<IUpSell[]>(url, payload, { headers }).pipe(
			map((response) => {
				if(response.length >= 1){
					GlobalComponent.upSellGroup=response
					GlobalComponent.upSellSeleted=response[0]
					GlobalComponent.appBooking.brandedFareName=response[0].name;
				}
				return response;
			})
		);
	}

}
