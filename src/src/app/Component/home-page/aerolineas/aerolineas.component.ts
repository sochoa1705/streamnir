import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { AirlineService, FlightService } from 'src/app/api/api-nmviajes/services';
import { IAereolineas } from 'src/app/shared/components/aereolineas/aereolineas.interfaces';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { FlightService as AerolineaService } from '../vuelos/commons/components/flight/flight.service';
import * as moment from 'moment';
import { ParamsVuelos } from '../resultados/models/resultados.interfaces';
import { EnumCabinsVuelos, EnumFlightType } from 'src/app/shared/components/tabs/tabs.models';
import { CryptoService } from 'src/app/Services/util/crypto.service';

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
    private _flightService: FlightService,
    private _cryptoService: CryptoService
  ) {

  }

  ngOnInit(): void {
    this.loadAereolineas();

    this.currentDate = moment().format('DD/MM/YYYY');

    const contador = interval(4000);

    contador.subscribe((n) => {
      this.counter < 3 ? this.counter++ : this.counter = 1;
      this.counterMovil < 8 ? this.counterMovil++ : this.counterMovil = 1;
    })

    this._activatedRoute.params.subscribe(params => {
      let userID: string = '';
      let user_existingCustomer: boolean = false;
      const credentials = localStorage.getItem('usuario');
      const bookings = localStorage.getItem('bookings');

      if (credentials) {
        const credentialsJson = JSON.parse(credentials);
        userID = this._cryptoService.encrypt(credentialsJson.email);

        if (bookings)
          user_existingCustomer = JSON.parse(bookings).length > 0;
      }

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "user_info",
        userID: userID,
        user_existingCustomer: user_existingCustomer
      });

      (window as any).dataLayer.push({
        event: "virtualPageView",
        virtualPagePath: `/aerolineas/${params.code}`,
        virtualPageTitle: "NMV: Resultados"
      });

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
      this.isNational = this.nationalFlightDeals ? true : false;
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
      this.isNational = this.internationalFlightDeals ? false : true;
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
    return new ParamsVuelos(EnumFlightType.ida_vuelta.toString(), `${entity.OriginCode} ${entity.Origin}`, `${entity.DestinationCode} ${entity.Destination}`, entity.DateStart, entity.DateEnd, "1", "0", "0", EnumCabinsVuelos.economy);
  }

  searchFlight(entity: any) {
    const params = this.generateParams(entity);

    this._router.navigate(['/vuelos/resultados'], { queryParams: params });
  }

  loadAereolineas() {
    this.$aereolineas = this._aerolineaService.getAereolineas();
  }

  counter: number = 1;
  counterMovil: number = 1;

  nextBtn() {
    this.counter < 3 ? this.counter++ : this.counter = 1;
  }

  afterBtn() {
    this.counter > 1 ? this.counter-- : this.counter = 3;
  }



  onClick(entity: IAereolineas) {
    this.nationalLimit = 5;
    this.internationalLimit = 5;
  }
}
