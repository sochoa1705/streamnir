import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-pasajero',
  templateUrl: './pop-up-pasajero.component.html',
  styleUrls: ['./pop-up-pasajero.component.scss']
})
export class PopUpPasajeroComponent {

  showOption: Boolean = true;
  
  habitacion = 1;
  adultos = 0;
  ninos = 0;
  infantes = 0;
  validPasajeros = false;

  @Input() onlyPasajeros = false;

  constructor() { }

  showPasajero() {
    this.showOption = this.showOption ? false : true;
  }

  public calculateDistributionTravel(optionTravel: string, optionAddRemove: number): void {
    switch(optionTravel) {
      case 'habitacion' :
        //this.habitacion += this.habitacion === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
      case 'adultos' :
        this.adultos += this.adultos === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
      case 'ninos' :
        this.ninos += this.ninos === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
      case 'infantes' :
        this.infantes += this.infantes === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
    }
  }

}
