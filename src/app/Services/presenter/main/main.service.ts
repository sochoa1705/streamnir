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
      link: "https://vacaciones.nmviajes.com/ES/holidays/search",
      external: true,
      icon: '/assets/menu/paquetes.svg'
    },
    {
      id: 2,
      text: "Vuelos + Hotel",
      link: "filtro",
      tab: 'vuelohotel',
      icon: '/assets/menu/vuelo-hotel.svg'
    },
    {
      id: 3,
      text: "Hoteles",
      link: "filtro",
      tab: 'hoteles',
      icon: '/assets/menu/hoteles.svg'
    },
    {
      id: 4,
      text: "Autos",
      // link: "filtro",
      link: "https://autos.nmviajes.com/es/site/",
      header: true,
      external: true,
      tab: 'autos',
      icon: '/assets/menu/auto.svg'
    },
    {
      id: 5,
      text: "Actividades",
      link: "filtro",
      tab: 'actividades',
      icon: '/assets/menu/actividad.svg'
    },
    {
      id: 6,
      text: "Seguros",
      link: "/seguros",
      header: true,
      tab: '',
      icon: '/assets/menu/seguros.svg'
    },
    {
      id: 7,
      text: "Descubre",
      link: "https://descubre.nmviajes.com/",
      footer: true,
      external: true
    },
    {
      id: 8,
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
