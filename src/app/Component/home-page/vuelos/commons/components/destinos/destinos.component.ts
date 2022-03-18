import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval } from 'rxjs';
import { ParamsVuelos } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';
import { DisponibilidadPayload } from 'src/app/shared/components/flights/models/flights.class';
import { EnumCabins, EnumFlightType } from 'src/app/shared/components/flights/models/flights.interface';
import { objectToQueryString } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { IDestinos } from './destino.models';
import { DestinosService } from './services/destinos.service';


export interface IVueloDestino {
  IataCode:        string;
  OriginCode:      string;
  Origin:          string;
  DestinationCode: string;
  Destination:     string;
  Rate:            number;
  Tax:             number;
  Total:           number;
  DateStart:       string;
  DateEnd:         string;
  SearchTime:      string;
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

  constructor(
    private ar: ActivatedRoute,
    private router:Router,
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


// http://52.177.246.241/#/nmviajes/vuelos/resultados?flightType=1&departureLocation=LIM%20Lima,%20Per%C3%BA&arrivalLocation=MAD%20Madrid%20(Todos%20Los%20Aeropuertos),%20Espa%C3%B1a&departureDate=2022-04-21&arrivalDate=2022-04-24&adults=1&children=1&infants=1
// MotorvuelosFront


generateParams(v:IVueloDestino){

    return new ParamsVuelos(EnumFlightType.ida_vuelta.toString(), `${v.OriginCode} ${v.Origin}`, `${v.DestinationCode} ${v.Destination}`, v.DateStart,v.DateEnd,"1","0","0",EnumCabins.economico);
    
  }

  buscarVuelo(vuelo:IVueloDestino){
    const params = this.generateParams(vuelo);

    this.router.navigate(['/vuelos/resultados'], { queryParams: params});
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


