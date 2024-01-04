import { Pipe, PipeTransform } from '@angular/core';
import { IAereolineas } from '../aereolineas.interfaces';

@Pipe({
    name: 'porslide'
})

export class PorSlidePipe implements PipeTransform {
    transform(aereolineas: IAereolineas[], slideActual:number ,maxPorSilde:number): any {
        return aereolineas.slice((slideActual-1)*maxPorSilde, (maxPorSilde*slideActual) + 1);
    }
}