import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/api/api-hotels/services';
import { GalleryService } from 'src/app/api/api-nmviajes/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotels: Array<any>;
  images: Array<any>;

  @Input()
  city: any;

  @Input()
  site: any;

  @Input()
  isflight: any;

  responsiveOptions: any[];

  urlPaqueteDinamico: string = '';

  constructor(
    private _hotelsService: HotelService,
    private _activatedRoute: ActivatedRoute,
    private _galleryService: GalleryService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.urlPaqueteDinamico = environment.urlPaqueteDinamico;

    this._activatedRoute.params.subscribe(params => {

      let city: string = this.city || params.city;
      let site: string = this.site || params.site;
      let isflight: boolean = this.isflight === undefined ? params.isflight : this.isflight;

      this.getAllHotels(city, site, isflight);

      let intervalId = setInterval(() => {
        let olark = document.getElementById("hbl-live-chat-wrapper");

        if (olark != null) {
          olark?.remove();
          clearInterval(intervalId);
        }
      }, 100);
    });
  }

  getAllHotels(city: string, site: string, isflight: boolean) {

    this._hotelsService.v1ApiHotelGet({
      'Parameter.Country': 'PE',
      'Parameter.City': city,
      'Parameter.Site': site,
      'Parameter.IsFlight': isflight,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {

      this.hotels = JSON.parse(res).Result;

      if (this.hotels.length === 0) {

        this._galleryService.v1ApiGalleryCodeGet({
          'Parameter.Code': 'WIDGET',
          TrackingCode: Guid(),
          MuteExceptions: environment.muteExceptions,
          'Caller.Company': "Agil",
          'Caller.Application': "Interagencias"
        }).subscribe((res: any) => {

          this.images = JSON.parse(res).Result.Images;
        });

      }
    });
  }

  validateScore(position: number, category: string): string {
    return Math.round(Number(category.substring(1))) < position ? 'star-null' : 'star';
  }
}
