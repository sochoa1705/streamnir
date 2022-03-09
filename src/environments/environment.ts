// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
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
  urlNmviajesAccount: "http://10.75.102.23:10006",
  urlApiTickets: "http://localhost:12639",
  urlApiHotels: "http://10.75.102.23:10008"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.