import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from 'src/app/api/api-nmviajes/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offers-continent',
  templateUrl: './offers-continent.component.html',
  styleUrls: ['./offers-continent.component.scss']
})
export class OffersContinentComponent implements OnInit {

  rates: Array<any>;

  constructor(
    private _flightService: FlightService,
    private _activatedRoute: ActivatedRoute
  ) { }

  name: string = '';
  description: string = '';

  ngOnInit(): void {
    // debugger

    this._activatedRoute.params.subscribe(params => {
      this.getAllContinents(params.slug);
    });
  }

  getAllContinents(slug: string) {
    // debugger

    this._flightService.v1ApiFlightGetContinentsGet({
      'Parameter.Status': true,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {

      // debugger

      let continents: Array<any> = JSON.parse(res).Result;

      const continent = continents.find(x => x.Slug === slug);

      if (continent) {
        const { ContinentCode, DestinationCode } = continent;
        this.name = continent.Name;
        this.description = continent.Description;

        this._flightService.v1ApiFlightGetLastSearchesByContinentGet({
          'Parameter.ContinentCode': ContinentCode,
          'Parameter.DestinationCode': DestinationCode,
          TrackingCode: Guid(),
          MuteExceptions: environment.muteExceptions,
          'Caller.Company': "Agil",
          'Caller.Application': "Interagencias"
        }).subscribe((res: any) => {
          // debugger

          this.rates = JSON.parse(res).Result;
        });
      }



    });
  }

  getRatesByContinent(continentCode: string, destinationCode: string) {
    this._flightService.v1ApiFlightGetLastSearchesByContinentGet({
      'Parameter.ContinentCode': continentCode,
      'Parameter.DestinationCode': destinationCode,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      // debugger

      this.rates = JSON.parse(res).Result;
    });
  }
}
