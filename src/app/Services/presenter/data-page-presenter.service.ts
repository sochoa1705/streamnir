import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPagePresenterService {
  data: any = {
    idCliente: 1,
    title: "Ofertas de Viajes, vuelos, paquetes turísticos en NMViajes",
    aside: [
      {
        id: 0,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
        class: 'active'
      },
      {

        id: 1,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
      },
      {

        id: 2,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
      },
      {

        id: 3,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
      },
      {

        id: 4,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
      },
      {

        id: 5,
        img: "6-Orlando.jpg",
        key: false,
      },
      {

        id: 6,
        img: "6-Orlando.jpg",
        key: false,
      }
    ],
    sections: [
      {
        id: 0,
        section: "Ofertas",
        title: "Ofertas únicas para ti",
        btn: "Más ofertas",
        link: "#"
      },
      {
        id: 1,
        section: "Paquetes",
        title: "Paquetes turísticos",
        title2: "¡Elige ahora tu paquete nacional o internacional!",
        btn: "Otros paquetes",
        link: "#"
      },
      {
        id: 2,
        section: "Mapa",
        title: "Nuestras mejores ofertas de Vuelo + Hotel saliendo de Lima"
      },
      {
        id: 3,
        section: "Vuelos",
        title: "¡Corre y Vuela! con estas Súper ofertas de Vuelos saliendo desde Lima",
        btn: "Más ofertas",
        link: "#"
      },
      {
        id: 4,
        section: "Comprar",
        title: "¿Por qué comprar en NMVIAJES?",
        img: "comprar.jpg",
        card: [
          {
            id: 0,
            img: "ofertas.svg",
            title: "Las mejores ofertas para tu viaje",
            description: "Aprovecha nuestros descuentos promociones y ofertas seleccionadas que tenemos para ti."
          },
          {
            id: 1,
            img: "facil.svg",
            title: "Comprar es fácil y seguro",
            description: "Te ofrecemos los mejores lugares para ir de vacaciones por todo el mundo. Reserva tu viaje de forma fácil, rápida y segura."
          },
          {
            id: 2,
            img: "expertos.svg",
            title: "Expertos en Viajes",
            description: "Más de 40 años de experiencia, como líder en turismo, brindando servicios de calidad que hará que tu experiencia de viaje sea inolvidable."
          }
        ]
      },
      {
        id: 5,
        section: "mailing",
        title: "OFERTAS EXCLUSIVAS",
        span: "Se el primero en recibir nuestras ofertas de viajes"
      },
      {
        id: 6,
        section: "Footer",
        title1: "Productos",
        list1: [
          {
            id: 0,
            text: "Paquetes",
            link: "paquetes"
          },
          {

            id: 1,
            text: "Vuelos",
            link: "vuelos"
          },
          {

            id: 2,
            text: "Vuelos + Hotel",
            link: "#"
          },
          {

            id: 3,
            text: "Hoteles",
            link: "#"
          },
          {

            id: 4,
            text: "Actividades",
            link: "#"
          },
          {

            id: 5,
            text: "Descubre",
            link: "#"
          },
          {

            id: 6,
            text: "Blog: Mundo Viajero",
            link: "#"
          }
        ],
        title2: "Conócenos",
        list2: [
          {
            id: 0,
            text: "Nuestra Empresa NM Viajes",
            link: "#"
          },
          {
            id: 1,
            text: "Nuestras Agencias NM Viajes",
            link: "#"
          },
          {
            id: 2,
            text: "Política de Protección de datos Personales",
            link: "#"
          },
          {
            id: 3,
            text: "Responsabilidad Social Corporativa",
            link: "#"
          },
          {
            id: 4,
            text: "Mapa de Sitio",
            link: "#"
          },
          {
            id: 5,
            text: "SIT - Travel Outlet",
            link: "#"
          }
        ],
        title3: "Contáctanos",
        span: "Agencias de Viajes en Lima Perú",
        addrees: "Av. José Pardo 801 Miraflores - Lima 18, Perú.",
        libro: "Libro de reclamaciones",
        linkLibro: "#"
      }
    ],
    string: "Hello World"
  }
  constructor() { }
}
