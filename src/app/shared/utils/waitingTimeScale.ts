import moment from "moment";
import { FlightSegment } from "src/app/api/api-checkout/models/rq-checkout-search";


export const getWaitingTime=(value: FlightSegment[]): number => {

   let sumTimeTotal=0;

    value.forEach((item,i)=>{
        if(i>0){
            const start:any = new Date(value[i-1].arrivalDateTime);
            const end:any = new Date(item.departureDateTime);
            let differenceInMilliseconds = end - start;
    
            let hours = Math.floor(differenceInMilliseconds / 3600000); // 1 hora = 3600000 milisegundos
            differenceInMilliseconds %= 3600000;
            let minutes = Math.floor(differenceInMilliseconds / 60000); // 1 minuto = 60000 milisegundos

            sumTimeTotal=sumTimeTotal + hours*60 + minutes;
            //console.log( sumTimeTotal,'sumtotal') 
        }
    })

   return sumTimeTotal;
}

function calculateTimeWait(durationTime:moment.PreciseRangeValueObject):number{
    const duration = moment.duration({
        months: durationTime.months,
        days: durationTime.days,
        hours: durationTime.hours,
        minutes: durationTime.minutes
    });

    const sumaTotalMinutos = Number(duration.asMinutes());

    return sumaTotalMinutos;
  }

