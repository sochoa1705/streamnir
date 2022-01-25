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
      tab: ''
    },
    {
      id: 1,
      text: "Paquetes",
      link: "https://nmviajes.paquetedinamico.com/ES/holidays/search",
      external: true
    },
    {
      id: 2,
      text: "Vuelos + Hotel",
      link: "filtro",
      tab: 'vuelohotel',
    },
    {
      id: 3,
      text: "Hoteles",
      link: "filtro",
      tab: 'hoteles'
    },
    {
      id: 4,
      text: "Autos",
      link: "filtro",
      header: true,
      tab: 'autos'
    },
    {
      id: 5,
      text: "Actividades",
      link: "filtro",
      tab: 'actividades'
    },
    {
      id: 6,
      text: "Seguros",
      link: "/home/seguros",
      header: true,
      tab: ''
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
