import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { FlightSegment } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';
import { IEscalaDetalleSegment } from '../models/flights.interface';

@Pipe({
    name: 'escalasPipe'
})

export class EscalasPipe implements PipeTransform {

    transform(value: FlightSegment[]): IEscalaDetalleSegment[] {
      
        const arrayResp:IEscalaDetalleSegment[] = [];

        let escala:IEscalaDetalleSegment;
        

        value.forEach((item,i)=>{
            if(i>0){
                const llegadaAvion = moment(value[i-1].arrivalDateTime, moment.ISO_8601);
                const salidaNuevoAvion = moment(item.departureDateTime, moment.ISO_8601);
        
                const durationTime =  moment.preciseDiff(llegadaAvion, salidaNuevoAvion, true);
                
                escala = {
                    ciudad: item.departureAirport.name,
                    tiempo_espera: this.calculateTimeWait(durationTime)
                  }
    
                arrayResp.push(escala);
            }
        })


       return arrayResp;
    }

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
      
}