import { AddToCardGtmModel } from 'src/app/Models/analytics-flights/add-to-card-gtm.model';
import { GlobalComponent } from '../global';
import { FlightSearchGtmModel } from 'src/app/Models/analytics-flights/flight-search-gtm.model';

export const getBodyGTMAddCart = (): AddToCardGtmModel => {
	const dataGTMSearch: FlightSearchGtmModel = GlobalComponent.GMTSearch;
    const groupSeleted=GlobalComponent.appGroupSeleted;
	return {
		...dataGTMSearch,
		event: 'nmv_vuelos_seleccionarProducto',
		precio: {
			moneda: 'USD',
			precioNormal: 1000.0,
			precioFinal: 964.0
		},
		origen: {
			nombre: 'Cancún',
			codigo: 'CUN',
			pais: 'Mexico'
		},
		destino: {
			nombre: 'Cusco',
			codigo: 'CUZ',
			pais: 'Peru'
		},
		vuelo: {
			clase: 'economic', //business, first class
			tipo: 'solo ida', // ida y vuelta, multidestino
			equipaje_categoria: 'no incluye equipaje de bodega', // sí incluye equipaje de bodega
			equipaje_label: 'basic economy', // lite, standard, flex, business, business standard, business flex
			group_id: '37fdee5e-0733-4440-805b-04d58c439ca7',
			gds: 'Amadeus',
			escalas: 'directo' // 1 escala, 2 escalas, etc
		},
		ruta: {
			aerolinea_salida: 'LP - LAN Perú',
			aerolinea_regreso: 'AA - American Airlines'
		},
		pasajeros: {
			adultos: 5,
			ninos: 1,
			infantes: 0,
			total: 6
		},
		fechas: {
			salida: '2023-04-10', //Año-mes-día
			retorno: '2023-04-14', //Año-mes-día
			estadia: 3 //número de noches
		}
	};
};
