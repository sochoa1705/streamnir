import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'airport'}) 
export class AirportPipe implements PipeTransform { 
  transform(value:any) { 
   if (value) { 
      return value.includes('[') ? value.split('[')[1].slice(0, -1) : value;
    } return value; 
  } 
}

