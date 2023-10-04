import moment from "moment";
import { GlobalComponent } from "../global";
import { FlightSearchGtmModel } from "src/app/Models/analytics-flights/flight-search-gtm.model";

export const getBodyGTMSearch = ():FlightSearchGtmModel => {
  const data=GlobalComponent.searchFlightParams;
  const origin = data.departureLocation?.split(' ');
  const arrival = data.arrivalLocation?.split(' ');
    return {
        event: "nmv_vuelos_buscar",
        operacion:{
          dias_anticipacion: moment(data.departureDate, 'YYYY-MM-DD').diff(moment(), 'days'), //
        },
        origen: {
          nombre: origin ? origin[1].slice(0, -1) : '',
          codigo: origin ? origin[0] : '',
          pais: origin ? origin[2] : '',
        },
        destino: {
          nombre: arrival ? arrival[1].slice(0, -1) : '',
          codigo: arrival ? arrival[0] : '',
          pais: arrival ? arrival[2] : '',
        },
        vuelo: {
          clase: data.flightClass == 0 ? 'economic' :  data.flightClass == 1 ? 'business' : 'first class', 
          tipo: data.flightType== 0 ? 'ida y vuelta': data.flightType == 1 ? 'ida' : 'multidestino',
        },
        pasajeros: {
          adultos: data.adults,
          ninos: data.children,
          infantes: data.infants,
          total: data.adults + data.children + data.infants,
        },
        fechas: {
          salida: data.departureDate || '', //Año-mes-día
          retorno:  data.arrivalDate || '', //Año-mes-día
          estadia: data.flightType == 0 ? moment(data.arrivalDate, 'YYYY-MM-DD').diff(moment(data.departureDate, 'YYYY-MM-DD'), 'days') : 0, //número de noches
        },
      }
}
