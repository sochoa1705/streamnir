export const environment = {
  production: true,
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
  today: (hoy: any) => {
    let fehcaHoy = `${hoy.getDay()}/${hoy.getMonth()}/${hoy.getFullYear()}`
    return fehcaHoy
  },
  urlPaqueteDinamico: 'https://vacaciones.nmviajes.com/',
  // urlPaqueteDinamico: 'https://nmviajes.paquetedinamico.com/',
  urlPaqueteDinamicoNmViajes: 'https://nmviajes.paquetedinamico.com/',

  urlNmviajes: "https://servicio.nmviajes.com:9443/homevuelos/v1/api",

  urlLibro: "https://servicio.nmviajes.com:9443/libroreclamacion",
  urlApiTickets: "https://servicios.expertiatravel.com/widgetactividades",
  urlApiHotels: "https://servicios.expertiatravel.com/widgethotel",
  urlNmviajesAccount: "https://servicio.nmviajes.com:9443/ZonaPrivada",
  urlNewsletter: 'https://servicio.nmviajes.com:9443/suscripcion',
  urlSeguros: 'https://servicio.nmviajes.com:9443/segurosrv/',
  urlGeo: "https://motorvuelos.expertiatravel.com/mv",
  urlIframeMotorVuelos: "https://motorwl.expertiatravel.com/#/nmviajes/search/resultados",


  urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',
  url_api: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',


  serverUrlApi: 'http://localhost:8080/api/',

  url_autos: 'https://autos.nmviajes.com/es/site/',

  urlApiPayment: "https://pasarella.expertiatravel.com/ServicioPasarela"

}