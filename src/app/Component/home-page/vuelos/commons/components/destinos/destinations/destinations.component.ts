import { Component, Input, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/api/api-nmviajes/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {

  @Input()
  city: any;

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
    this.getAllDestinations(this.city);
  }

  getAllDestinations(code: string) {

    // debugger

    this._destinationsService.v1ApiDestinationCodeGet({
      'Parameter.Code': code,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      // debugger
      this.destination = JSON.parse(res).Result;

      // this.destination.Galleries[0] = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Plaza_Mayor_de_Madrid_06.jpg';
      // this.destination.Galleries[1] = 'http://img.emg-services.net/htmlpages/htmlpage17358/untitled-design-2021-08-19t104428.272.jpg';
      // this.destination.Galleries.push('https://hotelesen.net/wp-content/uploads/Madrid-en-Espa%C3%B1a.jpg');
    });
  }


  id: any = "history";

  showInformation(ids: any): void {
    this.id = ids;
  }

  viewGallery(): void {

  }

}
