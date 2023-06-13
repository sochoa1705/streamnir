import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss']
})
export class RetailComponent implements OnInit {
  slider1Images = [
      'assets/retail/slider1/image-1.webp',
      'assets/retail/slider1/image-2.webp',
      'assets/retail/slider1/image-3.webp',
      'assets/retail/slider1/image-4.webp',
      'assets/retail/slider1/image-5.webp'
  ];
  slider2Images = [
    'assets/retail/slider2/image-1.webp',
    'assets/retail/slider2/image-2.webp',
    'assets/retail/slider2/image-3.webp',
    'assets/retail/slider2/image-4.webp',
    'assets/retail/slider2/image-5.webp'
  ];
  slider3Images = [
    'assets/retail/slider3/image-1.webp',
    'assets/retail/slider3/image-2.webp',
    'assets/retail/slider3/image-3.webp',
    'assets/retail/slider3/image-4.webp',
    'assets/retail/slider3/image-5.webp'
  ];
  slider4Images = [
    'assets/retail/slider4/image-1.webp',
    'assets/retail/slider4/image-2.webp',
    'assets/retail/slider4/image-3.webp',
    'assets/retail/slider4/image-4.webp',
    'assets/retail/slider4/image-5.webp'
  ];

  constructor(private carouselConfig: NgbCarouselConfig) {
    this.carouselConfig.showNavigationIndicators = true;
    this.carouselConfig.interval = 3000;
    this.carouselConfig.pauseOnHover = false;
    this.carouselConfig.pauseOnFocus = false;
  }

  ngOnInit(): void {
  }

  onRegistrationClick() {
    location.href = 'https://www.nmviajes.com/eventos';
  }

}
