import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
@Component({
  selector: 'app-aerolineas',
  templateUrl: './aerolineas.component.html',
  styleUrls: ['./aerolineas.component.scss']
})
export class AerolineasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const contador = interval(4000);
    contador.subscribe((n)=> {
      this.counter < 3 ? this.counter++ : this.counter = 1;
      this.counterMovil < 8 ? this.counterMovil++ : this.counterMovil = 1;
    })
  }

  id: any = "Internacional";
  showOption(ids: any) {
    this.id = ids;
  }

  aeroId: any = "Historia";
  showOptionAero(ids: any) {
    this.aeroId = ids;
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
