import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    public offersService: OffersService,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
  ) { }

  ngOnInit(): void {
  }

}
