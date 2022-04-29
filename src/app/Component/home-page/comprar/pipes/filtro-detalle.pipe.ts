import { Pipe, PipeTransform } from '@angular/core';
import { IFiltroVuelo } from '../interfaces/comprar.interfaces';

@Pipe({
    name: 'filtroDetalle'
})

export class FiltroDetallePipe implements PipeTransform {
    transform(value: IFiltroVuelo): string {
        if(value.flightType == 1){
            return `Solo Ida, ${value.adultos} adultos`;
        }else if(value.flightType == 2){
            return `Ida y vuelta, ${value.adultos} adultos`;
        }else if(value.flightType == 3){
            return `Multicity, ${value.adultos} adultos`;
        }else{
            return `0 adultos`;
        }
    }
}