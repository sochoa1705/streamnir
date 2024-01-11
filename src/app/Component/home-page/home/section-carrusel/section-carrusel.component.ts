import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Pagination, Navigation, SwiperOptions, Autoplay } from 'swiper';


SwiperCore.use([Pagination, Navigation, Autoplay]);
@Component({
  selector: 'app-section-carrusel',
  templateUrl: './section-carrusel.component.html',
  styleUrls: ['./section-carrusel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionCarruselComponent implements OnInit {

  constructor() { }

  @Input() slidersWeb:any[]=[];
  @Input() slidersTablet:any[]=[];
  @Input() slidersMobil:any[]=[];

  config: SwiperOptions = {
    slidesPerView:1,
    slidesPerGroup:1,
		navigation: false,
		loop: true,
    spaceBetween:48,
    pagination:{
      clickable: true,
      dynamicBullets: this.slidersWeb.length > 4 ? true : false,
    },
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    }
	};

  configTablet: SwiperOptions = {
    slidesPerView:1,
    slidesPerGroup:1,
		navigation: false,
		loop: true,
    spaceBetween:48,
    pagination:{
      clickable: true,
      dynamicBullets: this.slidersTablet.length > 4 ? true : false,
    },
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    }
	};

  configMobile: SwiperOptions = {
    slidesPerView:1,
    slidesPerGroup:1,
		navigation: false,
		loop: true,
    spaceBetween:40,
    pagination:{
      clickable: true,
      dynamicBullets: this.slidersMobil.length > 4 ? true : false,
    },
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    }
	};

  ngOnInit(): void {
    
  }

  redirectLink(link:string){
    if(link!=='' && link.includes('http')) window.open(link, '_blank');
  }

}
