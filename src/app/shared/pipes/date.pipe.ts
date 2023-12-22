import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'formdate'}) 
export class FormDatePipe implements PipeTransform { 
  transform(value:string) { 
   if (value) { 
    const date = value.split('-');
    return date[2]+'/'+date[1]+'/'+date[0];
    } return value; 
  } 
}

