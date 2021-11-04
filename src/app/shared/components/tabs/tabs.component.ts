import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  form!: FormGroup;
  selected = 'option1';
  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ];
  constructor() { }

  showOption: Boolean = true;
  showPasajero() {
    this.showOption = this.showOption ? false : true;
  }
  
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl('economy')
    })
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
