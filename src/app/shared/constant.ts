export const Path = {
  Core: 'Core/'
};

export const Core = {
  GetUserId: 'GetUserId',
};

export enum ENDPOINT_API {
  // AUTOCOMPLETE
  CIUDADES = 'GetCiudades_AutoComplete',
  ciudad = 'pStrIdCiudad',

  // COBERTURA
  COVERAGE = 'tarjetaAsistencia/ObtenerCobertura',

  // UNIDAD DE NEGOCIOS
  BUSINESS_UNIT = 'productoAsistencia/ObtenerUnidadesNegocio',

  // UNIDAD DE NEGOCIOS VENDEDOR
  BUSINESS_UNIT_SELLER = 'ObtenerUnidadNegocioByVendedor',

  // DESTINOS
  DESTINY = 'generales/Destinos',

  // PLANSAC
  PLANSAC = 'tarjetaAsistencia/ObtenerPlanesAC',

  // SECUREBOOKING
  SECURE_BOOKING = 'reservas/RegistrarReservaSeguro',

  // GENERATEPAY
  GENERATE_PAY = 'safetypay/GenerarPagoSafetyPay',

  // UPDATESAFETYPAY
  UPDATE_PAY = 'reservas/ActualizarSafetyPayReservaSeguro',

  // UPDATESAFETYPAY
  UPDATE_STATE = 'reservas/ActualizarEstadoReservaSeguro',

  //LOCATIONSEARCH
  LOCATION_SEARCH = 'jsonp/locationSearch',

  LOCATION_SEARCH_COUNTRIES = 'resources/autocomplete/allCountries',

  LOCATION_SEARCH_COUNTRIES_PACKAGE = 'resources/autocomplete/nmviajes/holidayPackageCountries',
  LOCATION_SEARCH_THEMES_PACKAGE = 'resources/autocomplete/nmviajes/holidayPackageThemes',
  RESOURCES_FILTERS = 'resources-internal/cruises/nmviajes/filters',

  //CARDPAYMENT
  CARD_PAYMENT = 'v1/api/Insurance',

  //CHECKCARD
  CHECK_CARD = 'v1/api/Card/Check',

  //CARDPAYMENT
  LIBRO_RECLAMO = 'v1/api/Complaint',

  // PREFERENCE
  PREFERENCE = 'v1/api/Preference',

  // COUNTRIES
  COUNTRIES = 'v1/api/Master/Soap/Countries',

  // COUNTRY
  COUNTRY = 'v1/api/Master/Country',

  // DEPARTMENTS
  DEPARTAMENTS = 'v1/api/Master/Soap/Departments',

  // DISTRICTS
  DISTRICTS = 'v1/api/Master/Soap/Districts',

  //PAYMENT
  PAYMENT = 'Payment',

  //BOOKINGSTATUS
  BOOKINGSTATUS = 'v1/api/Booking/status'
}


export const FilterTypes = {
  equipajemano: 1,
  escalas: 2,
  aerolineas: 3,
  precio: 4,
  duracion: 5,
  alianzas: 6,
  reserva: 7,
  equipajebodega: 8,
  duracionSalida: 9,
  duracionEscala: 10,
}

export const CALLER_TYPE = {
  company: 'Expertia',
  application: 'NMViajes'
}


export const WHATSAPPCONSTANT = {
  text : "Contáctanos",
  cellphone: "51919294628",
  message: "Hola, me gustaría solicitar información sobre..."
}


export enum IdlePopupConstants {
  SEND_EMAIL
}
