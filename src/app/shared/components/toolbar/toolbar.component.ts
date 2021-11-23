import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public route: Router) { }

  main: any = [
    {
      id: 0,
      text: 'Vuelos',
      link: 'vuelos',
      active: 'active'
    },
    {
      id: 1,
      text: 'Paquetes',
      link: 'paquetes',
      active: ''
    },
    {
      id: 2,
      text: 'Vuelo + Hotel',
      link: 'vuelosh',
      active: ''
    },
    {
      id: 3,
      text: 'Hoteles',
      link: 'hoteles',
      active: ''
    },
    {
      id: 4,
      text: 'Autos',
      link: 'autos',
      active: ''
    },
    {
      id: 5,
      text: 'Actividades',
      link: 'activiaddes',
      active: ''
    },
    {
      id: 6,
      text: 'Seguros',
      link: 'seguros',
      active: ''
    },
  ]
  ngOnInit() {    
  }
  toHome() {
    this.route.navigateByUrl('/');
  }

}
