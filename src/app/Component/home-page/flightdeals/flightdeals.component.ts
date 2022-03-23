import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/api/api-nmviajes/services/flight.service';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { isThisTypeNode } from 'typescript';

@Component({
  selector: 'app-flightdeals',
  templateUrl: './flightdeals.component.html',
  styleUrls: ['./flightdeals.component.scss']
})
export class FlightDealsComponent implements OnInit {

  airfare: any;
  limit: number = 4;

  constructor(
    private _flightService: FlightService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAirfare();
  }

  getAirfare(): void {
    this._flightService.v1ApiFlightGetMostWantedGet({
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      this.airfare = JSON.parse(res).Result;
    });
  }

  viewRates(entity: any): void {
    this._router.navigateByUrl(`/vuelos/destino/${entity.DestinationCode}`);
  }

  viewMoreOffers(): void {
    this.limit = this.limit + 4;
  }
}
