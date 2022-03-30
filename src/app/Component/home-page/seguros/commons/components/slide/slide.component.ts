import { Component, OnInit } from '@angular/core';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    public route: Router,
  ) { }

  ngOnInit(): void {
    this.addTag()
    localStorage.removeItem('planes')
  }

  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'virtualPageView',
      'virtualPagePath': '/seguros',
      'virtualPageTitle': 'Seguros'
    })
  }

  portalAyuda() {
    // this.route.navigateByUrl("https://ayuda.nmviajes.com/support/home")
    // window.location.href="https://ayuda.nmviajes.com/support/home"
    window.open("https://ayuda.nmviajes.com/support/home", "_blank")
  }

}
