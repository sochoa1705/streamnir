import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PopupService } from 'src/app/Services/pop-up/popup.service';
import { Guid } from '../../utils';
import { PasajerosConHabitacion, PasajerosSinHabitacion } from '../tabs/tabs.models';

export interface IDistributionObject{
  habitacion:number,
  adultos:number,
  ninos:number,
  infantes:number,
  pasajeros: any[],
}

@Component({
  selector: 'app-pop-up-pasajero-vuelos',
  templateUrl: './pop-up-pasajero-vuelos.component.html',
  styleUrls: ['./pop-up-pasajero-vuelos.component.scss'],
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
export class PopUpPasajeroVuelosComponent implements OnInit{

  showOption: Boolean = true;
  
  habitacion = 1;

  @Input() adultos  = 1;
  @Input() ninos = 0;
  @Input() infantes = 0;

  pasajeros = 0
  validPasajeros = false;

  idContent:string;

  idStateOpen:string = '';

  @Input() onlyPasajeros = false;
  @Input() habitacionDisabled = true;

  @Output() emitDistribution= new EventEmitter<string>();

  @Output() emitDistributionObject= new EventEmitter<IDistributionObject>();

  constructor(private popupService:PopupService) {
    this.idContent = `popup_${Guid()}`;
  }

  ngOnInit(){
    this.popupService.state().subscribe(state=>{
      this.showOption = state.open;
      this.idStateOpen = state.id;

      const popUpPasajeroModel = new PasajerosConHabitacion(this.adultos,this.ninos,this.infantes,this.habitacion);

      if(!state.open){
        const distribution = this.getDistributionUrl(popUpPasajeroModel);
        
          this.emitDistributionObject.emit(
            {
              habitacion:this.habitacion,
              adultos:this.adultos,
              ninos:this.ninos,
              infantes:this.infantes,
              pasajeros: []
            }
          );

          this.emitDistribution.emit(distribution);
      }
    }) 
    
  }

  isValid(){
    if(this.adultos>0){
      return true
    }
    return false
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
    this.popupService.closePopUp(this.idContent);
  }

  public getDistributionUrl(pasajeros:PasajerosSinHabitacion){
    let urlDistributon = pasajeros.adultos.toString();

    let ninos = pasajeros.infantes + pasajeros.ninos;

    if(ninos > 0) {
      urlDistributon += `-${ninos}-`;
    } else{
      urlDistributon += "-0";
    }
    for(let i=0;i<pasajeros.ninos;i++) {
      urlDistributon += "10,"
    }
    for(let i=0;i<pasajeros.infantes;i++) {
      urlDistributon += "2,"
    }
    urlDistributon = urlDistributon.charAt(urlDistributon.length - 1 ) === ',' ? urlDistributon.substring(0, urlDistributon.length - 1) : urlDistributon;
    return urlDistributon;
  }
}
