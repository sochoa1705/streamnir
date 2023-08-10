import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'flightDuration'}) 
export class FlightDurationPipe implements PipeTransform { 
  transform(value:any) { 
   if (value) { 
    const text = value.split('.');
    return text[0] + 'h ' + text[1] + 'm'
    } return '00h 00m'; 
  } 
}

