import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { ParamsVuelos } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';
import { IAereolineas } from 'src/app/shared/components/aereolineas/aereolineas.interfaces';
import { DisponibilidadPayload } from 'src/app/shared/components/flights/models/flights.class';
import { EnumCabins, EnumFlightType } from 'src/app/shared/components/flights/models/flights.interface';
import { objectToQueryString, toUp } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { FlightService } from '../flight/flight.service';
import { IDestinos } from './destino.models';
import { DestinosService } from './services/destinos.service';


export interface IVueloDestino {
  IataCode: string;
  OriginCode: string;
  Origin: string;
  DestinationCode: string;
  Destination: string;
  Rate: number;
  Tax: number;
  Total: number;
  DateStart: string;
  DateEnd: string;
  SearchTime: string;
}


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

  $aereolineas: Observable<IAereolineas[]>;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private service: DestinosService,
    private flightService: FlightService,
    private _router: Router
  ) {
    this.site = "nm_viajes";
    this.isFlight = false;
  }

  ngOnInit(): void {
    toUp()
    this.ar.params.subscribe(param => {
      this.loadCiudad(param)
    })

    this.loadAereolineas();
    this.slider();
  }

  loadCiudad(param: Params) {
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

  loadAereolineas() {
    this.$aereolineas = this.flightService.getAereolineas();
  }

  toLine(e: any) {
    this._router.navigateByUrl('/aerolineas')
  }

  generateParams(v: IVueloDestino) {
    return new ParamsVuelos(EnumFlightType.ida_vuelta.toString(), `${v.OriginCode} ${v.Origin}`, `${v.DestinationCode} ${v.Destination}`, v.DateStart, v.DateEnd, "1", "0", "0", EnumCabins.economico);
  }

  buscarVuelo(vuelo: IVueloDestino) {
    const params = this.generateParams(vuelo);

    this.router.navigate(['/vuelos/resultados'], { queryParams: params });
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


