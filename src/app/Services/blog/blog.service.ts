import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Blog } from 'src/app/Models/blog/blog.interface';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	constructor(private _httpClient: HttpClient) {}

	getDataBlog() {
		let url = `${environment.urlBlog}/wp-json/mo/v1/latest-posts?custom_count=3`;
		return this._httpClient.get<Blog[]>(url);
	}
}
