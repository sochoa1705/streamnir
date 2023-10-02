import { FlightSearchGtmModel } from 'src/app/Models/analytics-flights/flight-search-gtm.model';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { Resultado, ResultadosGtmModel } from 'src/app/Models/analytics-flights/resultados-gtm.model';
import { getGdsName } from './gds.utils';
import { GlobalComponent } from '../global';

export const getBodyGTMSearchResult = (results: Group[]): ResultadosGtmModel => {
    const dataGTMSearch:FlightSearchGtmModel=GlobalComponent.GMTSearch;
	return {
		...dataGTMSearch,
		event: 'nmv_vuelos_verResultados',
		precio: {
			moneda: 'USD'
		},
		resultados: results.length > 1 ? convertGroupToResult(results):[]
	};
};

export const convertGroupToResult=( results: Group[]):Resultado[]=>{
    return results.map((flight: Group, index: number):Resultado => {
            return {
              posicion: (++index).toString(),
              precioFinal: Number((flight.detailPricing?.totalPay || 0).toFixed(2)),
              gds: getGdsName(flight.gds.idGDS),
              group_id: flight.id,
              aerolinea_salida: flight.departure[0].segments[0].flightSegments[0].marketingAirline.code || '',
              aerolinea_regreso: flight.returns?.segments[0].flightSegments[0].marketingAirline.code || '',
              equipaje_categoria: flight.typeBag=='holdbag' ? 'sí incluye equipaje de bodega': 'no incluye equipaje de bodega',
              escalas: flight.departure[0].segments[0].stops === 0 ? 'Directo' :
                `${flight.departure[0].segments[0].stops} escala`
            }
    })
}


