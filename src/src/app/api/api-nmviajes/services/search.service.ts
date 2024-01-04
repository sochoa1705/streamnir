import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAvailability, RAvailable } from '../models/rq-search-ce-request';
import { environment } from 'src/environments/environment';
import { GlobalComponent } from 'src/app/shared/global';
import { Observable, from, of } from 'rxjs';
import { ISearchResponse } from '../../api-checkout/models/rq-checkout-search';
import { map, mergeMap } from 'rxjs/operators';
import { IUpSell } from '../../api-checkout/models/rq-checkout-up-sell';
import { IBookingKayak } from '../../api-checkout/models/rq-checkout-kayak';

@Injectable({ providedIn: 'root' })
export class SearchService {
	constructor(private _httpClient: HttpClient) {}

	validateAvailability(): Observable<RAvailable> {
		const request: IAvailability = {
			groupId: GlobalComponent.appGroupSeleted.id,
			segmentSelected: GlobalComponent.segmentSelected,
			gds:GlobalComponent.appGroupSeleted.gds.idGDS
		};
		const headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);

		const endpoint = environment.urlApiMotorVuelos.includes('qa') ? 'validate-availability-nm' : 'validate-availability'

		let url = `${environment.urlApiMotorVuelos}/mv/${endpoint}`;
		return this._httpClient.post<RAvailable>(url, request, { headers });
	}

	/*validateAvailabilityGnral(){
		const request: IAvailability = {
			groupId: GlobalComponent.appGroupSeleted.id,
			segmentSelected: GlobalComponent.segmentSelected,
			gds:GlobalComponent.appGroupSeleted.gds.idGDS
		};
		const headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);

		let url = `${environment.urlApiMotorVuelos}/mv/validate-availability`;
		return this._httpClient.post<RAvailable>(url, request, { headers });
	}*/

	getAllDataGroups(body:any): Observable<ISearchResponse> {
		const url = `${environment.urlApiMotorVuelos}/mv/search`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		return this._httpClient.post<ISearchResponse>(url, body, { headers }).pipe(
			map((response) => {
				GlobalComponent.appExchangeRate=response.exchangeRate;
				GlobalComponent.appResponseGroups=response.groups;
				return response;
			})
		);
	}
/**
 * 
 * @param body 
 * headers: {
        'not-loading': 'true',
      }
 * @returns 
 */
	getAllDataSearch(body:any): Observable<any> {
		const listGDS = Object.values(environment.GDS);
		const endpoint = environment.urlApiMotorVuelos.includes('qa') ? 'search-nm' : 'search'
		const url = `${environment.urlApiMotorVuelos}/mv/${endpoint}`;
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('not-loading', 'true')
			.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		
		return of(...listGDS).pipe(
				mergeMap(gds => this._httpClient.post(url, {...body, gds}, { headers }))
		);
	}

	getUpSellGroup() {
		const endpoint = environment.urlApiMotorVuelos.includes('qa') ? 'up-sell-nm' : 'up-sell'
		const url = `${environment.urlApiMotorVuelos}/mv/${endpoint}`;
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
			totalFare:parseFloat(GlobalComponent.detailPricing.totalPay.toFixed(2)),
			gds:GlobalComponent.appGroupSeleted.gds.idGDS
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

	endSearch(itsIncludeLoader=false){
		const headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('not-loading', itsIncludeLoader ? 'true': 'false')
		.set('Authorization', `Bearer ${GlobalComponent.tokenMotorVuelo}`);
		let url = `${environment.urlApiMotorVuelos}/mv/search-nm-finish`;
		return this._httpClient.post<any>(url,{}, { headers });
	}
    //mv/meta-search/{transactionId:Guid}/{groupId}
	getGroupByTransactionId(transactionId:string,groupId:string ){
		const api = 'https://motorvuelos.expertiatravel.com'
		let url = `${api}/mv/meta-search/${transactionId}/${groupId}`;
		return this._httpClient.get<IBookingKayak>(url);
	}


}
