import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/api/api-nmviajes/services/flight.service';
import { ModelTaggingOfertasVuelos } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { getFileName, getItemWithExpiration, Guid, setItemWithExpiration } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flight-deals',
  templateUrl: './flight-deals.component.html',
  styleUrls: ['./flight-deals.component.scss']
})
export class FlightDealsComponent implements OnInit {
  airfare: any;
  limit: number = 4;

  constructor(private _flightService: FlightService, private _router: Router) {
  }

  ngOnInit(): void {
    this.getAirfare();
  }

  getAirfare(): void {
    this.airfare = getItemWithExpiration('mostWanted');
    if (this.airfare == null)
      this._flightService.v1ApiFlightGetMostWantedGet({
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        'Caller.Company': 'Expertia',
        'Caller.Application': 'NMViajes'
      }).subscribe((res: any) => {
        this.airfare = JSON.parse(res).Result;
        setItemWithExpiration('mostWanted', this.airfare, 5);
      });
  }

  viewRates(entity: any, index: number): void {
    this.addTag(entity, index, this.limit);
    this._router.navigateByUrl(`/vuelos/destino/LIM/${entity.DestinationCode}`);
  }

  addTag(entity: any, index: number, array: number) {
    let position = `Card ${index + 1} de ${array}`

    const tag = new ModelTaggingOfertasVuelos(
      getFileName(entity.Image),
      entity.Destination,
      "Oferta de Vuelos",
      position,
      `vuelos/destino/${entity.DestinationCode}`
    )

    TaggingService.clickOfertaVuelos(tag);
  }

  viewMoreOffers(): void {
    this.limit = this.limit + 4;
  }
}
