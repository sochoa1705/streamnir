import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FlightSegment, IAerolineas, Segment } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';
import { ClassDetalleLocalSt, ClassDetalleModalGeneralSegment, ClassDetalleModalSegment, ClassDetalleSegment, ClassEscalasDetalle, ClassPricingInfoDetalle } from './models/flights.class';
import { IEscalaDetalleSegment, IMovDetalleSegment, IVueloDetalleSegment } from './models/flights.interface';
import 'moment-precise-range-plugin';
import * as moment from 'moment';
import { FareBreakPipe } from './pipes/fare-break-downs.pipe';
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

  segmentoDeparture:number;
  segmentoReturn:number;

  segmentoDepartureObj:Segment;
  segmentoReturnObj:Segment;
  
  @Input() set flights(value: IAerolineas[]) {
    if (value) {
      this._flights = value;
    }
  }

  @Input() conversion:number;

  get flights() {
    return this._flights;
  }



  constructor(public route: Router, private fareBreakPipe:FareBreakPipe ) { }

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

    let escalas:ClassEscalasDetalle[] = [];

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

          let escalaObj = new ClassEscalasDetalle(item.departureAirport.name,this.calculateTimeWait(durationTime));

          escalas.push(escalaObj);
          
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
      isIda,
      segment.equipaje?.cabina?.piezas || 0,
      segment.equipaje?.piezas || 0,
      escalas
    )


    this.modalDetalle = new ClassDetalleModalSegment(
      general,
      detalle
    )

    return this.modalDetalle;
  }


  calculePrincing(){
    const fareBreak = this.vueloEscogidoIda.pricingInfo.itinTotalFare.fareBreakDowns;

    const pricingInf = new ClassPricingInfoDetalle(
        this.fareBreakPipe.transform(fareBreak, 'persona'),
        this.fareBreakPipe.transform(fareBreak, 'impuestos'),
        this.fareBreakPipe.transform(fareBreak, 'cargos'),
        this.fareBreakPipe.transform(fareBreak, 'nroAdultos'),
        this.fareBreakPipe.transform(fareBreak, 'precioFinal'),
        this.fareBreakPipe.transform(fareBreak, 'totalPrecioAdultos'),
        this.fareBreakPipe.transform(fareBreak, 'precioSoles',this.conversion),
      )

      return pricingInf;
  }

  shop(vuelo: string) {
    let flight = { ...this.json, ...{departure: this.segmentoDeparture, return: this.segmentoReturn, idGroup: vuelo}}
    localStorage.setItem('safe0', JSON.stringify(flight));


    const ida = this.selectVuelo(this.segmentoDepartureObj,true);
    const vuelta = this.selectVuelo(this.segmentoReturnObj,false);


    const pricingInf = this.calculePrincing();

    const detalleVuelo = new ClassDetalleLocalSt(ida,vuelta,pricingInf);

    localStorage.setItem('detalleVuelo', JSON.stringify(detalleVuelo));

    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }

  radioSelect(e: any, segmento: string, segment:Segment, vuelo:IAerolineas) {
    if (segmento === 'return') {
      this.segmentoReturn = e.value;
      this.segmentoReturnObj = segment;
      this.vueloEscogidoIda=vuelo;
    } else {
      this.segmentoDeparture = e.value;
      this.segmentoDepartureObj = segment;
      this.vueloEscogidoVuelta= vuelo;
    }

  }
}
