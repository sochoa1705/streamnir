import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/api/api-nmviajes/services';
import { ModelTaggingSlidersBanners } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { EGalleryCode, IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { getFileName, Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  //@Input()
  //slider!: IGalleryImage[];

  slider: IGalleryImage[] = [];
  bannersDestacados: IGalleryImage[] = [];
  bannersCorporativos: IGalleryImage[] = [];

  loadedGallery = false;

  themes: any;

  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    private _themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.getGallery();
    this.getThemes();
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

      this.bannersDestacados = data.filter(item => item.Code === EGalleryCode.banners_destacados).map(item => item.Images)[0];
      this.bannersCorporativos = data.filter(item => item.Code === EGalleryCode.banners_corporativos).map(item => item.Images)[0];

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
