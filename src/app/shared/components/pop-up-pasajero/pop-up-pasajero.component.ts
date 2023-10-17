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
  HostListener,
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


  numMaxPersonasHabitacion = 6;
  numMaxPersonas = 9;
  numMaxNroNinos = 4;
  numMaxHabitaciones = 4;

  showOption: Boolean = false;

  pasajeros = 0;
  validPasajeros = false;

  idContent: string;

  idStateOpen: string = '';

  habitaciones: DistributionObject[] = [];

  totalHabitacion=1;
  totalPasajeros=2;

  @Input() onlyPasajeros = false;
  @Input() habitacionDisabled = true;
  @Input() nroAdultos = 1;

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
    // this.habitaciones


    const distributionInitial = new DistributionObject(this.nroAdultos);


    const objBefore = this.distributionObject(this.habitaciones);

    const objAfter =this.distributionObject([distributionInitial]);

    if( objBefore.pasajeros + objAfter.pasajeros > this.numMaxPersonas ){
      this.notificationService.showNotificacion(
        'Error',
        `Se permiten máximo ${this.numMaxPersonas} personas`
      );
      return;
    }if( objBefore.habitacion + objAfter.habitacion > this.numMaxHabitaciones){
      this.notificationService.showNotificacion(
        'Error',
        `Se permiten máximo ${this.numMaxHabitaciones} habitaciones`
      );
      return;
    }
    


    this.habitaciones.push(distributionInitial);
  }

  eliminarHabitacion(i: number) {
    this.habitaciones.splice(i, 1);
  }

  isValid() {
    const objDistribution = this.distributionObject(this.habitaciones);

    return {
      isValid:objDistribution.pasajeros >= 1?true:false,
      message: "Requerido al menos un pasajero"
    }
  }

  showPasajero() {
    this.showOption = !this.showOption;
    if(this.showOption) this.popupService.openPopUp(this.idContent);
    if(!this.showOption) this.closePopUp();
  }

  closePopUp() {
    this.popupService.closePopUp(this.idContent);
  }

  public calculateDistributionTravel(
    distribution: DistributionObject,
    optionTravel: 'ninos' | 'adultos',
    optionAddRemove: number
  ): void {

    const objDistribution = this.distributionObject(this.habitaciones);

    if (
      distribution.nroNinos + distribution.nroAdultos === this.numMaxPersonasHabitacion &&
      optionAddRemove === 1
    ) {
      this.notificationService.showNotificacion(
        'Error',
         `Se permiten máximo ${this.numMaxPersonasHabitacion} personas por habitación `
      );
      return;
    }


    if (
      objDistribution.ninos === this.numMaxNroNinos &&
      optionTravel == 'ninos' &&
      optionAddRemove === 1
    ) {
      this.notificationService.showNotificacion(
        'Error',
        `Solo se permiten ${this.numMaxNroNinos} niños`
      );
      return;
    }

    if (
      objDistribution.ninos + objDistribution.adultos === this.numMaxPersonas &&
      optionAddRemove === 1
    ) {
      this.notificationService.showNotificacion(
        'Error',
         `Se permiten máximo ${this.numMaxPersonas} personas `
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
    const currentData=this.distributionObject(this.habitaciones);
    this.totalHabitacion=currentData.habitacion;
    this.totalPasajeros=currentData.pasajeros;
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

  public distributionObject(habitaciones: DistributionObject[]){


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

  @ViewChild('passengerHotel') miDiv: ElementRef;
	@HostListener('document:click', ['$event'])
	blurTag(event: MouseEvent) {
		if (this.miDiv && !this.miDiv.nativeElement.contains(event.target)) {
			this.showOption=false;
		}
	}
}
