import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  packages: any = [
    {
      id:0,
      image: './assets/23-Cusco.jpg',
      destiny: 'Cusco',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 54,
      link: '#',
      class: 'active'

    },
    {
      id:1,
      image: './assets/23-Cusco.jpg',
      destiny: 'Madrid',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 56,
      link: '#',
    },
    {
      id:2,
      image: './assets/23-Cusco.jpg',
      destiny: 'Miami',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 318,
      link: '#',
    },
    {
      id:3,
      image: './assets/23-Cusco.jpg',
      destiny: 'México',
      from: 'Desde lima',
      span: 'Elige tu próximo destino',
      price: 30,
      link: '#',
    },
    {
      id:4,
      image: './assets/package/13-RivieraMaya.jpg',
      label: 'saliendo de lima',
      destiny: 'México',
      city: 'Riviera maya',
      span: 'INCLUYE BOLETO',
      price: 699,
      link: '#',
      banner: 6,
      pack: '6 días / 5 noches'
    },
    {
      id:5,
      image: './assets/package/9-cancun.jpg',
      label: 'saliendo de lima',
      destiny: 'México',
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
      label: 'saliendo de lima',
      destiny: 'Perú',
      city: 'Vichayto',
      span: 'INCLUYE BOLETO',
      price: 249,
      link: '#',
      banner: 4,
      pack: '4 días / 3 noches'
    },
    {
      id:7,
      image: './assets/package/8-zorritos.jpg',
      label: 'saliendo de lima',
      destiny: 'Perú',
      city: 'Zorritos',
      span: 'INCLUYE BOLETO',
      price: 259,
      link: '#',
      banner: 4,
      pack: '4 días / 3 noches'
    },
    {
      id:8,
      image: './assets/package/2-iquitos.jpg',
      label: 'saliendo de lima',
      destiny: 'Perú',
      city: 'Iquitos',
      span: 'INCLUYE BOLETO',
      price: 199,
      link: '#',
      banner: 4,
      pack: '4 días / 3 noches'
    },
    {
      id:9,
      image: './assets/internacionales/cancun.jpg',
      city: 'MADRID',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas'
    },
    {
      id:10,
      image: './assets/internacionales/cancun.jpg',
      city: 'MIAMI',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas'
    },
    {
      id:11,
      image: './assets/internacionales/cancun.jpg',
      city: 'CANCÚN',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas'
    },
    {
      id:12,
      image: './assets/internacionales/cancun.jpg',
      city: 'BUENOS AIRES',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas'
    },
    {
      id:13,
      image: './assets/internacionales/cancun.jpg',
      city: 'SANTIAGO DE CHILE',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas'
    },
    {
      id:14,
      image: './assets/internacionales/cancun.jpg',
      city: 'MÉXICO',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas'
    },
    {
      id:15,
      image: './assets/internacionales/cancun.jpg',
      city: 'BOGOTÁ',
      span: 'desde $718',
      link: '#',
      banner: 4,
      fly: true,
      btn: 'Ver Tarifas'
    }
  ];
  constructor() { }
}
