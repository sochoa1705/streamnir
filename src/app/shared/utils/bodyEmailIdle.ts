import { EmailRequestModel } from 'src/app/api/api-nmviajes/models/ce-email-request.model';
import { Segmento } from 'src/app/api/api-nmviajes/models/ce-reenganche-email';
import { GlobalComponent } from '../global';
import { Group, Segment } from 'src/app/api/api-checkout/models/rq-checkout-search';
import moment from 'moment';

export const emailRequestIdle = (email: string, nombres: string, groups: Group[]): EmailRequestModel => {
	const body = {
		Caller: {
			Application: GlobalComponent.appApplication,
			Company: GlobalComponent.appCompany,
			FromIP: '1.1.1.1',
			FromBrowser: detectBrowserName()
		},
		MuteExceptions: true,
		Parameter: {
			To: [email.toUpperCase()],
			Subject: `¡Apúrate! ${groups[0].departure[0].destinationCity.name} espera por ti`,
			Data: {
				Contacto: {
					Nombres: nombres,
					Email: email
				},
				Resultados: groups.map((flight) => {
					return {
						Salidas: flight.departure.map((d) => {
							return {
								FechaSalida: d.departureDate,
								CiudadSalida: d.originCity.name,
								CiudadDestino: d.destinationCity.name,
								Segmentos: d.segments.slice(0, 1).map((s) => getSegmento(s))
							};
						}),
						Retornos: {
							CiudadDestino: flight.returns?.destinationCity?.name || '',
							CiudadSalida: flight.returns?.originCity?.name || '',
							FechaSalida: flight.returns?.departureDate || '',
							Segmentos: flight.returns?.segments ? flight.returns?.segments.slice(0, 1).map((s) => getSegmento(s)) : []
						},
						DesgloseTarifa: flight.pricingInfo.itinTotalFare.fareBreakDowns.map((fare) => {
							return {
								CodigoTipoPasajero: fare.passengerType.code,
								TarifaPasajero: (fare.passengerFare.baseFare * fare.passengerType.quantity).toFixed(2),
								CantidadTipoPasajero: fare.passengerType.quantity
							};
						}),
						TarifaTotal: (flight.detailPricing?.totalPay || 0).toFixed(2),
						TotalImpuestos: (flight.detailPricing?.taxes || 0).toFixed(2),
						TotalCargos:( (flight.detailPricing?.feeNMV || 0) + (flight.detailPricing?.feePTA || 0)).toFixed(2),
						Moneda: 'US$'
					};
				}),
				Url: window.location.href
			}
		},
		TrackingCode: Guid()
	}
	return body;
};

export const detectBrowserName = (): string => {
	const agent = window.navigator.userAgent.toLowerCase();
	switch (true) {
		case agent.indexOf('edge') > -1:
			return 'edge';
		case agent.indexOf('opr') > -1 && !!(<any>window).opr:
			return 'opera';
		case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
			return 'chrome';
		case agent.indexOf('trident') > -1:
			return 'ie';
		case agent.indexOf('firefox') > -1:
			return 'firefox';
		case agent.indexOf('safari') > -1:
			return 'safari';
		default:
			return 'other';
	}
};

export const getSegmento = (segmento: Segment): Segmento => {
	const flightDuration = segmento.flightDuration.split('.');
	return {
		HoraInicio: moment(segmento.startDateTime, "yyyy-MM-dd'T'HH:mm:ss").format('hh:mm a'),
		HoraFin: moment(segmento.endDateTime, "yyyy-MM-dd'T'HH:mm:ss").format('hh:mm a'),
		UrlImagen: segmento.flightSegments[0].marketingAirline.imageUrl || '',
		DuracionVuelo: flightDuration.length > 1 ? `${flightDuration[0]}H ${flightDuration[1]}M` : '00H 00M',
		Escalas: segmento.stops,
		IncluyeEquipajes: orZero(segmento.equipaje?.piezas) > 0
	};
};

export function Guid() {
	return Math.floor(Math.random() * 0x10000).toString(16);
}

export function orZero(value: number | undefined | null): number {
	if (!value) return 0;
	return value;
}
