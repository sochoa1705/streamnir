export const environment = {
  production: true,
  // urlBase: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',  // PRODUCCIÓN
  muteExceptions: false,                 // DESARROLLO
  nameAppAC: 'Intranet',
  identifierAC: 'NMViajes - Assist Card',
  codeEnvironmentAC: 'PROD/NMO/NMO',
  undidadNegocioAC: 8,
  dkAgenciaAC: '29581',
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


  urlDestinoSeguros: 'http://10.75.131.17:8091/api/',
  urlBase: 'http://10.75.131.17:8091/api/productoAsistencia/',
  // urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',               
  // url_api: 'http://10.75.131.17:8091/api/',
  url_api: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',
  serverUrlApi: 'http://localhost:8080/api/'


}