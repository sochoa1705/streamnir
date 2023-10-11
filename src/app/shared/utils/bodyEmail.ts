import { LstRptaBookingMT, RPurchare } from 'src/app/api/api-checkout/models/rq-checkout-save-booking';
import { GlobalComponent } from '../global';
import moment from 'moment';
import { Segment } from 'src/app/api/api-checkout/models/rq-checkout-search';

//Prepara cuando reciba descuento 
export const getBodyEmail = (purchare: RPurchare, montoTotalDsto: number = 0) => {
	const dataBooking = GlobalComponent.appBooking;
	const groupSeleted = GlobalComponent.appGroupSeleted;
	const segmentDeparture = groupSeleted.returns
		? GlobalComponent.segmentSelected.slice(0, GlobalComponent.segmentSelected.length - 1)
		: GlobalComponent.segmentSelected;

	const dataPricing = GlobalComponent.detailPricing;
	const exchangeRate = GlobalComponent.appExchangeRate;
	let pnrMultiticket = '';

	if (purchare.lstRptaBookingMT && purchare.esMultiticket) {
		purchare.lstRptaBookingMT.forEach((element: LstRptaBookingMT) => {
			pnrMultiticket += pnrMultiticket == '' ? element.pnr : '/' + element.pnr;
		});
	}

	let subject = `Solicitud de Compra Nro. ${purchare.idCotizacion} para ${dataBooking.contact.name} ${dataBooking.contact.lastName}`;

	let messageConfirm = `Tu solicitud de compra ${purchare.idCotizacion} ha sido recibida y está siendo procesada.`;

	const contactos = [
		{
			nombresApellidos: dataBooking.contact.name + ' ' + dataBooking.contact.lastName,
			correoElectronico: dataBooking.contact.email,
			telefonos: '(' + dataBooking.contact.phones[0].countryCode + ') ' + dataBooking.contact.phones[0].phoneNumber
		}
	];

	const pasajeros = dataBooking.passengers.map((item) => {
		return {
			tipoPasajero: item.type,
			nombresApellidos: item.name + ' ' + item.lastName,
			fechaNacimiento: convertToDateDMY(item.birthday),
			numeroSolicitudCompra: purchare.idCotizacion.toString()
		};
	});

	let itinerarios: any = [];
	let flightDetail: Segment[] = [];

	groupSeleted.departure.map((item) => {
		item.segments.map((segment) => {
			if (segmentDeparture.includes(segment.segmentId)) {
				segment.isDeparture=true;
				flightDetail.push(segment);
			}
		});
	});

	if (groupSeleted.returns) {
		const segmentReturn = GlobalComponent.segmentSelected[GlobalComponent.segmentSelected.length - 1];
		groupSeleted.returns.segments.map((segment) => {
			segment.isDeparture=false;
			if (segmentReturn == segment.segmentId) {
				flightDetail.push(segment);
			}
		});
	}

	flightDetail.forEach((item: any) => {
		let vuelos: any[] = [];
		item.flightSegments.forEach((segment: any) => {
			vuelos.push(segment.flightNumber.toString());
		});
		itinerarios.push({
			ciudadOrigen: item.flightSegments[0].departureAirport.name,
			ciudadDestino: item.flightSegments[item.flightSegments.length - 1].arrivalAirport.name,
			duracion: item.flightDuration.split('.')[0] + 'h ' + item.flightDuration.split('.')[1] + 'm',
			fechaSalida: convertToDateFormatString(item.flightSegments[0].departureDateTime),
			fechaLlegada: convertToDateFormatString(item.flightSegments[item.flightSegments.length - 1].arrivalDateTime),
			horaSalida: convertToDateHour(item.flightSegments[0].departureDateTime),
			horaLlegada: convertToDateHour(item.flightSegments[item.flightSegments.length - 1].arrivalDateTime),
			vuelos: vuelos,
			operadorPor: item.flightSegments[0].marketingAirline.name,
			escalas: item.flightSegments.length,
			equipajeMano: GlobalComponent.upSellSeleted ? GlobalComponent.upSellSeleted?.[item.isDeparture ? 'includeHandBagDep':'includeHandBagRet'] || false : item.equipaje?.cabina == 1,
			equipajeBodega: GlobalComponent.upSellSeleted ? GlobalComponent.upSellSeleted?.[item.isDeparture ? 'includeHandBagDep':'includeHandBagRet'] || false : item.equipaje?.piezas == 1,
			adicionales: []
		});
	});

	let sendMailRQ = {
		parameter: {
			to: [dataBooking.contact.email],
			subject,
			data: {
				numeroSolicitudCompra: purchare.idCotizacion.toString(),
				messageConfirm: messageConfirm,
				allowVoid: false,
				agil: false,
				precioFinal: {
					precioDolares:
						'$ ' +
						(
							Number(dataPricing.totalPay) +
							Number(dataBooking.secure?.totalPrice ?? 0) -
							Number(montoTotalDsto)
						).toFixed(2),
					precioSoles:
						'S/. ' +
						(
							(Number(dataPricing.totalPay) + Number(dataBooking.secure?.totalPrice ?? 0) - Number(montoTotalDsto)) *
							Number(exchangeRate.amount)
						).toFixed(2)
				},
				pasajeros,
				itinerario: itinerarios,
				contactos
			}
		}
	};

	return sendMailRQ;
};

export const convertToDateDMY = (date: any) => {
	let newDate = new Date(Date.parse(date));
	return moment(newDate).format('DD/MM/yyyy');
};

export const convertToDateFormatString = (date: any) => {
	let newDate = new Date(Date.parse(date));
	return moment(newDate).format('dddd D MMM');
};

export const convertToDateHour = (date: any) => {
	let newDate = new Date(Date.parse(date));
	return moment(newDate).format('HH:mm a');
};
