import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Models/blog/blog.interface';
import { BlogService } from 'src/app/Services/blog/blog.service';

@Component({
	selector: 'app-section-blog',
	templateUrl: './section-blog.component.html',
	styleUrls: ['./section-blog.component.scss']
})
export class SectionBlogComponent implements OnInit {
	constructor(private _blogService: BlogService) {}

	dataBlog: Blog[] = [];

	ngOnInit(): void {
		this._blogService.getDataBlog().subscribe({
			next: (res) => {
        res.forEach(blog=>{
          const prevCategories = blog.categories.replace(/\\/g, '');
          blog.categories=JSON.parse(prevCategories)
        })
				this.dataBlog=res;
        console.log(res,'ress')
			}
		});
	}
}
