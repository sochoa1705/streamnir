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
    return `${hoy.getDay()}/${hoy.getMonth()}/${hoy.getFullYear()}`
  },
  offerText: '¡Apúrate que se acaban las ofertas!',
  offerExpireDate: '2023-10-27 T 23:59:59', //YYYY-MM-DD T hh:mm:ss
  offerLink: 'https://vacaciones.nmviajes.com/ES/holidays/availability?utm_source=web&utm_medium=reloj&utm_campaign=cyberwowoct&utm_id=cyberwowoct&utm_term=reloj&utm_content=reloj',
  urlPaqueteDinamico: 'https://vacaciones.nmviajes.com/',
  urlPaqueteDinamicoNmViajes: 'https://nmviajes.paquetedinamico.com/',
  urlAutosNmViajes: 'https://autos.nmviajes.com/',
  firebase: {
    projectId: 'nm-viajes',
    appId: '1:1068048799100:web:d4c8ffb9c709136d8940f9',
    storageBucket: 'nm-viajes.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDw9Pd5sBSKba1FuZyo_MaoKVhm5sX_JVM',
    authDomain: 'nm-viajes.firebaseapp.com',
    messagingSenderId: '1068048799100',
    measurementId: 'G-FE42H792WL',
  },
  reCaptchaPublicKey: '6Lc9CbsmAAAAANpAUZ5Ubxl2s25BwmhZVgp7Yrev',

  urlNmviajes: "https://servicio.nmviajes.com:9443/homevuelos/v1/api",
  urlNmViajesCountries: "https://servicio.nmviajes.com:9443/ZonaPrivada/v1/api/Master/Soap/Countries",
  urlMeta: "https://meta.nmviajes.com",
  //urlNmviajes: "http://localhost:12639/v1/api",

  urlLibro: "https://servicio.nmviajes.com:9443/libroreclamacion",
  urlApiTickets: "https://servicios.expertiatravel.com/widgetactividades",
  urlApiHotels: "https://servicios.expertiatravel.com/widgethotel",
  urlNmviajesAccount: "https://servicio.nmviajes.com:9443/ZonaPrivada",
  //urlNewsletter: 'https://servicio.nmviajes.com:9443/suscripcion',
  brevoBaseUrl: 'https://api.brevo.com/v3',
  brevoApiKey: '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',
  urlSeguros: 'https://servicio.nmviajes.com:9443/segurosrv/',
  urlZonaPrivada: 'https://servicio.nmviajes.com:9443/zonaprivada/',
  //urlGeo: "https://motorvuelos-dev.expertiatravel.com/mv",
  urlGeo: "https://motorvuelos.expertiatravel.com/mv",
  //urlIframeMotorVuelos: "https://vuelos-dev.nmviajes.com/#/nmviajes/search/resultados",
  urlIframeMotorVuelos: "https://dev-motorwl.nmviajes-it.com/#/nmviajes/search/resultados",
  //urlIframeMotorVuelos: "http://localhost:4200/#/nmviajes/search/resultados",

  urlIframeMotorVuelosItinerary: "https://vuelos.nmviajes.com/#/nmviajes/booking/itinerary",

  urlBase: 'http://10.75.131.17:10508/api/productoAsistencia/',
  url_api: 'https://gds.webfarefinder.com/ServiciosTarjetaAsistencia/api/',

  serverUrlApi: 'http://localhost:8080/api/',

  url_autos: 'https://autos.nmviajes.com/es/site/',


  urlApiPayment: "https://pasarella.expertiatravel.com/ServicioPasarela",
  //urlApiPayment: "http://10.75.102.23:15001/pasarelaservicio",
  //urlApiPayment: 'http://localhost:30850',

  urlSuggest: "https://suggest.agentcars.com/suggest/",

  urlApiCorreos: "https://servicios.expertiatravel.com/NmViajesCorreo",

  urlApiMotorVuelos: "https://motorvuelos-dev.expertiatravel.com/mv/",

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
