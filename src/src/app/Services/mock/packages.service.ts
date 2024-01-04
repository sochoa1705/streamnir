import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  packages: any = [
    {
      id: 0,
      image: './assets/img-cusco.jpg',
      destiny: 'Cusco',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 54,
      link: '#',
      class: 'active'

    },
    {
      id: 1,
      image: './assets/img-madrid.png',
      destiny: 'Madrid',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 569,
      link: '#',
    },
    {
      id: 2,
      image: './assets/img-miami.png',
      destiny: 'Miami',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 184,
      link: '#',
    },
    {
      id: 3,
      image: './assets/img-mexico.png',
      destiny: 'México',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 357,
      link: '#',
    },
    {
      id: 4,
      image: './assets/package/13-RivieraMaya.jpg',
      label: 'Saliendo de Lima',
      destiny: 'MÉXICO',
      city: 'Riviera maya',
      span: 'INCLUYE BOLETO',
      price: 699,
      link: '#',
      banner: 6,
      pack: '6 días / 5 noches'
    },
    {
      id: 5,
      image: './assets/package/9-cancun.jpg',
      label: 'Saliendo de Lima',
      destiny: 'MÉXICO',
      city: 'Cancún',
      span: 'INCLUYE BOLETO',
      price: 858,
      link: '#',
      banner: 6,
      pack: '5 días / 4 noches'
    },
    {
      id: 6,
      image: './assets/package/7-vichayito.jpg',
      label: 'Saliendo de Lima',
      destiny: 'PERÚ',
      city: 'Vichayto',
      span: 'INCLUYE BOLETO',
      price: 249,
      link: '#',
      banner: 4,
      pack: '4 días / 3 noches'
    },
    {
      id: 7,
      image: './assets/package/8-zorritos.jpg',
      label: 'Saliendo de Lima',
      destiny: 'PERÚ',
      city: 'Zorritos',
      span: 'INCLUYE BOLETO',
      price: 259,
      link: '#',
      banner: 4,
      pack: '4 días / 3 noches'
    },
    {
      id: 8,
      image: './assets/package/2-iquitos.jpg',
      label: 'Saliendo de Lima',
      destiny: 'PERÚ',
      city: 'Iquitos',
      span: 'INCLUYE BOLETO',
      price: 199,
      link: '#',
      banner: 4,
      pack: '4 días / 3 noches'
    },
    {
      id: 9,
      image: './assets/internacionales/img-01.png',
      city: 'MADRID',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 10,
      image: './assets/internacionales/img-02.png',
      city: 'MIAMI',
      span: 'desde $218',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 11,
      image: './assets/internacionales/img-03.png',
      city: 'CANCÚN',
      span: 'desde $249',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 12,
      image: './assets/internacionales/img-04.png',
      city: 'BUENOS AIRES',
      span: 'desde $285',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 13,
      image: './assets/internacionales/img-05.png',
      city: 'SANTIAGO DE CHILE',
      span: 'desde $163',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 14,
      image: './assets/internacionales/img-06.png',
      city: 'MÉXICO',
      span: 'desde $244',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 15,
      image: './assets/internacionales/img-07.png',
      city: 'BOGOTÁ',
      span: 'desde $179',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 16,
      image: './assets/internacionales/img-08.png',
      city: 'NEY YORK',
      span: 'desde $443',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 17,
      image: './assets/internacionales/img-09.png',
      city: 'BARCELONA',
      span: 'desde $728',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    },
    {
      id: 18,
      image: './assets/internacionales/img-10.png',
      city: 'CARTAGENA',
      span: 'desde $208',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas',
      route: '/vuelos/destino'
    }
  ];
  constructor() { }
}
