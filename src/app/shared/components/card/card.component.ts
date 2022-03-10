import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  itemList!: any[];
  // @Input()
  // image!: string;
  // @Input()
  // label!: string;
  // @Input()
  // destiny!: string;
  // @Input()
  // from!: string;
  // @Input()
  // span!: string;
  // @Input()
  // price!: number;
  // @Input()
  // link!: string;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.itemList);
  }
  toOfertas(e: any) {
    console.log(e)
    this.addTag(e.destiny, e.from, e.price)
  }
  addTag(titulo: string, detalle: string, precio: number) {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'nav_ofertasVuelos',
      'oferta_titulo': titulo,
      'oferta_detalle': detalle,
      'oferta_precio': precio
    })
  }
}
