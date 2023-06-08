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
  apiIp: 'https://api.ipify.org/?format=json',
  today: (hoy: any) => {
    return `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
  },
  offerText: 'Aprovecha el Flash Sale, acaba en:',
  offerExpireDate: '2023-06-01 T 00:00:00', //YYYY-MM-DD T hh:mm:ss
  offerLink: 'https://nam02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.nmviajes.com%2Fvuelos%3Futm_source%3Dweb%26utm_medium%3Dreloj%26utm_campaign%3Dflashsale%26utm_id%3Dflashsale%26utm_term%3Dheader_flash_vuelos%26utm_content%3Dheader_flash_vuelos&data=05%7C01%7Csamuel.huaman%40expertiatravel.com%7C728f20478ff44c7d52c408db609ed10d%7Cf47010b409cd41ffa9ca7e9b411249f6%7C0%7C0%7C638210007479309947%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=FUuls7YiDadCZlcgQBSLcp7YUwm9xX9j8FSkyig0IcI%3D&reserved=0',
  urlPaqueteDinamico: 'https://vacaciones.nmviajes.com/',
  urlPaqueteDinamicoNmViajes: 'https://nmviajes.paquetedinamico.com/',
  urlAutosNmViajes: 'https://autos.nmviajes.com/',

  urlNmviajes: "https://servicio.nmviajes.com:9443/homevuelos/v1/api",

  urlLibro: "https://servicio.nmviajes.com:9443/libroreclamacion",
  urlApiTickets: "https://servicios.expertiatravel.com/widgetactividades",
  urlApiHotels: "https://servicios.expertiatravel.com/widgethotel",
  urlNmviajesAccount: "https://servicio.nmviajes.com:9443/ZonaPrivada",
  brevoBaseUrl: 'https://api.brevo.com/v3',
  brevoApiKey: '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',
  urlSeguros: 'https://servicio.nmviajes.com:9443/segurosrv/',
  urlZonaPrivada: 'https://servicio.nmviajes.com:9443/zonaprivada/',
  urlGeo: "https://motorvuelos.expertiatravel.com/mv",
  urlIframeMotorVuelos: "https://vuelos.nmviajes.com/#/nmviajes/search/resultados",
  urlIframeMotorVuelosItinerary: "https://vuelos.nmviajes.com/#/nmviajes/booking/itinerary",

  urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',
  url_api: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',


  serverUrlApi: 'http://localhost:8080/api/',

  url_autos: 'https://autos.nmviajes.com/es/site/',

  urlApiPayment: "https://pasarella.expertiatravel.com/ServicioPasarela",
  urlSuggest: "https://suggest.agentcars.com/suggest/",

  urlApiCorreos: "https://servicios.expertiatravel.com/NmViajesCorreo",

  urlApiMotorVuelos: "https://motorvuelos.expertiatravel.com/mv/",

  SEO: {
    home: {
      url: 'https://www.nmviajes.com/',
      title: 'Ofertas de Viajes, Vuelos, Paquetes Turísticos en NM Viajes',
      description: 'Encuentra el mejor precio en pasajes aereos, paquetes turísticos, vuela a Miami, Cusco, Arequipa y más destinos con NMViajes',
      image: 'https://www.nmviajes.com/Images/seo/logo_nmviajes.png',
      height: '450',
      width: '900',
      logo: 'https://www.nmviajes.com/Images/seo/logo_nmviajes.png'
    },
    flights: {
      url: 'https://www.nmviajes.com/vuelos',
      title: 'Vuelos Nacionales e Internacionales. Ofertas en pasajes aéreos',
      description: 'Aprovecha los Pasajes Aéreos Baratos. Vuelos Internacionales Lima a Miami, New York, Buenos Aires. Vuelos Nacionales a Cusco, Tumbes, Piura.',
      image: 'https://www.nmviajes.com/Images/seo/logo_nmviajes.png',
      height: '450',
      width: '900',
      logo: 'https://www.nmviajes.com/Images/seo/logo_nmviajes.png'
    },
    insurance: {
      url: 'https://www.nmviajes.com/seguros/',
      title: 'Seguro de viaje. Viaja seguro con Assist Card y NM Viajes',
      description: 'Viaja seguro con Assist Card y NM Viajes. Visítanos y conoce todos nuestros planes y coberturas de seguros de viajes.',
      image: 'https://www.nmviajes.com/Images/seo/logo_nmviajes.png',
      height: '450',
      width: '900',
      logo: 'https://www.nmviajes.com/Images/seo/logo_nmviajes.png'
    },
    scheduleYourAppointment: {
      title: 'Agenda un cita virtual con una asesor de NM Viajes',
      description: 'Recibe la asesoría de una especialista en viajes y haz que el viaje de tus sueños sea una realidad.'
    },
    careChannels: {
      title: 'Conoce todos los canales de atención de NM Viajes',
      description: 'Elije el canal de atención de tu preferencia y planifica tu viaje a los mejores precios.'
    }
  }
}
