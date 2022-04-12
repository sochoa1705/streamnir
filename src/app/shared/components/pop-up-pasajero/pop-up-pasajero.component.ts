import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PopupService } from 'src/app/Services/pop-up/popup.service';
import { Guid } from '../../utils';
import {
  DistributionObject,
  DistributionObjectA,
  IDistributionObject,
  IDistributionObjectA,
  IDistributionObjectVuelos,
} from './pop-up-pasajero.model';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-pop-up-pasajero',
  templateUrl: './pop-up-pasajero.component.html',
  styleUrls: ['./pop-up-pasajero.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PopUpPasajeroComponent implements OnInit,OnChanges {
  showOption: Boolean = true;

  pasajeros = 0;
  validPasajeros = false;

  idContent: string;

  idStateOpen: string = '';

  habitaciones: IDistributionObject[] = [];

  @Input() onlyPasajeros = false;
  @Input() habitacionDisabled = true;

  @Output() emitDistribution = new EventEmitter<string>();

  @Output() emitDistributionObject = new EventEmitter<IDistributionObjectA>();

  constructor(
    private popupService: PopupService,
    private notificationService: NotificationService
  ) {
    this.idContent = `popup_${Guid()}`;
  }

  ngOnInit() {
    this.popupService.state().subscribe((state) => {
      this.showOption = state.open;
      this.idStateOpen = state.id;

      if (!state.open) {
        const distributionStr = this.getDistributionUrl(this.habitaciones);
                
        this.emitDistributionObject.emit( this.distributionObject(this.habitaciones) );
        this.emitDistribution.emit(distributionStr);
      }
    });

    this.agregarHabitacion();
  }

  ngOnChanges(){
    this.popupService.dispatch();
  }

  changeInputEdad(e: any, item: { edad: number }) {
    let value = e.target.value;

    if (value < 0) {
      e.target.value = 0;
    } else if (value > 17) {
      e.target.value = 17;
    }

    item.edad = e.target.value;
  }

  agregarHabitacion() {
    const distributionInitial = new DistributionObject();
    this.habitaciones.push(distributionInitial);
  }

  eliminarHabitacion(i: number) {
    this.habitaciones.splice(i, 1);
  }

  isValid() {
    return true;
  }

  showPasajero() {
    this.popupService.openPopUp(this.idContent);
    // this.showOption = this.showOption ? false : true;
  }

  closePopUp() {
    this.popupService.closePopUp(this.idContent);
  }

  public calculateDistributionTravel(
    distribution: IDistributionObject,
    optionTravel: 'ninos' | 'adultos',
    optionAddRemove: number
  ): void {
    if (
      distribution.nroNinos === 4 &&
      optionTravel == 'ninos' &&
      optionAddRemove === 1
    ) {
      this.notificationService.showNotificacion(
        'Error',
        'Solo se permiten 4 niños'
      );
      return;
    }

    if (
      distribution.nroNinos + distribution.nroAdultos === 10 &&
      optionAddRemove === 1
    ) {
      this.notificationService.showNotificacion(
        'Error',
        'Se permiten máximo 10 personas'
      );
      return;
    }

    switch (optionTravel) {
      case 'adultos':
        distribution.nroAdultos +=
          distribution.nroAdultos === 0 && optionAddRemove === 0
            ? 0
            : optionAddRemove === 1
            ? 1
            : -1;
        break;
      case 'ninos':
        if (distribution.nroNinos == 0 && optionAddRemove === 0) {
          return;
        } else if (optionAddRemove === 1) {
          distribution.addNino();
        } else if (distribution.nroNinos > 0 && optionAddRemove === 0) {
          distribution.deleteNino();
        }
        break;
    }
  }

  savePasajeros() {
    this.popupService.closePopUp(this.idContent);
  }


  getDistributionObj(habitaciones: IDistributionObject[]){

    let ninos = 0;
    let infantes = 0;

    if(habitaciones.length == 0){
      return {
        habitacion: 0,
        adultos:0,
        ninos: ninos,
        infantes:infantes,
        pasajeros: []
      }
    }

    habitaciones[0].ninos.forEach(item=>{
      if(item.edad <= 11 && item.edad >= 2){
        ninos ++;
      }else if (item.edad <2){
        infantes ++;
      }
    })

  return   {
      habitacion: 0,
      adultos:habitaciones[0].nroAdultos,
      ninos: ninos,
      infantes:infantes,
      pasajeros: []
    }

  }

  public distributionObject(habitaciones: IDistributionObject[]){


    const pasajeros =  habitaciones.reduce((acc,item)=>(acc += item.nroAdultos + item.nroNinos) , 0);
    const adultos =  habitaciones.reduce((acc,item)=>(acc += item.nroAdultos) , 0);
    const ninos =  habitaciones.reduce((acc,item)=>(acc += item.nroNinos ) , 0);



    return new DistributionObjectA(habitaciones.length, adultos,ninos,pasajeros);

  }

  public getDistributionUrl(habitaciones: IDistributionObject[]) {
    // 2-0::3-3-12,15,12

    let urlDistributon = '';

    habitaciones.forEach((habitacion, i, arr) => {
      let adultos = habitacion.nroAdultos;
      let ninos = habitacion.nroNinos;

      if (i == 0) {
        urlDistributon = adultos.toString();
      } else {
        urlDistributon += '::' + adultos.toString();
      }

      if (ninos > 0) {
        urlDistributon += `-${ninos}-`;
      } else {
        urlDistributon += '-0';
      }

      habitacion.ninos.forEach((nino, i, arr) => {
        urlDistributon += nino.edad.toString() + ',';
      });

      urlDistributon =
        urlDistributon.charAt(urlDistributon.length - 1) === ','
          ? urlDistributon.substring(0, urlDistributon.length - 1)
          : urlDistributon;
    });

    return urlDistributon;
  }
}
