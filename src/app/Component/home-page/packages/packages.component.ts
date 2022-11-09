import { Component, Input, OnInit } from '@angular/core';
import { ModelTaggingSlidersBanners } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { EGalleryCode, IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { getFileName } from 'src/app/shared/utils';

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

  constructor(
    public dataPagePresenterService: DataPagePresenterService
  ) { }

  ngOnInit(): void {
    this.getGallery();
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
