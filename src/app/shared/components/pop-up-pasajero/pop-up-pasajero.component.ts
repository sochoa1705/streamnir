import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PopupService } from 'src/app/Services/pop-up/popup.service';
import { Guid } from '../../utils';
import { DistributionObject, IDistributionObject } from './pop-up-pasajero.model';


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
  

  pasajeros = 0
  validPasajeros = false;

  idContent:string;

  idStateOpen:string = '';

  habitaciones:IDistributionObject[] = [ ];

  @Input() onlyPasajeros = false;
  @Input() habitacionDisabled = true;

  @Output() emitDistribution= new EventEmitter<string>();

  @Output() emitDistributionObject= new EventEmitter<IDistributionObject[]>();

  constructor(private popupService:PopupService) {
    this.idContent = `popup_${Guid()}`;
  }

  ngOnInit(){


    this.agregarHabitacion();

    this.popupService.state().subscribe(state=>{
      this.showOption = state.open;
      this.idStateOpen = state.id;

    }) 
    
  }


  agregarHabitacion(){
    const distributionInitial = new DistributionObject();
    this.habitaciones.push(distributionInitial);
  }

  eliminarHabitacion(i:number){
    this.habitaciones.splice(i,1);
  }

  isValid(){
    return true

  }

  showPasajero() {
    this.popupService.openPopUp(this.idContent);
    // this.showOption = this.showOption ? false : true;
  }

  closePopUp(){
    this.popupService.closePopUp(this.idContent);
  }

  public calculateDistributionTravel(distribution:IDistributionObject, optionTravel:'ninos' | 'adultos', optionAddRemove: number): void {

    switch(optionTravel) {
      case 'adultos' :
        distribution.nroAdultos += distribution.nroAdultos === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
      case 'ninos' :
        if(distribution.nroNinos == 0  && optionAddRemove === 0){
          return ;
        }else if( optionAddRemove === 1 ){
          distribution.addNino();
        }else if(distribution.nroNinos > 0  && optionAddRemove === 0){
          distribution.deleteNino();
        }
        break;
    }
  }


  savePasajeros(){    
    this.popupService.closePopUp(this.idContent);
  }

  public getDistributionUrl(pasajeros:any){
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
