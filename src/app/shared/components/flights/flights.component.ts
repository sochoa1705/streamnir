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

  private _flights: IAerolineas[];

  vueloEscogidoIda: IAerolineas;
  vueloEscogidoVuelta: IAerolineas;

  segmentoDeparture: number
  segmentoReturn: number

  @Input() set flights(value: IAerolineas[] | null) {
    if (value) {
      console.log(value);
      this._flights = value;
    }
  }

  get flights() {
    return this._flights;
  }

  constructor(
    public route: Router,
  ) { }

  shop(vuelo: string) {
    console.log(vuelo)
    let flight = { ...this.json, ...{departure: this.segmentoDeparture, return: this.segmentoReturn, idGroup: vuelo}}
    localStorage.setItem('flight0', JSON.stringify(flight))
    console.log(flight)

    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }

  radioSelect(e: any, segmento: string) {
    if (segmento === 'return') {
      this.segmentoReturn = e.value
    } else {
      this.segmentoDeparture = e.value
    }
    console.log(segmento)
    console.log(this.segmentoReturn)
    console.log(this.segmentoDeparture)

  }
}
