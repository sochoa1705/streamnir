import { IValidateBooking } from 'src/app/api/api-checkout/models/rq-checkout-validate-booking';
import { GlobalComponent } from '../global';

export const getBodyValidateBooking = ():IValidateBooking => {
	const dataBooking = GlobalComponent.appBooking;
	const groupSeleted = GlobalComponent.appGroupSeleted;
	let pasajeros: any[] = [];
	dataBooking.passengers.forEach((item: any) => {
		pasajeros.push({
			nombre: item.name,
			apellido: item.lastName,
			numeroDocumento: item.documentNumber,
			tipoDocumento: item.documentType == 0 ? 'DNI' : item.documentType == 1 ? 'CEX' : 'PSP'
		});
	});

	let rutaBusqueda = '';
	let fechasMulticity = '';
	let segmentos = [];
	if (groupSeleted.departure.length > 1) {
		groupSeleted.departure.forEach((item: any) => {
			rutaBusqueda +=
				rutaBusqueda == ''
					? item.originCity.code + ',' + item.destinationCity.code
					: ';' + item.originCity.code + ',' + item.destinationCity.code;
			segmentos.push({
				ciudadOrigen: item.originCity.code,
				ciudadDestino: item.destinationCity.code
			});
			fechasMulticity +=
				fechasMulticity == '' ? item.departureDate.replace(/-/g, '/') : ';' + item.departureDate.replace(/-/g, '/');
		});
	} else {
		rutaBusqueda = groupSeleted.departure[0].originCity.code + ',' + groupSeleted.departure[0].destinationCity.code;
		segmentos.push({
			ciudadOrigen: groupSeleted.departure[0].originCity.code,
			ciudadDestino: groupSeleted.departure[0].destinationCity.code
		});
	}

	return {
		idWeb: 7,
		idLang: 1,
		orientacion: groupSeleted.returns ? 0 : groupSeleted.departure.length == 1 ? 1 : 2,
		rutaBusqueda: rutaBusqueda,
		fechaSalida: groupSeleted.departure[0].departureDate.replace(/-/g, '/'),
		fechaRetorno: groupSeleted.returns
			? groupSeleted.returns.departureDate.replace(/-/g, '/')
			: groupSeleted.departure[0].departureDate.replace(/-/g, '/'),
		fechasMulticity: fechasMulticity,
		esRutaNacional: GlobalComponent.isDomestic,
		idLogSearch: 1,
		pasajeros: pasajeros,
		segmentos: segmentos,
		lineaValidadora: groupSeleted.departure[0].segments[0].flightSegments[0].operatingAirline.code
	};
};
