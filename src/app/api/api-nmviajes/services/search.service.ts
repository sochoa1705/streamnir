import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAvailability, RAvailable } from '../models/rq-search-ce-request';
import { environment } from 'src/environments/environment';
import { GlobalComponent } from 'src/app/shared/global';
import { Observable } from 'rxjs';
import { ISearchResponse } from '../../api-checkout/models/rq-checkout-search';
import { map } from 'rxjs/operators';
import { IUpSell } from '../../api-checkout/models/rq-checkout-up-sell';
import { getPricingFareBreakDowns } from 'src/app/shared/utils/fareBreakDowns';


@Injectable({ providedIn: 'root' })
export class SearchService {
	constructor(private _httpClient: HttpClient) {}

	validateAvailability(): Observable<RAvailable> {
		const request: IAvailability = {
			groupId: GlobalComponent.appGroupSeleted.id,
			segmentSelected: GlobalComponent.segmentSelected
		};
		let url = `${environment.urlApiMotorVuelos}validate-availability`;
		return this._httpClient.post<RAvailable>(url, request);
	}

	getDataGroups(): Observable<ISearchResponse> {
		const url = 'https://f8f4c705-533a-4658-b661-f3c2df4ecf96.mock.pstmn.io/groups';
		return this._httpClient.get<ISearchResponse>(url).pipe(
			map((response) => {
				response.groups.sort( (a,b) => a.sequenceNumber - b.sequenceNumber );
				GlobalComponent.appResponseGroups = response.groups;
				GlobalComponent.appGroupSeleted = response.groups[response.indexGroup || 0];
				GlobalComponent.appExchangeRate = response.exchangeRate;
				const groupSelect = GlobalComponent.appGroupSeleted;
				getPricingFareBreakDowns(groupSelect.pricingInfo.itinTotalFare.fareBreakDowns);
				const segment =
					groupSelect.departure.length > 1
						? new Array(groupSelect.departure.length).fill(0)
						: groupSelect.returns
						? [0, 0]
						: [0];
				GlobalComponent.segmentSelected = segment;
				return response;
			})
		);
	}

	getAllDataGroups(body:any): Observable<ISearchResponse> {
		const url = 'https://motorvuelos.expertiatravel.com/mv/search';
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

	getUpSellGroup() {
		const url = 'https://motorvuelos.expertiatravel.com/mv/up-sell';
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
