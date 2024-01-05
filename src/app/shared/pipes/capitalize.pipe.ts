import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'capitalize'}) 
export class CapitalizePipe implements PipeTransform { 
  transform(value:any) { 
   if (value) { 
    const text = value.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1); 
    } return value; 
  } 
}

