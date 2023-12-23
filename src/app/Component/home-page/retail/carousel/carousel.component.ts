import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() carouselId: string = '';
  @Input() images: string[] = [];
  @Input() interval: number = 5000;
  @Input() imgHeight: string = 'auto';

  getIdXmlFormatted(): string {
    return `#${this.carouselId}`;
  }

}
