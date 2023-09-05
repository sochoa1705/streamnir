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
      text: "Arma tu viaje",
      //link: "armapaquete",
      link: "https://vacaciones.nmviajes.com/multidestination/",
      tab: '',
      icon: '/assets/menu/paquetes.svg',
      external: true,
    },
    {
      id: 2,
      text: "Hoteles",
      link: "hoteles",
      tab: '',
      icon: '/assets/menu/hoteles.svg'
    },
    {
      id: 3,
      text: "Actividades",
      link: "actividades",
      tab: '',
      icon: '/assets/menu/actividad.svg'
    },
    {
      id: 4,
      text: "Paquetes",
      //link: "paquetes",
      link: "https://vacaciones.nmviajes.com/ES/holidays/search",
      tab: '',
      icon: '/assets/menu/paquetes.svg',
      external: true
    },
    {
      id: 5,
      text: "Vuelos + Hotel",
      //link: "vuelohotel",
      link: "https://vacaciones.nmviajes.com/flight+hotel/",
      tab: '',
      icon: '/assets/menu/vuelo-hotel.svg',
      external: true,
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
      text: "Seguros",
      link: "/seguros",
      header: false,
      tab: '',
      icon: '/assets/menu/seguros.svg'
    }
  ]
  constructor() { }
  getMenu() {
    return of(this.menu)
  }
}
