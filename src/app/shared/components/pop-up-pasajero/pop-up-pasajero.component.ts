import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PopupService } from 'src/app/Services/pop-up/popup.service';
import { Guid } from '../../utils';
import { PopUpPasajeroModel } from './pop-up-pasajero.model';

@Component({
  selector: 'app-pop-up-pasajero',
  templateUrl: './pop-up-pasajero.component.html',
  styleUrls: ['./pop-up-pasajero.component.scss'],
  animations:[
    trigger('openClose',[
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PopUpPasajeroComponent implements OnInit{

  showOption: Boolean = true;
  
  habitacion = 1;
  adultos = 0;
  ninos = 0;
  infantes = 0;
  validPasajeros = false;

  idContent:string;

  idStateOpen:string = '';

  @Input() onlyPasajeros = false;
  @Input() habitacionDisabled = true;

  @Output() emitPasajeros = new EventEmitter<PopUpPasajeroModel>()

  @ViewChild('boxFlotante') boxFlotante:ElementRef<HTMLElement> | undefined;

  constructor(private popupService:PopupService) {
    this.idContent = `popup_${Guid()}`;
  }

  ngOnInit(){
    this.popupService.state().subscribe(state=>{
      this.showOption = state.open;
      this.idStateOpen = state.id;
    })
    
  }

  showPasajero() {
    this.popupService.openPopUp(this.idContent);
    // this.showOption = this.showOption ? false : true;
  }

  closePopUp(){
    this.popupService.closePopUp(this.idContent);
  }

  public calculateDistributionTravel(optionTravel:string, optionAddRemove: number): void {

    switch(optionTravel) {
      case 'habitacion' :
        if(!this.habitacionDisabled){
          this.habitacion += this.habitacion === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        }
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

  savePasajeros(){
    const popUpPasajeroModel = new PopUpPasajeroModel(this.adultos,this.ninos,this.infantes,this.habitacion);
    this.emitPasajeros.emit(popUpPasajeroModel);
    this.closePopUp();
  }

}
