import * as moment from 'moment';
import { generateLabelTag } from 'src/app/shared/utils';

export class ModelTaggingVuelosHoteles {
	constructor(
			public nombre: string | number,
			public origen: string | number,
			public destino: string | number,
			public clase: string | number,
			public numPasajeros: string | number,
			public adultos: string | number,
			public ninos: string | number,
			public infantes: string | number,
			public habitaciones: string | number,
			public fechaSalida: string | number,
			public fechaRegreso: string | number,
			public diasAnticipacion: string | number,
			public duracionViaje: string | number,
			public eLabel: string | number = generateLabelTag(),
			public eCategory: string | number = 'Vertical Vuelos + Hoteles',
			public eAction: string | number = 'Buscar V+H',
			public event: string | number = 'nmv.vuelosHoteles_ga_buscar'
	) { }
}

export class ModelTaggingHoteles {
	constructor(
			public nombre: string | number,
			public destino: string | number,
			public numPasajeros: string | number,
			public adultos: string | number,
			public ninos: string | number,
			public infantes: string | number,
			public habitaciones: string | number,
			public fechaSalida: string | number,
			public fechaRegreso: string | number,
			public diasAnticipacion: string | number,
			public duracionViaje: string | number,
			public eLabel = generateLabelTag(),
			public eCategory = 'Vertical Hoteles',
			public eAction = 'Buscar Hoteles',
			public event = 'nmv.hoteles_ga_buscar'
	) { }
}

export class ModelTaggingVuelos {
	constructor(
			public nombre: number | string,
			public origen: number | string,
			public destino: number | string,
			public clase: string,
			public tipo: number | string,
			public numPasajeros: number | string,
			public adultos: number | string,
			public ninos: number | string,
			public infantes: number | string,
			public habitaciones: number | string,
			public fechaSalida: number | string,
			public fechaRegreso: number | string,
			public diasAnticipacion: number | string,
			public duracionViaje: number | string,
			public eLabel = generateLabelTag(),
			public eCategory = 'Vertical Vuelos',
			public eAction = 'Buscar Vuelos',
			public event = 'nmv.vuelos_ga_buscar'
	) { }
}

export class ModelTaggingActividades {
	constructor(
			public nombre: string | number,
			public destino: string | number,
			public numPasajeros: string | number,
			public adultos: string | number,
			public ninos: string | number,
			public infantes: string | number,
			public habitaciones: string | number,
			public fechaSalida: string | number,
			public fechaRegreso: string | number,
			public diasAnticipacion: string | number,
			public duracionViaje: string | number,
			public eLabel = generateLabelTag(),
			public eCategory = 'Vertical Actividades',
			public eAction = 'Buscar Actividades',
			public event = 'nmv.actividades_ga_buscar'
	) { }
}

export class ModelTaggingSlidersBanners {
	constructor(
			public src: string,
			public title: string,
			public nombre: 'Slider Principal' | 'Banner Principal',
			public position: string
	) { }

	generateTag() {
		return {
			event: 'nmv.promos_eecga3_promosDestacadas',
			ecommerce: {
				promoClick: {
					promotions: [
						{
							id: this.src,
							name: this.title,
							creative: this.nombre,
							position: this.position
						}
					]
				}
			},
			eCategory: 'Promociones: ' + this.nombre,
			eAction: this.title,
			eLabel: generateLabelTag()
		};
	}
}

export class ModelTaggingOfertasVuelos {
	constructor(
			public src: string,
			public title: string,
			public nombre: 'Oferta de Vuelos',
			public position: string,
			public url: string
	) { }

	generateTag() {
		return {
			event: 'nmv.promos_eecga3_ofertasVuelos',
			ecommerce: {
				promoClick: {
					promotions: [
						{
							id: this.src,
							name: this.title,
							creative: this.nombre,
							position: this.position
						}
					]
				}
			},
			eCategory: 'Promociones: ' + this.nombre,
			eAction: this.title,
			eLabel: generateLabelTag()
		};
	}
}


export class ModelTaggingSubscripcionOfertas {
	constructor(
			public event = 'nmv.users_ga_formSuscripcion',
			public eCategory = 'Form Ofertas Exclusivas',
			public eAction = 'Suscripción a Ofertas',
			public eLabel = generateLabelTag()
	) { }
}

export class ModelTaggingLogin {
	constructor(
			public accion: 'Login' | 'Signup',
			public perfilUsuario: 'Cuenta Personal' | 'Cuenta Empresa',
			public userMetodo: 'Password' | 'Facebook' | 'Google',
			public userEmail: string,
			public userId: string | number
	) { }

	generateTag() {
		return {
			event: 'nmv.users_ga_' + this.accion,
			userPerfil: this.perfilUsuario,
			userMetodo: this.userMetodo,
			userEmail: this.userEmail,
			userId: this.userId,
			eCategory: this.accion,
			eAction: this.perfilUsuario,
			eLabel: this.userMetodo
		}
	}
}

export class ModelTaggingLibroReclamaciones {

	public eCategory: 'Libro de Reclamaciones';
	public event = 'nmv.users_ga_libroReclamaciones';

	constructor(
			public bienTipo: 'Servicio' | 'Producto',
			public bienDescripcion: string,
			public tipoReclamo: 'Reclamo' | 'Queja'
	) { }

	generateTag() {
		return {
			event: this.event,
			bienTipo: this.bienTipo,
			bienDescripcion: this.bienDescripcion,
			tipoReclamo: this.tipoReclamo,
			eCategory: this.eCategory,
			eAction: this.bienTipo,
			eLabel: this.bienDescripcion
		}
	}
}

export class ModelTaggingBuscarSeguros {
	constructor(
			public nombreRegionDestino: string,
			public codigoRegionDestino: string,
			public cantidadPasajeros: string | number,
			public promedioEdad: string | number,
			/**Formato DD/MM/YYYY */
			public fechaSalida: string | number,
			/**Formato DD/MM/YYYY */
			public fechaRegreso: string | number,
			public codigoPaisOrigen = 'PE',
			public nombrePaisOrigen = 'Peru',
			public duration: number
	) { }

	generateTag() {
		return {
			event: 'nmv.seguros_ga_buscar',
			nombre: this.nombrePaisOrigen + '_' + this.nombreRegionDestino,
			numPasajeros: this.cantidadPasajeros,
			promEdad: this.promedioEdad,
			fechaSalida: moment(this.fechaSalida, 'DD/MM/YYYY').format('YYYY/MM/DD'),
			fechaRegreso: moment(this.fechaRegreso, 'DD/MM/YYYY').format('YYYY/MM/DD'),
			diasAnticipacion: moment(this.fechaSalida, 'DD/MM/YYYY').diff(moment(), 'days'),
			duracionViaje: this.duration,
			paisOrigen: this.nombrePaisOrigen,
			regionDestino: this.nombreRegionDestino,
			eCategory: 'Vertical Seguros',
			eAction: 'Cotizar Seguros',
			eLabel: generateLabelTag()
		}
	}
}

export class ModelTaggingMostrarResultados {
	constructor(
			public event: 'nmv.seguros_eecga3_productimpression',
			public ecommerce: Ecommerce
	) { }
}

export class Ecommerce {
	constructor(
			public currencyCode: string,
			public impressions: Impression[]
	) { }

}

export class Impression {
	constructor(
			public name: string,
			public position: number,
			public list: string,
			public id: string,
			public price: string,
			public brand: string,
			public category: string,
			public category2: string,
			public variant: string,
			public quantity: number,
			public metric10: number,
			public dimension9: string,
			public dimension11: string,
			public dimension12: string,
			public metric11: number,
			public metric12: number
	) { }

}

export class ModelTaggingDetalleBeneficio {
	constructor(
			public event: string,
			public ecommerce: EcommerceDetalleBeneficio
	) { }
}

export class EcommerceDetalleBeneficio {
	constructor(
			public detail: Detail
	) { }

}

export class Detail {
	constructor(
			public actionField: ActionField,
			public products: Product[]
	) { }

}

export class ActionField {
	constructor(
			public list: string
	) { }

}

export class Product {
	constructor(
			public name: string,
			public id: string,
			public price: string,
			public brand: string,
			public category: string,
			public category2: string,
			public variant: string,
			public quantity: number,
			public metric10: number,
			public dimension9: string,
			public dimension11: string,
			public dimension12: string,
			public metric11: number,
			public metric12: number
	) { }

}

export class ModelTaggingAddToCart {
	constructor(
			public event: string,
			public ecommerce: EcommerceAddToCart
	) { }
}

export class EcommerceAddToCart {
	constructor(
			public currencyCode: string,
			public add: Add
	) { }
}

export class Add {
	constructor(
			public actionField: ActionFieldAddToCart,
			public products: ProductAddToCart[]
	) { }
}

export class ActionFieldAddToCart {
	constructor(
			public list: string
	) { }
}

export class ProductAddToCart {
	constructor(
			public name: string,
			public id: string,
			public price: string,
			public brand: string,
			public category: string,
			public category2: string,
			public variant: string,
			public quantity: number,
			public metric10: number,
			public dimension9: string,
			public dimension11: string,
			public dimension12: string,
			public metric11: number,
			public metric12: number,
			public dimension16: string,
			public dimension17: string
	) { }
}

export class ModelTaggingCheckout {
	constructor(
			public event: string,
			public ecommerce: EcommerceCheckout
	) { }
}

export class EcommerceCheckout {
	constructor(
			public checkout: Checkout
	) { }
}

export class Checkout {
	constructor(
			public actionField: ActionFieldCheckout,
			public products: ProductAddToCart[]
	) { }
}

export class ActionFieldCheckout {
	constructor(
			public step: number
	) { }
}

export class ModelTaggingcheckoutOption {
	constructor(
			public event: string,
			public ecommerce: EcommercecheckoutOption
	) { }

}

export class EcommercecheckoutOption {
	constructor(
			public checkout_option: CheckoutOption
	) { }
}

export class CheckoutOption {
	constructor(
			public actionField: ActionFieldCheckoutOption
	) { }
}

export class ActionFieldCheckoutOption {
	constructor(
			public step: number,
			public option: string
	) { }
}

export class SearchFlights {
	constructor(
			public event: string,
			public operacion: Operation,
			public origen: Location,
			public destino: Location,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class SearchFlightHotel {

	constructor(
			public event: string,
			public operacion: Operation,
			public origen: Location,
			public destino: Location,
			public hotel: Hotel,
			public vuelo: Flight,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class SearchItineraries {
	constructor(public event: string, public operacion: Operation, public destino: CountryName, public paquete: Package) {}
}

export class SearchTravelInsurance {
	constructor(
			public event: string,
			public operacion: Operation,
			public origen: Location,
			public destino: Location,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class SearchHotels {
	constructor(
			public event: string,
			public operacion: Operation,
			public destino: Location,
			public hotel: Hotel,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class SearchCarRent {
	constructor(
			public event: string,
			public operacion: Operation,
			public destino: Location,
			public autos: CarRent,
			public fechas: Dates
	) {}
}

export class SearchAssemblePackages {
	constructor(
			public event: string,
			public operacion: Operation,
			public vuelo: Flight,
			public hotel: Hotel,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class SearchExperiences {
	constructor(
			public event: string,
			public operacion: Operation,
			public destino: Location,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class TravelInsuranceListResults {
	constructor(
			public event: string,
			public precio: InsurancePrice,
			public origen: Location,
			public destino: Location,
			public resultados: InsuranceResult[],
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class TravelInsuranceSelected {
	constructor(
			public event: string,
			public operacion: Operation,
			public precio: InsurancePrice,
			public origen: Location,
			public destino: Location,
			public seguro: InsuranceResult,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class TravelInsuranceCheckout {
	constructor(
			public event: string,
			public operacion: Operation,
			public precio: InsurancePrice,
			public origen: Location,
			public destino: Location,
			public seguro: InsuranceResult,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class TravelInsurancePassengerInfo {
	constructor(
			public event: string,
			public precio: InsurancePrice,
			public usuario: InsuranceUser,
			public origen: Location,
			public destino: Location,
			public seguro: InsuranceResult,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class TravelInsurancePaymentMethodSelected {
	constructor(
			public event: string,
			public precio: InsurancePrice,
			public metodo_pago: InsurancePaymentMethod,
			public usuario: InsuranceUser,
			public origen: Location,
			public destino: Location,
			public seguro: InsuranceResult,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class TravelInsuranceSuccess {
	constructor(
			public event: string,
			public operacion: OperationSuccess,
			public precio: InsurancePrice,
			public metodo_pago: InsurancePaymentMethod,
			public usuario: InsuranceUser,
			public origen: Location,
			public destino: Location,
			public seguro: InsuranceResult,
			public pasajeros: Passengers,
			public fechas: Dates
	) {}
}

export class Operation {
	constructor(public dias_anticipacion: number) {}
}

export class OperationSuccess {
	constructor(public id: string, public dias_anticipacion: number) {}
}

export class Location {
	constructor(public nombre: string, public codigo: string, public pais: string) {}
}

export class CountryName {
	constructor(public pais: string) {}
}

export class Hotel {
	constructor(public habitaciones: number) {}
}

export class Flight {
	constructor(public clase: string) {}
}

export class Passengers {
	constructor(public adultos: number, public ninos: number, public infantes: number, public total: number) {}
}

export class Dates {
	constructor(public salida: string, public retorno: string, public estadia: number) {}
}

export class Package {
	constructor(public fecha_salida: string, public tema: string, public noches: string) {}
}

export class CarRent {
	constructor(public edad_conductor: string, public lugar_devolucion: string) {}
}

export class InsurancePrice {
	constructor(public moneda: string, public precioNormal: number, public precioFinal: number) {}
}

export class InsuranceResult {
	constructor(
			public posicion: number,
			public precioFinal: number,
			public plan: string,
			public codigo: string,
			public opcion: string,
			public emisor: string,
			public monto_asistencia: number
	) {}
}

export class InsurancePaymentMethod {
	constructor(public opcion: string) {}
}

export class InsuranceUser {
	constructor(
			public email: string,
			public primerNombre: string,
			public primerApellido: string,
			public fechaNacimiento: string,
			public nacionalidad: string,
			public genero: string,
			public documento_tipo: string,
			public documento_numero: string,
			public telefono_tipo: string,
			public telefono_codigo: string,
			public telefono_numero: string,
			public frecuencia: string
	) {}
}
