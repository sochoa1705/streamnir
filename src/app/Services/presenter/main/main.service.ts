import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

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
      text: "Paquetes",
      link: "paquetes",
      tab: '',
      icon: '/assets/menu/paquetes.svg'
    },
    {
      id: 2,
      text: "Arma tu viaje",
      link: "armapaquete",
      tab: '',
      icon: '/assets/menu/paquetes.svg'
    },
    {
      id: 3,
      text: "Vuelos + Hotel",
      link: "vuelohotel",
      tab: '',
      icon: '/assets/menu/vuelo-hotel.svg'
    },
    {
      id: 4,
      text: "Hoteles",
      link: "hoteles",
      tab: '',
      icon: '/assets/menu/hoteles.svg'
    },
    {
      id: 5,
      text: "Autos",
      link: "autos",
      tab: '',
      icon: '/assets/menu/auto.svg'
    },
    {
      id: 6,
      text: "Actividades",
      link: "actividades",
      tab: '',
      icon: '/assets/menu/actividad.svg'
    },
    {
      id: 7,
      text: "Seguros",
      link: "/seguros",
      header: true,
      tab: '',
      icon: '/assets/menu/seguros.svg'
    },
    {
      id: 8,
      text: "Descubre",
      link: "https://descubre.nmviajes.com/",
      footer: true,
      external: true
    },
    {
      id: 9,
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
