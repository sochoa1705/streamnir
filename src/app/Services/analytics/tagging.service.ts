import { Injectable } from '@angular/core';
import { routerToCapitalice } from 'src/app/shared/utils';
import {
	ModelTaggingActividades,
	ModelTaggingAddToCart,
	ModelTaggingBuscarSeguros,
	ModelTaggingCheckout,
	ModelTaggingDetalleBeneficio,
	ModelTaggingHoteles,
	ModelTaggingLibroReclamaciones,
	ModelTaggingLogin,
	ModelTaggingMostrarResultados,
	ModelTaggingOfertasVuelos,
	ModelTaggingSlidersBanners,
	ModelTaggingSubscripcionOfertas,
	ModelTaggingVuelos,
	ModelTaggingVuelosHoteles,
	SearchAssemblePackages,
	SearchCarRent,
	SearchExperiences,
	SearchFlightHotel,
	SearchFlights,
	SearchHotels,
	SearchItineraries,
	SearchTravelInsurance,
	TravelInsuranceCheckout,
	TravelInsuranceListResults,
	TravelInsurancePassengerInfo,
	TravelInsurancePaymentMethodSelected,
	TravelInsuranceSelected,
	TravelInsuranceSuccess
} from './tagging.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaggingService {

	constructor() { }

	public static triggerTag(datos: any) {
		const dataLayer = (<any>(<any>window)).dataLayer || [];
		dataLayer.push(datos);

		if (!environment.production)
			console.info('dataLayer', dataLayer);
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

	public static tagTravelInsuranceListResults(model: TravelInsuranceListResults) {
		this.triggerTag(model);
	}

	public static tagTravelInsuranceSelected(model: TravelInsuranceSelected) {
		this.triggerTag(model);
	}

	public static tagTravelInsuranceCheckout(model: TravelInsuranceCheckout) {
		this.triggerTag(model);
	}

	public static tagTravelInsurancePassengerInfo(model: TravelInsurancePassengerInfo) {
		this.triggerTag(model);
	}

	public static tagTravelInsurancePaymentMethodSelected(model: TravelInsurancePaymentMethodSelected) {
		this.triggerTag(model);
	}

	public static tagTravelInsuranceSuccess(model: TravelInsuranceSuccess) {
		this.triggerTag(model);
	}

	public static tagSearchHotels(model: SearchHotels) {
		this.triggerTag(model);
	}

	public static tagSearchCarRent(model: SearchCarRent) {
		this.triggerTag(model);
	}

	public static tagSearchAssemblePackages(model: SearchAssemblePackages) {
		this.triggerTag(model);
	}

	public static tagSearchExperiences(model: SearchExperiences) {
		this.triggerTag(model);
	}

}
