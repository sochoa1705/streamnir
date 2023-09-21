import { Component, OnInit, ViewChild } from '@angular/core';
import { InputPassengersComponent } from '../../input-passengers/input-passengers.component';
import { InputRangeComponent } from '../../input-range/input-range.component';
import { InputSearchFlightComponent } from '../../input-search-flight/input-search-flight.component';
import { InputClassComponent } from '../../input-class/input-class.component';
import { NotificationService } from 'src/app/Services/notification.service';
import { AccountsService } from 'src/app/Services/accounts.service';
import { Router } from '@angular/router';
export interface Search {
  flightClass: number
  adults: number
  children: number
  infants: number
  arrivalLocation: string | null
  departureLocation: string | null
  arrivalDate: string
  departureDate?: string
}

@Component({
  selector: 'app-tab-vuelos-v2',
  templateUrl: './tab-vuelos-v2.component.html',
  styleUrls: ['./tab-vuelos-v2.component.scss']
})
export class TabVuelosV2Component implements OnInit {

  constructor(private _notification: NotificationService, private _accountService: AccountsService, private router: Router) { }

  @ViewChild('childPassengers') childPassengers!: InputPassengersComponent;
  @ViewChild('childClass') childClass!: InputClassComponent;
  @ViewChild('childInputs') childInputs!: InputSearchFlightComponent;
  @ViewChild('childDates') childDates!: InputRangeComponent;

  ngOnInit(): void {
  }

  typeFlight = 0

  search(){
      const valuesPassengers= this.childPassengers.getValues();
      const valuesClass=this.childClass.getValues();
      const valuesInputs=this.childInputs.getValues();
      const valuesDates=this.childDates.getValues();
      let messageError=''
   
      if(!valuesInputs.arrivalLocation) messageError='La salida es requerido'
      
      if(!valuesInputs.departureLocation) messageError=messageError + ' - El destino es requerido'
    
      if(valuesDates.departureDate=='') messageError=messageError + ' - La fecha inicio es requerido'

      if(valuesDates.arrivalDate=='' && this.typeFlight==0) messageError=messageError + ' - La fecha final es requerido'

      if(messageError!=='')
         this._notification.showNotificacion("Datos obligatorios sin completar", messageError);
      else {
         const route=this.getRoute({...valuesClass,...valuesPassengers,...valuesInputs, ...valuesDates });
         this.router.navigateByUrl(route);
      }     
  }

  getRoute(data:Search){
     const random = '?rand=' + Math.round(Math.random() * 10000000000);
     const userStorage = this._accountService.getUserStorage();
     const email=userStorage.email || ''
     return `/resultados${random}&departureLocation=${data.departureLocation}&arrivalLocation=${data.arrivalLocation}&departureDate=${data.departureDate}&arrivalDate=${data.arrivalDate}&adults=${data.adults}&children=${data.children}&infants=${data.infants}&flightType=${this.typeFlight}&flightClass=${data.flightClass}&lang=ES&email=${email}`
  }

  changeType(index:number){
      this.typeFlight=index;
  }

}
