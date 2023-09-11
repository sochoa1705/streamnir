import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseModelT } from 'src/app/shared/models';
import { NmvModel } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { IGalleryService } from './data-page-presenter.models';

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
        img: "bannerHOME.jpg",
        key: true,
        titulo: 'detalle slider',
        detalle: 'detalle slider',
        class: 'active'
      },
      {

        id: 1,
        img: "bannersIBKcancun.jpg",
        titulo: 'detalle slider 1',
        detalle: 'detalle slider 1',
        key: true,
      },
      {

        id: 2,
        img: "bannersIBKiguazu.jpg",
        titulo: 'detalle slider 2',
        detalle: 'detalle slider 2',
        key: true,
      },
      {

        id: 3,
        img: "bannersIBKpuntacana.jpg",
        titulo: 'detalle slider 3',
        detalle: 'detalle slider 3',
        key: true,
      },
      {

        id: 4,
        img: "bannersIBKvichay.jpg",
        titulo: 'detalle slider 4',
        detalle: 'detalle slider 4',
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
        img: "comprar.webp",
        card: [
          {
            id: 0,
            img: "./assets/home/choose/bag.png",
            title: "Las mejores ofertas para tu viaje",
            description: "Aprovecha nuestros descuentos promociones y ofertas seleccionadas que tenemos para ti."
          },
          {
            id: 1,
            img: "./assets/home/choose/secure.png",
            title: "Comprar es fácil y seguro",
            description: "Te ofrecemos los mejores lugares para ir de vacaciones por todo el mundo. Reserva tu viaje de forma fácil, rápida y segura."
          },
          {
            id: 2,
            img: "./assets/home/choose/certificate.png",
            title: "Expertos en Viajes",
            description: "Más de 40 años de experiencia, como líder en turismo, brindando servicios de calidad que hará que tu experiencia de viaje sea inolvidable."
          }
        ]
      },
      {
        id: 5,
        section: "mailing",
        title: "¡SUSCRÍBETE!",
        span: "Se el primero en recibir nuestras novedades y promociones"
      },
      {
        id: 6,
        section: "Footer",
        title1: "Productos",
        list1: [
          {
            id: 0,
            text: "Paquetes",
            link: "https://nmviajes.paquetedinamico.com/ES/holidays/search",
            external: true
          },
          {

            id: 1,
            text: "Vuelos",
            link: "vuelos"
          },
          {

            id: 2,
            text: "Vuelos + Hotel",
            link: "#",
            tab: 2
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
            text: "Quienes somos",
            link: "/nuestra-empresa",
            target: "_self"
          },
          {
            id: 1,
            text: "Nuestras tiendas",
            link: "/nuestras-agencias/",
            target: "_self"
          },
          {
            id: 2,
            text: "Trabaja con nosotros",
            link: "https://expertiatravel.hiringroom.com/jobs",
            target: "_blank"
          },
          {
            id: 3,
            text: "Responsabilidad Social Corporativa",
            link: "responsabilidad-social",
            target: "_self"
          },
          {
            id: 4,
            text: "Política de Protección de datos Personales",
            link: "politicas",
            target: "_self"
          }
          // {
          //   id: 5,
          //   text: "SIT - Travel Outlet",
          //   link: "#"
          // }
        ],
        title3: "Contáctanos",
        span: "Agencias de Viajes en Lima Perú",
        addrees: "Av. José Pardo 801 Miraflores - Lima 18, Perú.",
        libro: "Libro de reclamaciones",
        linkLibro: "/libro-reclamaciones"
      }
    ],
    string: "Hello World"
  }

  constructor(private httpClient: HttpClient) { }


  getDataGallery() {
    const nmvModel = new NmvModel()

    const options = {
      params: nmvModel.params.set('Parameter.Status', true)
    }
    const url = environment.urlNmviajes + '/Gallery';
    return this.httpClient.get<ResponseModelT<IGalleryService[]>>(url, options).pipe(
      map(resp => resp.Result)
    )
  }



}
