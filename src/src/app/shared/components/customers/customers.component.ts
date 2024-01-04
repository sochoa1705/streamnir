import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor() { }

  showAgregarAdulto: Boolean = true;
  showDatosPasajero() {
    this.showAgregarAdulto = this.showAgregarAdulto ? false : true;
    console.log(this.showAgregarAdulto);
  }
  ngOnInit(): void {
  }

}
