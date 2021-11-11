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

  //LOCATIONSEARCH

  LOCATION_SEARCH = 'jsonp/locationSearch'

}