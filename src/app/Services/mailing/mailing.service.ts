import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MailingService {
	constructor(private http: HttpClient) {}

	createContact(data: any, isNewBoletin = false): Observable<any> {
		const nameArr: string[] = data.name.trim().split(' ');
		let firstname = nameArr[0];
		let lastname = '';
		switch (nameArr.length) {
			case 2:
				lastname = nameArr[1];
				break;
			case 3:
				lastname = `${nameArr[1]} ${nameArr[2]}`;
				break;
			case 4:
				firstname = `${nameArr[0]} ${nameArr[1]}`;
				lastname = `${nameArr[2]} ${nameArr[3]}`;
				break;
		}

		const payload: any = {
			email: data.email,
			attributes: {
				EMAIL: data.email,
				APELLIDOS: !isNewBoletin ? lastname : data.lastname,
				NOMBRE: !isNewBoletin ? firstname : data.name,
				SMS: '',
				TIPO_DOCUMENTO: '',
				NUM_DOCUMENTO: '',
				FUENTE: 'API',
				SEGMENTO_MAILC: '',
				SEGMENTO_MODELO: '',
				SEGMENTO_ADICIONAL: '',
				GENERO: '',
				FECHA_NACIMIENTO: '',
				DESTINO: data.destination || '',
				PRIVACY_POLICY: data.privacyPolicy,
				DATA_POLICY: data.dataPolicy
			},
			emailBlacklisted: false,
			smsBlacklisted: false,
			listIds: [ 33 ],
			updateEnabled: false,
			smtpBlacklistSender: ['5l5on@XCyTwNVlbFYMuZJRtYQifJ.mvm', 'AHzfzNXj0fQ@ogSExyrBXmIaCyjopMPfNgGdxE.siws']
		};

		let url = `${environment.brevoBaseUrl}/contacts`;
		return this.http.post(url, payload, { headers: { 'api-key': environment.brevoApiKey } });
	}
}
