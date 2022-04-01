import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { AirlineService, FlightService } from 'src/app/api/api-nmviajes/services';
import { IAereolineas } from 'src/app/shared/components/aereolineas/aereolineas.interfaces';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { FlightService as AerolineaService } from '../vuelos/commons/components/flight/flight.service';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ParamsVuelos } from '../resultados/models/resultados.interfaces';
import { EnumCabins, EnumFlightType } from 'src/app/shared/components/flights/models/flights.interface';
import { IVueloDestino } from '../vuelos/commons/components/destinos/destinos.component';

@Component({
  selector: 'app-aerolineas',
  templateUrl: './aerolineas.component.html',
  styleUrls: ['./aerolineas.component.scss']
})
export class AerolineasComponent implements OnInit {

  $aereolineas: Observable<IAereolineas[]>;

  airline: any;
  nationalFlightDeals: any;
  internationalFlightDeals: any;

  currentDate: string;
  isNational: boolean = false;

  nationalLimit: number = 5;
  internationalLimit: number = 5;

  indexTab: number = 0;

  displayGallery: boolean;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private _aerolineaService: AerolineaService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _airlineService: AirlineService,
    private _flightService: FlightService
  ) {

  }

  ngOnInit(): void {
    this.addTag()
    this.loadAereolineas();

    this.currentDate = moment().format('DD/MM/YYYY');

    const contador = interval(4000);

    contador.subscribe((n) => {
      this.counter < 3 ? this.counter++ : this.counter = 1;
      this.counterMovil < 8 ? this.counterMovil++ : this.counterMovil = 1;
    })

    this._activatedRoute.params.subscribe(params => {
      this.getAirline(params.code);
      this.getNationalFlightDeals(params.code);
      this.getInternationalFlightDeals(params.code);
    });
  }

  getAirline(code: string) {
    this._airlineService.v1ApiAirlineIataCodeGet({
      'Parameter.IataCode': code,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      this.airline = JSON.parse(res).Result;
    });
  }

  getNationalFlightDeals(code: string): void {
    this._flightService.v1ApiFlightGetLastSearchesByAirlineGet({
      'Parameter.IataCode': code,
      'Parameter.Type': 'N',
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      this.nationalFlightDeals = JSON.parse(res).Result;
    });
  }

  getInternationalFlightDeals(code: string): void {
    this._flightService.v1ApiFlightGetLastSearchesByAirlineGet({
      'Parameter.IataCode': code,
      'Parameter.Type': 'I',
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      this.internationalFlightDeals = JSON.parse(res).Result;
    });
  }

  viewMoreNationalOffers(): void {
    this.nationalLimit = this.nationalLimit + 5;
  }

  viewMoreInternationalOffers(): void {
    this.internationalLimit = this.internationalLimit + 5;
  }

  activateTab(index: number): void {
    this.indexTab = index;
  }

  generateParams(entity: any) {
    const dateStart = moment(entity.DateStart, "DD/MM/YYYY").format("YYYY-MM-DD");
    const dateEnd = moment(entity.DateEnd, "DD/MM/YYYY").format("YYYY-MM-DD");

    return new ParamsVuelos(EnumFlightType.ida_vuelta.toString(), `${entity.OriginCode} ${entity.Origin}`, `${entity.DestinationCode} ${entity.Destination}`, dateStart, dateEnd, "1", "0", "0", EnumCabins.economico);
  }

  searchFlight(entity: any) {
    const params = this.generateParams(entity);

    this._router.navigate(['/vuelos/resultados'], { queryParams: params });
  }

  loadAereolineas() {
    this.$aereolineas = this._aerolineaService.getAereolineas();
  }

  // aeroId: any = "Historia";
  // showOptionAero(ids: any) {
  //   this.aeroId = ids;
  // }

  /* codigo para los sliders de las compañias */
  counter: number = 1;
  counterMovil: number = 1;
  nextBtn() {
    this.counter < 3 ? this.counter++ : this.counter = 1;
  }
  afterBtn() {
    this.counter > 1 ? this.counter-- : this.counter = 3;
  }
  /* end code */
  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'virtualPageView',
      'virtualPagePath': '/seguros',
      'virtualPageTitle': 'Aerolineas'
    })
  }

  toLine(entity: IAereolineas) {
    this._router.navigateByUrl(`/aerolineas/${entity.IataCode}`);
  }
}
