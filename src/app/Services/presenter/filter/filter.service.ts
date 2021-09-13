import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  aerolineas: any[] = [
    {
      id: 0,
      img: "company.png",
      company: 'LATAM',
      checked: false
    },
    {
      id: 1,
      img: "company.png",
      company: 'American Airlines',
      checked: false
    },
    {
      id: 2,
      img: "company.png",
      company: 'Copa Airlines',
      checked: false
    },
    {
      id: 3,
      img: "company.png",
      company: 'Viva Air',
      checked: false
    },
    {
      id: 4,
      img: "company.png",
      company: 'Viva Colombia',
      checked: false
    },
    {
      id: 5,
      img: "company.png",
      company: 'Aero República',
      checked: false
    },
    {
      id: 6,
      img: "company.png",
      company: 'Aeroméxico',
      checked: false
    },
  ]
  constructor() { }
}
