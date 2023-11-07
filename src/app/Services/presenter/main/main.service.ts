import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  menu = [
    {
      id: 0,
      text: "Vuelos",
      link: "vuelos",
      active: 'active',
      tab: '',
      icon: '/assets/menu/vuelos.svg'
    },
    {
      id: 1,
      text: 'Paquetes',
      link: 'https://nm-viajes.paquetedinamico.com/?tripType=HOLIDAYS',
      tab: '',
      icon: '/assets/menu/paquetes.svg',
      external: true
    },
    {
      id: 2,
      text: 'Arma tu viaje',
      link: 'https://nm-viajes.paquetedinamico.com/?tripType=MULTI',
      tab: '',
      icon: '/assets/menu/paquetes.svg',
      external: true
    },
    {
      id: 3,
      text: 'Vuelos + Hotel',
      link: 'https://nm-viajes.paquetedinamico.com/?tripType=FLIGHT_HOTEL',
      tab: '',
      icon: '/assets/menu/vuelo-hotel.svg',
      external: true
    },
    {
      id: 4,
      text: 'Hoteles',
      link: 'https://nm-viajes.paquetedinamico.com/?tripType=ONLY_HOTEL',
      tab: '',
      icon: '/assets/menu/hoteles.svg',
      external: true
    },
    {
      id: 5,
      text: 'Ofertas',
      link: 'ofertas',
      tab: '',
      icon: '/assets/menu/ofertas.svg'
    },
    {
      id: 6,
      text: "Autos",
      link: "autos",
      tab: '',
      icon: '/assets/menu/auto.svg'
    },
    {
      id: 7,
      text: 'Actividades',
      link: 'https://nm-viajes.paquetedinamico.com/?tripType=ONLY_TICKET',
      tab: '',
      icon: '/assets/menu/actividad.svg',
      external: true
    },
    {
      id: 8,
      text: "Seguros",
      link: "/seguros",
      header: true,
      tab: '',
      icon: '/assets/menu/seguros.svg'
    },
    {
      id: 9,
      text: "Descubre",
      link: "https://descubre.nmviajes.com/",
      footer: true,
      external: true
    },
    {
      id: 10,
      text: "Blog: Mundo Viajero",
      link: "https://blog.nmviajes.com/",
      footer: true,
      external: true
    }
  ]
  constructor() { }
  getMenu() {
    return of(this.menu)
  }
}
