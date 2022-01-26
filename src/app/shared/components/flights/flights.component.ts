import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FlightSegment, IAerolineas, Segment } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';
import { ClassDetalleModalGeneralSegment, ClassDetalleModalSegment, ClassDetalleSegment } from './models/flights.class';
import { IEscalaDetalleSegment, IMovDetalleSegment, IVueloDetalleSegment } from './models/flights.interface';
import 'moment-precise-range-plugin';
import * as moment from 'moment';
moment.locale('es')

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  json = {
    filter: 'filter',
    title: '¡Falta poco! Confirma ahora tu reserva.',
    asistencia: true,
    reembolso: true,
    detalleViaje: true,
    detalleCobertura: false,
    cupon: true
  }

  private _flights:IAerolineas[];

  vueloEscogidoIda:IAerolineas;
  vueloEscogidoVuelta:IAerolineas;

  modalDetalle:ClassDetalleModalSegment;;

  vueloActualModal:ClassDetalleSegment; 

  @Input() set flights(value: IAerolineas[] | null) {
    if (value) {
      console.log(value);
      this._flights = value;
    }
  }

  get flights() {
    return this._flights;
  }



  constructor(public route: Router) { }

  calculateTimeWait(durationTime:moment.PreciseRangeValueObject):string{
    let tiempo_espera:string;

    if(durationTime.months){
      tiempo_espera = `${durationTime.months}M ${durationTime.days}d ${durationTime.hours}h ${durationTime.minutes}m`
    }else if(durationTime.days){
      tiempo_espera = `${durationTime.days}d ${durationTime.hours}h ${durationTime.minutes}m`
    }else if(durationTime.hours){
      tiempo_espera = `${durationTime.hours}h ${durationTime.minutes}m`
    }else if(durationTime.minutes){
      tiempo_espera = `${durationTime.minutes}m`
    }else {
      tiempo_espera = '0'
    }

    return tiempo_espera;
  }


  selectVuelo(segment:Segment, isIda:boolean){

    const detalle:ClassDetalleSegment[] = [];

    segment.flightSegments.forEach((item,i, array)=>{
    
      let salida:IMovDetalleSegment;
      let llegada:IMovDetalleSegment;
      let vuelo:IVueloDetalleSegment;
      let escala:IEscalaDetalleSegment;

      let obj:ClassDetalleSegment;

        salida = {
          dia:  moment(item.departureDateTime, moment.ISO_8601).format('D MMM'),
          cod_ciudad:item.departureAirport.code,
          hora: moment(item.departureDateTime, moment.ISO_8601).format('HH:mm A'),
          aeropuerto:item.departureAirport.airport
        }

        llegada = {
          dia:  moment(item.arrivalDateTime, moment.ISO_8601).format('D MMM'),
          cod_ciudad:item.arrivalAirport.code,
          hora: moment(item.arrivalDateTime, moment.ISO_8601).format('HH:mm A'),
          aeropuerto:item.arrivalAirport.airport
        }

        vuelo = {
          num_vuelo:item.flightNumber,
          aerolinea:item.marketingAirline.name,
          duracion:item.elapsedTime,
          logo: item.marketingAirline.imageUrl
        }

        if(i > 0){

        const llegadaAvion = moment(array[i-1].arrivalDateTime, moment.ISO_8601);
        const salidaNuevoAvion = moment(item.departureDateTime, moment.ISO_8601);

        const durationTime =  moment.preciseDiff(llegadaAvion, salidaNuevoAvion, true);
        
          escala = {
            ciudad: item.departureAirport.name,
            tiempo_espera: this.calculateTimeWait(durationTime)
          }
          
          obj = new ClassDetalleSegment(
            salida,
            llegada,
            vuelo,
            escala
          )
          
        }else{
          obj = new ClassDetalleSegment(
            salida,
            llegada,
            vuelo
          )
        }

        detalle.push(obj);
    })
    
    const general = new ClassDetalleModalGeneralSegment(
      segment.flightSegments[0].departureAirport.name,
      segment.flightSegments[segment.flightSegments.length - 1].arrivalAirport.name,
      isIda
    )

    this.modalDetalle = new ClassDetalleModalSegment(
      general,
      detalle
    )

    console.log(this.modalDetalle);
  }


  shop() {
    //console.log(this.form.value);
    let state2 = { ...this.json }
    localStorage.setItem('safe0', JSON.stringify(state2));

    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }
}
