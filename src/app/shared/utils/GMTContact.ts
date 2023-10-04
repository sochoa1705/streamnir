import { GlobalComponent } from '../global';
import { getGdsName } from './gds.utils';
import { ContactGtmModel } from 'src/app/Models/analytics-flights/contact-gtm.model';

export const getBodyGTMContact = (): ContactGtmModel => {
	const dataGTMSearch = GlobalComponent.GMTSearch;
    const groupSelected=GlobalComponent.appGroupSeleted;
	const priceNormal=Number((groupSelected.detailPricing?.totalPay)?.toFixed(2)) || 0;
    const upSellSeleted=GlobalComponent.upSellSeleted;
    const dataBooking = GlobalComponent.appBooking;
    const {origen, destino, pasajeros, fechas} = dataGTMSearch;
    const departure = groupSelected.departure[0].segments[0];
    const returns = groupSelected.returns?.segments[0] || '';
	return {
        event: 'nmv_vuelos_checkout_ingresarDatos',
		precio: {
			moneda: 'USD',
			precioNormal: priceNormal,
			precioFinal:  Number((upSellSeleted?.totalPay || 0)?.toFixed(2)) || priceNormal,
		},
		vuelo: {
			clase: dataGTMSearch.vuelo.clase, //business, first class
			tipo:  dataGTMSearch.vuelo.tipo, // ida y vuelta, multidestino
			equipaje_categoria: groupSelected.typeBag=='holdbag' ? 'sí incluye equipaje de bodega': 'no incluye equipaje de bodega', // sí incluye equipaje de bodega
			equipaje_label: upSellSeleted?.description || '',
			group_id: groupSelected.id,
			gds: getGdsName(groupSelected.gds.idGDS),
			escalas: departure.stops === 0 ? 'directo' : `${departure.stops} escala`
		},
		ruta: {
			aerolinea_salida: `${departure.flightSegments[0].marketingAirline.code} - ${departure.flightSegments[0].marketingAirline.name}`  || '',
			aerolinea_regreso: returns!=='' ? `${returns.flightSegments[0].marketingAirline.code} - ${returns.flightSegments[0].marketingAirline.name}` : ''
		},
        usuario:{
            email:dataBooking.contact.email,
            primerNombre:dataBooking.contact.name,
            primerApellido:dataBooking.contact.lastName,
            fechaNacimiento:dataBooking.passengers[0].birthday.slice(0, 10), //Año-mes-día
            nacionalidad:searchCountryName(dataBooking.passengers[0].nationality),
            genero: dataBooking.passengers[0].gender == 'M' ? 'masculino' : 'femenino',
            documento_tipo:dataBooking.passengers[0].documentType == 0 ? 'DNI ' :dataBooking.passengers[0].documentType == 1 ? 'CE ': 'PAS ',
            documento_numero:dataBooking.passengers[0].documentNumber,
            telefono_tipo:"celular",
            telefono_codigo:dataBooking.contact.phones[0].countryCode,
            telefono_numero:dataBooking.contact.phones[0].phoneNumber,
            frecuencia:"", //no esta contemplado este campo en esta version - pasajero-frecuente - primera-reserva
        },
        origen,
        destino,
        pasajeros,
        fechas,
	};
};

export const searchCountryName=(code:string):string=>{
    const textNationality = GlobalComponent.listCountries.find(item=>item.code==code)?.name || code;
    return textNationality; 
}