export const environment = {
  production: false,
  // urlBase: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',  // PRODUCCIÓN
  muteExceptions: false,                 // DESARROLLO
  nameAppAC: 'Intranet',
  identifierAC: 'NMViajes - Assist Card',
  codeEnvironmentAC: 'PROD/NMO/NMO',
  undidadNegocioAC: 13,
  dkAgenciaAC: '29581',
  subcodigoAgenciaAC: '1',
  sucursalAgenciaAC: '3',
  ptoventaAgenciaAC: '1',
  comisionistaAgenciaAC: '',
  apiIp: 'https://api.ipify.org/?format=json',
  today: (hoy: any) => {
    let fehcaHoy = `${hoy.getDay()}/${hoy.getMonth()}/${hoy.getFullYear()}`
    return fehcaHoy
  },
  urlPaqueteDinamico: 'https://vacaciones.nmviajes.com/',
  urlPaqueteDinamicoNmViajes: 'https://nmviajes.paquetedinamico.com/',
  urlAutosNmViajes: 'https://autos.nmviajes.com/',

  urlNmviajes: "https://servicio.nmviajes.com:9443/homevuelos/v1/api",

  urlLibro: "https://servicio.nmviajes.com:9443/libroreclamacion",
  urlApiTickets: "https://servicios.expertiatravel.com/widgetactividades",
  urlApiHotels: "https://servicios.expertiatravel.com/widgethotel",
  urlNmviajesAccount: "https://servicio.nmviajes.com:9443/ZonaPrivada",
  //urlNewsletter: 'https://servicio.nmviajes.com:9443/suscripcion',
  urlNewsletter: 'https://servicios.expertiatravel.com/subscription',//desarrollo
  urlSeguros: 'https://servicio.nmviajes.com:9443/segurosrv/',
  urlZonaPrivada: 'https://servicio.nmviajes.com:9443/zonaprivada/',
  //urlGeo: "https://motorvuelos-dev.expertiatravel.com/mv",
  urlGeo: "https://motorvuelos.expertiatravel.com/mv",
  urlIframeMotorVuelos: "https://motorwl-dev.expertiatravel.com/#/nmviajes/search/resultados",
  //urlIframeMotorVuelos: "http://localhost:4200/#/nmviajes/search/resultados",

  urlIframeMotorVuelosItinerary: "https://motorwl.expertiatravel.com/#/nmviajes/booking/itinerary",

  urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',
  url_api: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',

  serverUrlApi: 'http://localhost:8080/api/',

  url_autos: 'https://autos.nmviajes.com/es/site/',


  //urlApiPayment: "https://pasarella.expertiatravel.com/ServicioPasarela",
  //urlApiPayment: "http://10.75.102.23:15001/pasarelaservicio",
  urlApiPayment: 'http://localhost:30850',

  urlSuggest: "https://suggest.agentcars.com/suggest/",

  urlApiCorreos: "https://servicios.expertiatravel.com/NmViajesCorreo",

  urlApiMotorVuelos: "https://motorvuelos-dev.expertiatravel.com/mv/"
}
