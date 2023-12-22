import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Packages } from 'src/app/Models/packages/packages.interface';

@Injectable({
	providedIn: 'root'
})
export class PackageService {
	constructor(private _httpClient: HttpClient) {}

	getPackagesHome() {
		let url = `${environment.urlNmviajes}/Theme?Parameter.Active=true&TrackingCode=55b5&MuteExceptions=false&Caller.Company=Agil&Caller.Application=Interagencias`;
		return this._httpClient.get<Packages>(url);
	}
}
