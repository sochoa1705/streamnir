import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss']
})
export class RetailComponent {
  slider1Images = [
      'assets/retail/slider1/image-1.webp',
      'assets/retail/slider1/image-2.webp',
      'assets/retail/slider1/image-3.webp',
      'assets/retail/slider1/image-4.webp',
      'assets/retail/slider1/image-5.webp'
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
    'assets/retail/slider4/image-4.webp'
  ];

  constructor(private carouselConfig: NgbCarouselConfig, private router: Router) {
    this.carouselConfig.showNavigationIndicators = true;
    this.carouselConfig.interval = 3000;
    this.carouselConfig.pauseOnHover = false;
    this.carouselConfig.pauseOnFocus = false;
  }

  onRegistrationClick() {
    this.router.navigate(['/eventos']);
  }
}
