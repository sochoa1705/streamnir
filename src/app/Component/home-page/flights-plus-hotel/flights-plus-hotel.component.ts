import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ThemeService } from 'src/app/api/api-nmviajes/services';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { ModelTaggingSlidersBanners } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { IGalleryImage, EGalleryCode } from 'src/app/Services/presenter/data-page-presenter.models';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { getFileName, Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flights-plus-hotel',
  templateUrl: './flights-plus-hotel.component.html',
  styleUrls: ['./flights-plus-hotel.component.scss']
})
export class FlightsPlusHotelComponent implements OnInit {

  destiny: any = [];

  slider: IGalleryImage[] = [];
  images: IGalleryImage[] = [];
  banners_corps: IGalleryImage[] = [];

  loadedGallery = false;

  themes: any;

  constructor(
    private coreService: DestinyService,
    public dataPagePresenterService: DataPagePresenterService,
    private _themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.listDestiny();
    this.getGallery();
    this.getThemes();
  }

  listDestiny() {
    let payload = new NMRequest();
    this.coreService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        this.destiny = response['Resultado']
        localStorage.setItem('destiny', JSON.stringify(this.destiny));
      },
      error: error => console.log(error),
    }
    )
  }

  toSlider(e: IGalleryImage, nombre: "slider" | "banner", index: number, array: number) {
    if (e.RedirectLink) window.open(e.RedirectLink, '_blank');
    if (e.PathImage) this.addTag(e, nombre, index, array)
  }

  getGallery() {
    this.dataPagePresenterService.getDataGallery().subscribe(data => {
      //this.sliderDestacados = data.filter(item => item.Code === EGalleryCode.slider_destacados).map(item => item.Images)[0];
      this.slider = data.filter(item => item.Code === EGalleryCode.slider_destacados || item.Code === EGalleryCode.slider_destacados2).map(item => item.Images)[0];
      this.slider.push(this.slider[0]);

      this.images = data.filter(item => item.Code === EGalleryCode.banners_destacados).map(item => item.Images)[0];
      this.banners_corps = data.filter(item => item.Code === EGalleryCode.banners_corporativos).map(item => item.Images)[0];

      this.loadedGallery = true;
    })
  }

  getThemes() {
    this._themeService.v1ApiThemeGet({
      'Parameter.Active': true,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      this.themes = JSON.parse(res).Result;
    });
  }

  addTag(gallery: IGalleryImage, nombre: "slider" | "banner", index: number, array: number) {

    let position = "";
    let nombreTagg: "Slider Principal" | "Banner Principal";

    if (nombre === "slider") {
      nombreTagg = "Slider Principal";
      position = `Slide ${index + 1} de ${array}`
    } else {
      nombreTagg = "Banner Principal";
      position = `Card ${index + 1} de ${array}`
    }

    const tag = new ModelTaggingSlidersBanners(
      getFileName(gallery.PathImage),
      gallery.NameImage,
      nombreTagg,
      position
    )

    TaggingService.clickSliderBanners(tag);
  }
}