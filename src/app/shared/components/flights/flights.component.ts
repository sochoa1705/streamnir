import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  shop() {
    //console.log(this.form.value);
    this.route.navigateByUrl('/home/comprar');
  }
}
