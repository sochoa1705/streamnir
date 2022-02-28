export const Path = {
  Core: 'Core/'
};

export const Core = {
  GetUserId: 'GetUserId',
};

export const LogoutType = {
  cognito: 1,
  azure: 2,
};

export enum ENDPOINT_API {
  // DOLLAR
  CHANGE = 'generales/TipoCambio',

  // AUTOCOMPLETE
  CIUDADES = 'GetCiudades_AutoComplete',
  ciudad = 'pStrIdCiudad',

  // COBERTURA
  COVERAGE = 'ObtenerCobertura',

  // UNIDAD DE NEGOCIOS
  BUSINESS_UNIT = 'ObtenerUnidadesNegocio',

  // UNIDAD DE NEGOCIOS VENDEDOR
  BUSINESS_UNIT_SELLER = 'ObtenerUnidadNegocioByVendedor',

  // DESTINOS
  DESTINY = 'Destinos',

  // PLANSAC
  PLANSAC = 'ObtenerPlanesAC',

  // SECUREBOOKING
  SECURE_BOOKING = 'RegistrarReservaSeguro',

  // GENERATEPAY
  GENERATE_PAY = 'GenerarPagoSafetyPay',

  // UPDATESAFETYPAY
  UPDATE_PAY = 'ActualizarSafetyPayReservaSeguro',

  // UPDATESAFETYPAY
  UPDATE_STATE = 'ActualizarEstadoReservaSeguro',

  //LOCATIONSEARCH
  LOCATION_SEARCH = 'jsonp/locationSearch',

  //CARDPAYMENT
  CARD_PAYMENT = 'v1/api/Insurance',

  //CHECKCARD
  CHECK_CARD = 'v1/api/Card/Check?Parameter.Number=49133712345678900&TrackingCode=qwertyuiiop&MuteExceptions=false&Caller.Company=Agil&Caller.Application=Expertia',

  //CARDPAYMENT
  LIBRO_RECLAMO = 'v1/api/Complaint',

  // PREFERENCE
  PREFERENCE = 'v1/api/Preference',

  // COUNTRIES
  COUNTRIES = 'v1/api/Master/Soap/Countries',

  // DEPARTMENTS
  DEPARTAMENTS = 'v1/api/Master/Soap/Departments',

  // DISTRICTS
  DISTRICTS = 'v1/api/Master/Soap/Districts',
}

export enum ROUTE_VIAJES {
  RUTA_PAQUETES = 'https://nmviajes.paquetedinamico.com/ES/holidays/search',
  RUTA_GET = 'https://nmviajes.paquetedinamico.com/home'
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
