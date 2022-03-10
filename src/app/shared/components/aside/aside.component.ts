import { Component, Input, OnInit } from '@angular/core';
import { Aside } from 'src/app/Models/general/aside';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  @Input()
  slider!: Aside[];
  @Input()
  images!: Aside[];

  constructor() { }

  ngOnInit(): void {
  }
  toSlider(e: any) {
    console.log(e)
    this.addTag(e.titulo, e.detalle)
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
