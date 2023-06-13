import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() carouselId: string = '';
  @Input() images: string[] = [];
  @Input() interval: number = 5000;

  constructor() { }

  ngOnInit(): void {
  }

  getIdXmlFormatted(): string {
    return `#${this.carouselId}`;
  }

}
