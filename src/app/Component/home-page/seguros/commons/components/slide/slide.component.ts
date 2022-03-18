import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  constructor(
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public route: Router,
  ) { }

  ngOnInit(): void {
    this.addTag()
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
