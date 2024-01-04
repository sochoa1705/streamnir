import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Blog } from 'src/app/Models/blog/blog.interface';
import { BlogService } from 'src/app/Services/blog/blog.service';
import SwiperCore, { Pagination, Navigation, SwiperOptions, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);
@Component({
	selector: 'app-section-blog',
	templateUrl: './section-blog.component.html',
	styleUrls: ['./section-blog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SectionBlogComponent implements OnInit {
	constructor(private _blogService: BlogService) {}

	dataBlog: Blog[] = [];
	configMobile: SwiperOptions = {
		slidesPerView:1,
		slidesPerGroup:1,
		navigation: false,
		loop: false,
		spaceBetween:40,
		pagination:{
		  clickable: true,
		  dynamicBullets: false,
		}
	};

	ngOnInit(): void {
		this._blogService.getDataBlog().subscribe({
			next: (res) => {
        res.forEach(blog=>{
          const prevCategories = blog.categories.replace(/\\/g, '');
          blog.categories=JSON.parse(prevCategories)
        })
				this.dataBlog=res.slice(0,3);
			}
		});
	}
}
