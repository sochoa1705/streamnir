import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  constructor(
    public route: Router,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
  ) { }

  ngOnInit(): void {
  }

  toLine(e: any){
    this.route.navigateByUrl('/home/aerolineas')
  }

}
