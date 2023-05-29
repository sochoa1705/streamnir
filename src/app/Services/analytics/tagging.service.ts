import { Injectable } from '@angular/core';
import { routerToCapitalice } from 'src/app/shared/utils';
import {
	ModelTaggingActividades,
	ModelTaggingAddToCart,
	ModelTaggingBuscarSeguros,
	ModelTaggingCheckout,
	ModelTaggingcheckoutOption,
	ModelTaggingDetalleBeneficio,
	ModelTaggingHoteles,
	ModelTaggingLibroReclamaciones,
	ModelTaggingLogin,
	ModelTaggingMostrarResultados,
	ModelTaggingOfertasVuelos,
	ModelTaggingSlidersBanners,
	ModelTaggingSubscripcionOfertas,
	ModelTaggingVuelos,
	ModelTaggingVuelosHoteles, SearchCarRent, SearchFlightHotel,
	SearchFlights, SearchHotels, SearchItineraries, SearchTravelInsurance
} from './tagging.models';

@Injectable({ providedIn: 'root' })
export class TaggingService {


	constructor() { }

	public static triggerTag(datos: any) {
		const dataLayer = (<any>(<any>window)).dataLayer || [];

		// dataLayer.push({
		//   originalLocation: document.location.protocol + '//' +
		//     document.location.hostname +
		//     document.location.pathname +
		//     document.location.search
		// });

		dataLayer.push(datos);

		console.log('dataLayer:')
		console.log(dataLayer)
	}

	public static pageView(url: string) {
		const virtualPageTitle = 'NMV ' + routerToCapitalice(url);
		this.triggerTag({
			event: 'virtualPageView',
			virtualPagePath: url,
			virtualPageTitle: virtualPageTitle
		});
	}

	public static errorService(eCategory: string, eAction: string, eLabel: string) {
		this.triggerTag({
			event: 'nmv.Error',
			eCategory: eCategory,
			eAction: eAction,
			eLabel: eLabel
		});
	}

	public static buscarVuelosHoteles(modelTaggingVuelosHoteles: ModelTaggingVuelosHoteles) {
		this.triggerTag(modelTaggingVuelosHoteles);
	}

	public static buscarHoteles(modelTaggingVuelosHoteles: ModelTaggingHoteles) {
		this.triggerTag(modelTaggingVuelosHoteles);
	}

	public static buscarVuelos(modelTaggingVuelos: ModelTaggingVuelos) {
		this.triggerTag(modelTaggingVuelos);
	}

	public static buscarActividades(modelTaggingActividades: ModelTaggingActividades) {
		this.triggerTag(modelTaggingActividades);
	}

	public static clickSliderBanners(modelTaggingSlidersBanners: ModelTaggingSlidersBanners) {
		this.triggerTag(modelTaggingSlidersBanners.generateTag());
	}

	public static clickOfertaVuelos(modelTaggingOfertasVuelos: ModelTaggingOfertasVuelos) {
		this.triggerTag(modelTaggingOfertasVuelos.generateTag());
	}

	public static tagLoginSignup(modelTaggingLogin: ModelTaggingLogin) {
		this.triggerTag(modelTaggingLogin.generateTag());
	}

	public static tagSubscripcionOfertas(modelTaggingSubscripcionOfertas: ModelTaggingSubscripcionOfertas) {
		this.triggerTag(modelTaggingSubscripcionOfertas);
	}

	public static tagLibroReclamaciones(modelTaggingLibroReclamaciones: ModelTaggingLibroReclamaciones) {
		this.triggerTag(modelTaggingLibroReclamaciones);
	}

	public static tagBuscarSeguros(modelTaggingBuscarSeguros: ModelTaggingBuscarSeguros) {
		this.triggerTag(modelTaggingBuscarSeguros.generateTag());
	}


	public static tagMostrarResultados(modelTaggingMostrarResultados: ModelTaggingMostrarResultados) {
		this.triggerTag(modelTaggingMostrarResultados);
	}

	public static tagCheckoutOption(modelTaggingcheckoutOption: ModelTaggingcheckoutOption) {
		this.triggerTag(modelTaggingcheckoutOption);
	}

	public static tagMostrarDetalleBeneficio(modelTaggingDetalleBeneficio: ModelTaggingDetalleBeneficio) {
		this.triggerTag(modelTaggingDetalleBeneficio);
	}

	public static tagMostrarAddToCart(modelTaggingAddToCart: ModelTaggingAddToCart) {
		this.triggerTag(modelTaggingAddToCart);
	}

	public static tagMostrarCheckout(modelTaggingCheckout: ModelTaggingCheckout) {
		this.triggerTag(modelTaggingCheckout);
	}

	public static tagNationalitySelection(model: any) {
		this.triggerTag(model);
	}

	public static tagStartOfPaymentMethods(model: any) {
		this.triggerTag(model);
	}

	public static tagSelectionOfPaymentMethod(model: any) {
		this.triggerTag(model);
	}

	public static tagStartOfContactData(model: any) {
		this.triggerTag(model);
	}

	public static tagVoucherSelection(model: any) {
		this.triggerTag(model);
	}

	public static tagTransactionCompleted(model: any) {
		this.triggerTag(model);
	}

	public static tagSearchFlights(model: SearchFlights) {
		this.triggerTag(model);
	}

	public static tagSearchFlightHotel(model: SearchFlightHotel) {
		this.triggerTag(model);
	}

	public static tagSearchItineraries(model: SearchItineraries) {
		this.triggerTag(model);
	}

	public static tagSearchTravelInsurance(model: SearchTravelInsurance) {
		this.triggerTag(model);
	}

	public static tagSearchHotels(model: SearchHotels) {
		this.triggerTag(model);
	}

	public static tagSearchCarRent(model: SearchCarRent) {
		this.triggerTag(model);
	}
}
