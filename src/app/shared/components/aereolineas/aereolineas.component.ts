import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { IAereolineas } from './aereolineas.interfaces';


function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

@Component({
  selector: 'app-aereolineas',
  templateUrl: './aereolineas.component.html',
  styleUrls: ['./aereolineas.component.scss'],
})
export class AereolineasComponent {
  private _aereolineas: IAereolineas[];

  /* codigo para los sliders de las compañias */
  counter: number = 1;
  counterMovil: number = 1;

  public maxCounter= 1;
  public maxCounterMobile= 1;

  public imagenesPorSilder= 6;
  public imagenesPorSilderMobile= 3;

  maxCounterArray:number[]= [];
  maxCounterArrayMobile:number[]= [];

  tiempoSlider:number | null;

  isMobile = isMobile();

  @Input() set aereolineas(value: IAereolineas[] | null) {
    if (value) {
      this._aereolineas = value;
      this.calculateSlider(value);
    }
  }

  get aereolineas() {
    return this._aereolineas;
  }

  @Output() redirigir = new EventEmitter<IAereolineas>();

  constructor() {}

  calculateSlider(aereolineas: IAereolineas[]) {
    const nroData = aereolineas.length;
    this.maxCounter = Math.ceil(nroData/this.imagenesPorSilder);
    this.maxCounterMobile = Math.ceil(nroData/this.imagenesPorSilderMobile);

    this.maxCounterArray = Array(this.maxCounter).fill(1).map((x,i)=>i+1);
    this.maxCounterArrayMobile = Array(this.maxCounterMobile).fill(1).map((x,i)=>i+1);

    // Entran 12 imagenes por slider

    if(this.tiempoSlider){
      const contador = interval(this.tiempoSlider);
      contador.subscribe((n) => {
        this.counter < this.maxCounter ? this.counter++ : (this.counter = 1);
        this.counterMovil < 8 ? this.counterMovil++ : (this.counterMovil = 1);
      });
    }
  }

  nextBtn() {
    this.counter < this.maxCounter ? this.counter++ : (this.counter = 1);
  }
  afterBtn() {
    this.counter > 1 ? this.counter-- : (this.counter = this.maxCounter);
  }

  toLine(aereolinea: IAereolineas) {
    this.redirigir.emit(aereolinea);
    // this.route.navigateByUrl('/home/aerolineas')
  }
}
