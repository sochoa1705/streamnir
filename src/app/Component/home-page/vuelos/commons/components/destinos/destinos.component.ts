import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval } from 'rxjs';
import { IDestinos } from './destino.models';
import { DestinosService } from './services/destinos.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss']
})
export class DestinosComponent implements OnInit {

  public codigoCiudad: string;
  public origen: string;
  public destino: string;

  public title: string;
  public subTitle: string;
  public description: string;

  site: string = "";
  isFlight: boolean = false;

  vuelos: IDestinos[];

  constructor(
    private ar: ActivatedRoute,
    private service: DestinosService
  ) {
    this.site = "nm_viajes";
    this.isFlight = false;
  }

  ngOnInit(): void {
    this.ar.params.subscribe(param => {
      this.loadCiudad(param)
    })

    this.slider();
  }

  loadCiudad(param: Params) {
    debugger

    this.codigoCiudad = param.codigoCiudad || '';

    this.service.getVuelos(this.codigoCiudad).subscribe(data => {
      this.vuelos = data;

      this.origen = data[0].Origin;
      this.destino = data[0].Destination;

      this.title = `Vuelos desde ${this.origen} a ${this.destino}`;
      this.subTitle = `Aprovecha ahora, encontramos los vuelos de ida y vuelta más baratos a ${this.destino}.`;
      this.description = `Las mejores ofertas de vuelos a ${this.destino} en las últimas 24 horas.`;

    })
  }

  slider() {
    const contador = interval(4000);
    contador.subscribe((n) => {
      this.counter < 3 ? this.counter++ : this.counter = 1;
      this.counterMovil < 8 ? this.counterMovil++ : this.counterMovil = 1;
    })
  }

  id: any = "option1";
  showOption(ids: any) {
    this.id = ids;
  }

  counter: number = 1;
  counterMovil: number = 1;
  nextBtn() {
    this.counter < 3 ? this.counter++ : this.counter = 1;
  }
  afterBtn() {
    this.counter > 1 ? this.counter-- : this.counter = 3;
  }
}


