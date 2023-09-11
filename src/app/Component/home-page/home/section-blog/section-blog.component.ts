import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-blog',
  templateUrl: './section-blog.component.html',
  styleUrls: ['./section-blog.component.scss']
})
export class SectionBlogComponent implements OnInit {

  constructor() { }
  imageStoreDirectory='https://cdn.pixabay.com/photo/2023/09/05/16/49/mushroom-8235504_1280.jpg'

  ngOnInit(): void {
  }

}
