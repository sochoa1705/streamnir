import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  selected = 'option1';
  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  count(valor: number, e: any) {
    let item = e.target.name;
    let pasajero = this.pasajeros[0][item];
    if (pasajero >= 100 && valor >= 0) {
      return pasajero = 100
    }
    if (pasajero <= 0 && valor < 0) {
      return pasajero = 0
    }
    return pasajero = pasajero + valor
  }

  // customers() {
  //   var cdr: any = document.getElementById('cdr');
  //   cdr.style = 'display:block'

  // }

}
