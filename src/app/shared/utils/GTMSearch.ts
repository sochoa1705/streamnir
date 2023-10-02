import moment from "moment";
import { GlobalComponent } from "../global";

export const getBodyGTMSearch = () => {
  const data=GlobalComponent.GTMSearchData;
  const typeFlight=GlobalComponent.paramsSearch.flightType;
  const transactionId = GlobalComponent.transactionId;
  const origin = data.departureLocation?.split('%20');
  const arrival = data.arrivalLocation?.split('%20');

    return {
        event: "nmv_vuelos_buscar",
        operacion:{
          id:transactionId,
          dias_anticipacion: moment(data.departureDate, 'DD/MM/YYYY').diff(moment(), 'days'), //
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
          tipo: typeFlight== 0 ? 'ida y vuelta': typeFlight == 1 ? 'ida' : 'multidestino',
        },
        pasajeros: {
          adultos: data.adults,
          ninos: data.children,
          infantes: data.infants,
          total: data.adults + data.children + data.infants,
        },
        fechas: {
          salida: convertDateDDMMYYY(data.departureDate || ''), //Año-mes-día
          retorno:  convertDateDDMMYYY(data.arrivalDate || ''), //Año-mes-día
          estadia: typeFlight == 0 ? moment(data.arrivalDate, 'DD/MM/YYYY').diff(moment(data.departureDate, 'DD/MM/YYYY'), 'days') : 0, //número de noches
        },
      }
}

export const convertDateDDMMYYY=(date:string)=>{
  const splitDate=date.split('/');
  if(date!=='') return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
  return date
}
