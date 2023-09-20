import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SendTusDatosRequest, SendTusDatosResponse } from '../../Models/tus-datos/send-tus-datos.interface';
import { GetTusDatos } from '../../Models/tus-datos/get-tus-datos.interface';

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
		return this.http.post<GetTusDatos>(url, body);
	}

	sendClientData(model: SendTusDatosRequest) {
		const url = `${environment.urlMeta}/tusdatoscp`;

		const formData = new FormData();
		model.passengers.forEach((passenger, index) => {
			const detailsIndex = `DetallesRegistrosSIT[${index}]`;
			formData.append(`${detailsIndex}.Idpersona`, '');
			formData.append(`${detailsIndex}.TipoDocumento`, passenger.docType);
			formData.append(`${detailsIndex}.NumDocumento`, passenger.docNumber);
			formData.append(`${detailsIndex}.Nombres`, passenger.names);
			formData.append(`${detailsIndex}.ApePaterno`, passenger.lastName);
			formData.append(`${detailsIndex}.ApeMaterno`, passenger.mLastName);
			formData.append(`${detailsIndex}.Email`, passenger.email);
			formData.append(`${detailsIndex}.Nacionalidad`, 'PE');
			formData.append(`${detailsIndex}.FechaNacimiento`, passenger.birthDate);
			formData.append(`${detailsIndex}.Genero`, '1');
			formData.append(`${detailsIndex}.Direccion`, 'Placeholder');
			formData.append(`${detailsIndex}.Telefono`, passenger.phone);
			formData.append(`${detailsIndex}.Distrito`, 'Placeholder');
		});
		formData.append('idCampania', '');
		formData.append('IdDiaCampania', '1');
		formData.append('diacampania', '');
		formData.append('idHorario', '1');
		formData.append('horario', '');
		formData.append('idMedio', model.idMedium.toString());
		formData.append('medio', model.idMedium.toString());
		formData.append('otroMedio', '');
		formData.append('idTienda', model.idStore.toString());
		formData.append('tienda', model.idStore.toString());
		formData.append('cbx_ProteccionDatos', model.privacyPolicy.toString());
		formData.append('cbx_DatosPer', model.dataPolicy.toString());
		formData.append('X-Requested-With', 'XMLHttpRequest');

		return this.http.post<SendTusDatosResponse>(url, formData);
	}
}
