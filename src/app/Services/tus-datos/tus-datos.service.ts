import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TusDatosService {

	constructor(private http: HttpClient) {
	}

	search(docType: string, docNumber: string) {
		const url = `${environment.urlMeta}/PreRegistroSIT/Buscar`;
		const body = {
			TipoDocumento: docType,
			NumDocumento: docNumber
		};
		return this.http.post<any>(url, body);
	}
}
