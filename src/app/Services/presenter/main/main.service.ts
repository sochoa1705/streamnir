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
      active: 'active'
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
      link: "#",
      tab: 2,
    },
    {
      id: 3,
      text: "Hoteles",
      link: "#",
    },
    {
      id: 4,
      text: "Autos",
      link: "#",
      header: true
    },
    {
      id: 5,
      text: "Actividades",
      link: "#"
    },
    {
      id: 6,
      text: "Seguros",
      link: "/home/seguros",
      header: true
    },
    {
      id: 7,
      text: "Descubre",
      link: "#",
      footer: true
    },
    {
      id: 8,
      text: "Blog: Mundo Viajero",
      link: "#",
      footer: true
    }
  ]
  constructor() { }
  getMenu() {
    return of(this.menu)
  }
}
