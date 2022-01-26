import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'horaPipe'
})

export class HoraPipe implements PipeTransform {
    transform(value: string | undefined): any {
        if(!value){
            return value
        }
       const array = value.split(".");
       if(array.length == 2){
        return `${array[0]}h ${array[1]}m`
       }
       return value
    }
}