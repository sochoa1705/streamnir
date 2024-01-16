import { HttpParams } from "@angular/common/http";
import moment from "moment";
import { SaveSearchRequest } from "src/app/api/api-nmviajes/models/rq-save-search-request";

export const emailRequestSaveSearch = (email: string, nombres: string): SaveSearchRequest => {
    const latestParams = new HttpParams({
        fromString: `?${location.href.split('?')[1]}`,
      });
      const request = {
        names:nombres,
        email: email,
        flightType: parseInt(latestParams.get('flightType') || '0'),
        flights: latestParams.get('flightType') !== '2' ? [
          {
            departureLocation: latestParams.get('departureLocation') || '',
            departureDate: latestParams.get('departureDate') ?
              moment(latestParams.get('departureDate'), 'DD/MM/YYYY').format('YYYY-MM-DD') : '',
            arrivalLocation: latestParams.get('arrivalLocation') || '',
            arrivalDate: latestParams.get('arrivalDate') ?
              moment(latestParams.get('arrivalDate'), 'DD/MM/YYYY').format('YYYY-MM-DD') : ''
          }
        ] : (JSON.parse(latestParams.get('json') || '') as any[]).map(value => {
          return {
            departureLocation: value.departureLocation || '',
            departureDate: moment(value.departureDate, 'DD/MM/YYYY').format('YYYY-MM-DD') || '',
            arrivalLocation: value.arrivalLocation || '',
            arrivalDate: null
          }
        }),
        adults: parseInt(latestParams.get('adults') || '0'),
        children: parseInt(latestParams.get('children') || '0'),
        infants: parseInt(latestParams.get('infants') || '0'),
        currency: 'USD',
        flightClass: parseInt(latestParams.get('flightClass') || '0'),
        filtros: {
          aerolineas: latestParams.get('airlines') || '',
          equipaje: `${!!latestParams.get('handLuggage') ? 'mano' : ''}-${!!latestParams.get('cabinLuggage') ? 'bodega' : ''}`,
          escalas: `${!!latestParams.get('nonStop') ? 'directo' : ''}-${!!latestParams.get('oneStop') ? 'uno' : ''}-${!!latestParams.get('multipleStops') ? 'mas' : ''}`,
          maxPrice: parseInt(latestParams.get('maxPrice') || '0'),
          minPrice: parseInt(latestParams.get('minPrice') || '0')
        }
      };

      return request;
}