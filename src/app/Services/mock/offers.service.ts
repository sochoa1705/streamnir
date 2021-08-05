import { Injectable } from '@angular/core';
import { Offers } from 'src/app/Models/general/offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  offers: any = [
    {
      id:0,
      image: './assets/23-Cusco.jpg',
      label: 'Alojamientos',
      destiny: 'Cusco',
      from: '',
      span: 'Reserva el alojamiento ideal',
      price: 54,
      link: '#',
    },
    {
      id:1,
      image: './assets/23-Cusco.jpg',
      label: 'Alojamientos',
      destiny: 'Madrid',
      from: '',
      span: 'Reserva el alojamiento ideal',
      price: 56,
      link: '#',
    },
    {
      id:2,
      image: './assets/23-Cusco.jpg',
      label: 'Alojamientos',
      destiny: 'Miami',
      from: '',
      span: 'Reserva el alojamiento ideal',
      price: 318,
      link: '#',
    },
    {
      id:3,
      image: './assets/23-Cusco.jpg',
      label: 'Alojamientos',
      destiny: 'México',
      from: '',
      span: 'Reserva el alojamiento ideal',
      price: 30,
      link: '#',
    },
  ];

  constructor() { }
}
