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
  LOCATION_SEARCH = 'jsonp/locationSearch'

}

export enum ROUTE_VIAJES {
  RUTA_PAQUETES = 'https://nmviajes.paquetedinamico.com/ES/holidays/search',
  RUTA_GET = 'https://nmviajes.paquetedinamico.com/home'
}