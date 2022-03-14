import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/api/api-nmviajes/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {

  destination: any;

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
    private _destinationsService: DestinationService
  ) {

  }

  ngOnInit(): void {
    debugger

    this.getAllDestinations('MAD');
  }

  getAllDestinations(code: string) {

    debugger

    this._destinationsService.v1ApiDestinationCodeGet({
      'Parameter.Code': code,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      debugger
      this.destination = JSON.parse(res).Result;
    });
  }


  id: any = "history";

  showInformation(ids: any): void {
    this.id = ids;
  }

  viewGallery(): void {

  }

}
