export const environment = {
  production: true,
  // urlBase: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',  // PRODUCCIÓN
  urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',                 // DESARROLLO
  serverUrlApi: 'http://localhost:8080/api/',
  muteExceptions: true,// DESARROLLO
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
  urlPreference: "http://10.75.102.23:10006/",
  urlNmviajesAccount: "http://10.75.102.23:10006",
  urlApiTickets: "http://10.75.102.23:10009",
  urlApiHotels: "http://10.75.102.23:10008",
  urlIframeMotorVuelos: "http://52.177.246.241/#/nmviajes",

  // Rutas Nuevas
  urlBAse23: "http://10.75.102.23",
  urlBAse17: "http://10.75.131.17",
  urlBAse241: "http://52.177.246.241",

  portNmviajesAccount: "10006",
  portLibro: "10007",
  portApiHotels: "10008",
  portApiTickets: "10009",
  portNewsletter: "10010",
}