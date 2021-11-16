import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from 'src/app/Services/businessUnit/business-unit.service';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  destiny: any = []
  destinyString: any

  constructor(
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public asidePresenterService: AsidePresenterService,
  ) { }

  ngOnInit(): void {
  }
}