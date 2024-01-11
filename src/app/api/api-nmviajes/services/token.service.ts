import { Injectable } from '@angular/core';
import { RToken } from '../models/rq-token-ce-request';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
	constructor(private _httpClient: HttpClient,) {}
	
	getAndSaveToken(browser: string): Observable<RToken> {
		const credentials = localStorage.getItem('usuario');
		let req = {
			trackingCode: this.newGuid(),
			muteExceptions: true,
			caller: {
				company: 'Expertia',
				application: 'NMViajes',
				fromIP: '',
				fromBrowser: browser
			},
			webId: 7,
			device: 3,
			userCode: parseInt( credentials ? JSON.parse(credentials).id : '0')
		};

		let url = `${environment.urlApiMotorVuelos}/auth/api/auth/token`;
		return this._httpClient
			.post<RToken>(url, req, {
				headers: {
					ignoreInterceptor: 'true',
					'not-loading': 'true'
				}
			});
	}

	newGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
    //auth/api/auth/meta-token/{transactionId:Guid}/{ipAddress}
	getTokenByTransactionId(transactionId:string, ipAddress:string){
		const api = 'https://motorvuelos.expertiatravel.com';
		let url = `${api}/auth/api/auth/meta-token/${transactionId}/${ipAddress}`;
		return this._httpClient.post<RToken>(url,{});
	}

	public getIPAddress(){
	  return this._httpClient.get<any>("https://api.ipify.org/?format=json");
	}
}