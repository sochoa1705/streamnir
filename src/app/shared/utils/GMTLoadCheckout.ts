import { AddToCardGtmModel, Vuelo } from 'src/app/Models/analytics-flights/add-to-card-gtm.model';
import { GlobalComponent } from '../global';
import { FlightSearchGtmModel } from 'src/app/Models/analytics-flights/flight-search-gtm.model';
import { getGdsName } from './gds.utils';

export const getBodyGTMLoadCheckout = (): AddToCardGtmModel => {
	const dataGTMSearch: FlightSearchGtmModel = GlobalComponent.GMTSearch;
    const groupSelected=GlobalComponent.appGroupSeleted;
	const upSellSeleted=GlobalComponent.upSellSeleted;
	const priceNormal=Number((groupSelected.detailPricing?.totalPay)?.toFixed(2)) || 0;

	return {
		...dataGTMSearch,
		event: 'nmv_vuelos_checkout_cargarCheckout',
		precio: {
			moneda: 'USD',
			precioNormal: priceNormal,
			precioFinal: Number((upSellSeleted?.totalPay)?.toFixed(2)) || priceNormal
		},
		vuelo: {
			clase: dataGTMSearch.vuelo.clase, //business, first class
			tipo:  dataGTMSearch.vuelo.tipo, // ida y vuelta, multidestino
			equipaje_categoria: groupSelected.typeBag=='holdbag' ? 'sí incluye equipaje de bodega': 'no incluye equipaje de bodega', // sí incluye equipaje de bodega
			equipaje_label: upSellSeleted?.description || '',
			group_id: groupSelected.id,
			gds: getGdsName(groupSelected.gds.idGDS),
			escalas: groupSelected.departure[0].segments[0].stops === 0 ? 'Directo' : `${groupSelected.departure[0].segments[0].stops} escala`
		},
		ruta: {
			aerolinea_salida: groupSelected.departure[0].segments[0].flightSegments[0].marketingAirline.code || '',
			aerolinea_regreso: groupSelected.returns?.segments[0].flightSegments[0].marketingAirline.code || ''
		}
	};
};
