import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  json = {
    filter: 'filter',
    title: '¡Falta poco! Confirma ahora tu reserva.',
    asistencia: true,
    reembolso: true,
    detalleViaje: true,
    detalleCobertura: false,
    cupon: true
  }

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  shop() {
    //console.log(this.form.value);
    let state2 = { ...this.json }
    localStorage.setItem('safe0', JSON.stringify(state2));

    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }
}
