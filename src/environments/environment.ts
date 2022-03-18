// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlBase: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',  // PRODUCCIÓN
  urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',
  muteExceptions: false,                 // DESARROLLO
  serverUrlApi: 'http://localhost:8080/api/',
  urlLogin: 'http://localhost:64238/login',
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

  urlNmviajes: "http://10.75.102.23:10001/v1/api",
  urlGeo: "http://10.75.131.17:10515",
  urlMaster: "http://10.75.131.17",
  urlLibro: "http://10.75.102.23:10007/",
  urlApiTickets: "http://10.75.102.23:10009",
  urlApiHotels: "http://10.75.102.23:10008",
  urlNmviajesAccount: "http://10.75.102.23:10006",
  urlIframeMotorVuelos: "http://52.177.246.241/#/nmviajes/search/resultados",

  // Rutas Nuevas
  urlBAse23: "http://10.75.102.23",
  urlBAse17: "http://10.75.131.17",
  urlBAse241: "http://52.177.246.241",

  portNmviajes: "10001",
  portNmviajesAccount: "10006",
  portLibro: "10007",
  portApiHotels: "10008",
  portApiTickets: "10009",
  portNewsletter: "10010",
  portGeo: "10015",
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.