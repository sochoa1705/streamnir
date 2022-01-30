import { Pipe, PipeTransform } from '@angular/core';
import { ENUM_ORDER_BY } from '../models/resultados.enum';

@Pipe({
    name: 'displayOrder'
})

export class DisplayOrderPipe implements PipeTransform {
    transform(value: number): string {
        if(value === ENUM_ORDER_BY.MENOR_TIEMPO){
            return "Menor tiempo de vuelo"
        }else if(value === ENUM_ORDER_BY.MAYOR_TIEMPO){
            return "Mayor tiempo de vuelo"
        }else if(value === ENUM_ORDER_BY.CONVENIENTE){
            return "Más conveniente"
        }else if(value === ENUM_ORDER_BY.PRECIO_BAJO){
            return "Precio más bajo"
        }else if(value === ENUM_ORDER_BY.PRECIO_ALTO){
            return "Precio más alto"
        }else{
            return "Más conveniente"
        }
    }
}