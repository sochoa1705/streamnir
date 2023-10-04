import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { IGalleryImage, EGalleryCode } from 'src/app/Services/presenter/data-page-presenter.models';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit {

  destiny: any = [];

  slider: IGalleryImage[] = [];
  images: IGalleryImage[] = [];
  banners_corps: IGalleryImage[] = [];

  loadedGallery = false;

  constructor(
    private coreService: DestinyService,
    public dataPagePresenterService: DataPagePresenterService
  ) { }

  ngOnInit(): void {
    this.listDestiny();
    this.getGallery();
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
}
