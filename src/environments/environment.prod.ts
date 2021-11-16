export const environment = {
  production: true,
  urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',
  serverUrlApi: 'http://localhost:8080/api/',
  urlLogin: 'http://localhost:64238/login',
  nameAppAC: 'Intranet',
  identifierAC: 'NMViajes - Assist Card',
  codeEnvironmentAC: 'DESA/NMO/NMO',
  undidadNegocioAC: 1,
  dkAgenciaAC: '339',
  subcodigoAgenciaAC: '1',
  sucursalAgenciaAC: '3',
  ptoventaAgenciaAC: '1',
  comisionistaAgenciaAC: '146',
  today: (hoy: any) => {
    let fehcaHoy = `${hoy.getDay()}/${hoy.getMonth()}/${ hoy.getFullYear()}`
    return fehcaHoy
  },
  urlPaqueteDinamico: 'https://nmviajes.paquetedinamico.com/'
};