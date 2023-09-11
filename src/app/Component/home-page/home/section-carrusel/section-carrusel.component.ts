import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EGalleryCode, IGalleryImage } from 'src/app/Services/presenter/data-page-presenter.models';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
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
  
  /*pagination:{
    dynamicBullets: true,
  }*/
  sliderDestacados: IGalleryImage[] = [];
  bannersDestacados: IGalleryImage[] = [];
  bannersCorporativos: IGalleryImage[] = [];
  @Input() slidersJoin:any[]=[];
  
  config: SwiperOptions = {
    slidesPerView:1,
    slidesPerGroup:1,
		navigation: false,
		loop: true,
    spaceBetween:48,
    pagination:{
      clickable: true,
      dynamicBullets: true,
    },
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    }
	};

  ngOnInit(): void {
    
  }

}
