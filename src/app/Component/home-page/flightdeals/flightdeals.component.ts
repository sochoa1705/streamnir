import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/api/api-nmviajes/services/flight.service';
import { ModelTaggingOfertasVuelos } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { getFileName, Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

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

  viewRates(entity: any,index:number): void {
    this.addTag(entity,index,this.limit);
    this._router.navigateByUrl(`/vuelos/destino/${entity.DestinationCode}`);
  }

  addTag(entity:any,index:number, array:number) {

    let  position = `Card ${index + 1} de ${array}` 
   
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
