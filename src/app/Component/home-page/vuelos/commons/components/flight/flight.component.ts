import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

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
    const contador = interval(4000);
    contador.subscribe((n)=> {
      this.counter < 3 ? this.counter++ : this.counter = 1;
      this.counterMovil < 8 ? this.counterMovil++ : this.counterMovil = 1;
    })
  }

  toLine(e: any){
    this.route.navigateByUrl('/home/aerolineas')
  }
 /* codigo para los sliders de las compañias */
  counter: number = 1;
  counterMovil: number = 1;
  nextBtn() {
    this.counter < 3 ? this.counter++ : this.counter = 1;
  }
  afterBtn() {
    this.counter > 1 ? this.counter-- : this.counter = 3;
  }
  /* end code */
}
