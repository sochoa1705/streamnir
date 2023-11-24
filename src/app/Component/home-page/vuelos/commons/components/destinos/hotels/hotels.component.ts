import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/api/api-hotels/services';
import { GalleryService } from 'src/app/api/api-nmviajes/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
	@Input() city: any;
	@Input() site: any;
	@Input() isFlight: any;

	hotels: Array<any>;
	images: Array<any>;

	dynamicPackageUrl: string = '';

	tileConfig: NguCarouselConfig = {
		grid: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3, all: 0 },
		speed: 500,
		point: { visible: false },
		load: 3,
		touch: false,
		loop: false,
		easing: 'cubic-bezier(0, 0, 0.2, 1)'
	};

	carouselConfig: NguCarouselConfig = {
		grid: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, all: 0 },
		speed: 250,
		point: { visible: true, hideOnSingleSlide: true },
		touch: true,
		loop: true,
		interval: { timing: 3000 },
		animation: 'lazy'
	};

	constructor(private _hotelsService: HotelService,
	            private _activatedRoute: ActivatedRoute,
	            private _galleryService: GalleryService) {
	}

	ngOnInit(): void {
		this.dynamicPackageUrl = environment.urlPaqueteDinamico;

		this._activatedRoute.params.subscribe(params => {
			let city: string = this.city || params.city;
			let site: string = this.site || params.site;
			let isFlight: boolean = this.isFlight === undefined ? params.isflight : this.isFlight;
			this.getAllHotels(city, site, isFlight);
		});

		this.hideWhatsappBtn();
	}

  hideWhatsappBtn() {
    const url = window.location.href;
    if (url.indexOf('widgets') != -1) {
      const btnWhatsapp = document.getElementById('btn-whatsapp');
      if (btnWhatsapp) btnWhatsapp.style.display = 'none';
      const tooltip = document.getElementsByClassName('mat-tooltip');
      setTimeout(() => {
        if (tooltip && tooltip.length > 0)
          tooltip[0].parentElement!.style.display = 'none';
      }, 1000);
    }
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
