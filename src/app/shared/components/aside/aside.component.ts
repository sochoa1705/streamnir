import { Component, Input, OnInit } from '@angular/core';
import { Aside } from 'src/app/Models/general/aside';
import { IGalleryImage, IGalleryService } from 'src/app/Services/presenter/data-page-presenter.models';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  @Input()
  slider!: IGalleryImage[];
  @Input()
  images!: IGalleryImage[];

  constructor() { }


  toSlider(e: IGalleryImage) {
    // this.addTag(e.titulo, e.detalle)
    if(e.RedirectLink){
      window.open(e.RedirectLink, '_blank');
    }
  }
  addTag(titulo: string, detalle: string) {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'nav_sliderDestinos',
      'slider_titulo': titulo,
      'slider_detalle': detalle
    })
  }
}
