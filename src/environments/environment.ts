// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlBase: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',  // PRODUCCIÓN
  muteExceptions: false,                 // DESARROLLO
  nameAppAC: 'Intranet',
  identifierAC: 'NMViajes - Assist Card',
  codeEnvironmentAC: 'PROD/NMO/NMO',
  undidadNegocioAC: 1,
  dkAgenciaAC: '339',
  subcodigoAgenciaAC: '1',
  sucursalAgenciaAC: '3',
  ptoventaAgenciaAC: '1',
  comisionistaAgenciaAC: '146',
  today: (hoy: any) => {
    let fehcaHoy = `${hoy.getDay()}/${hoy.getMonth()}/${hoy.getFullYear()}`
    return fehcaHoy
  },
  urlPaqueteDinamico: 'https://nmviajes.paquetedinamico.com/',

  urlNmviajes: "https://servicio.nmviajes.com:9443/homevuelos/v1/api",

  urlLibro: "https://servicio.nmviajes.com:9443/libroreclamacion",
  urlApiTickets: "https://servicios.expertiatravel.com/widgetactividades",
  urlApiHotels: "https://servicios.expertiatravel.com/widgethotel",
  urlNmviajesAccount: "https://servicio.nmviajes.com:9443/ZonaPrivada",
  urlNewsletter: 'https://servicio.nmviajes.com:9443/suscripcion',
  urlSeguros: 'https://servicio.nmviajes.com:9443/segurosrv/',
  urlGeo: "http://20.75.62.133",
  urlIframeMotorVuelos: "http://52.177.246.241/#/nmviajes/search/resultados",


  urlBase: 'https://10.75.131.17:10508/api/productoAsistencia/',               



  serverUrlApi: 'http://localhost:8080/api/'




// https://servicio.nmviajes.com:9443/segurosrv/index.html

}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.