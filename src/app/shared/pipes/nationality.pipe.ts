import { Pipe, PipeTransform } from "@angular/core";
import { GlobalComponent } from "../global";

@Pipe({name: 'nationality'}) 
export class NationalityPipe implements PipeTransform { 
  transform(value:any) { 
   if (value) { 
    const textNationality = GlobalComponent.listCountries.find(item=>item.code==value)?.name;
    return textNationality; 
    } return value; 
  } 
}
