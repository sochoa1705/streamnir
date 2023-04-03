import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/api/api-nmviajes/services';
import { ModelTaggingSlidersBanners } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { environment } from 'src/environments/environment';
import { getFileName, Guid } from '../../utils';

declare function expandBox(): void

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  @Input()
  slider!: IGalleryImage[];

  @Input()
  images!: IGalleryImage[];

  @Input()
  banners_corps!: IGalleryImage[];

  @Input()
  selectedTab: string;

  themes: any;

  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    private _themeService: ThemeService
  ) {

  }

  ngOnInit(): void {
    this.getThemes();
  }

  onImageClicked() {
    expandBox();
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

  toSlider(e: IGalleryImage, nombre: "slider" | "banner", index: number, array: number) {
    if (e.RedirectLink) window.open(e.RedirectLink, '_blank');
    if (e.PathImage) this.addTag(e, nombre, index, array)
  }

  addTag(gallery: IGalleryImage, nombre: "slider" | "banner", index: number, array: number) {
    let position: string;
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
