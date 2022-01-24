import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IAerolineas } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  json = {
    filter: 'filter',
    title: '¡Falta poco! Confirma ahora tu reserva.',
    asistencia: true,
    reembolso: true,
    detalleViaje: true,
    detalleCobertura: false,
    cupon: true
  }

  private _flights:IAerolineas[];

  vueloEscogidoIda:IAerolineas;
  vueloEscogidoVuelta:IAerolineas;

  @Input() set flights(value: IAerolineas[] | null) {
    if (value) {
      console.log(value);
      this._flights = value;
    }
  }

  get flights() {
    return this._flights;
  }



  constructor(public route: Router) { }


  shop() {
    //console.log(this.form.value);
    let state2 = { ...this.json }
    localStorage.setItem('safe0', JSON.stringify(state2));

    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }
}
