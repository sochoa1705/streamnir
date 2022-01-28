import { Pipe, PipeTransform } from '@angular/core';
import { FareBreakDown } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';

@Pipe({
    name: 'fareBreak'
})

export class FareBreakPipe implements PipeTransform {
    transform(array: FareBreakDown[], type: 'persona' | 'nroAdultos' | 'totalPrecioAdultos' | 'impuestos' | 'cargos' | 'precioFinal' | 'precioSoles', conversion?:number):number {
        let resp:number | undefined;

        const adultos = array.find(item=>item.passengerType.passengerTypeSearch == 'ADT');

        let cantidad = adultos?.passengerType.quantity || 0;
        let costo = adultos?.passengerFare.baseFare || 0

        switch(type){

        
            case 'persona':
                resp = adultos?.passengerFare.baseFare;
                return resp || 0 ;

            case 'impuestos':
                resp = adultos?.passengerFare.taxes;
                return resp || 0 ;

            case 'cargos':
                resp = adultos?.passengerFare.feeNMV;
                return resp || 0 ;

            case 'nroAdultos':
                resp = adultos?.passengerType.quantity || 0;
                return resp ;

            case 'precioFinal':
                resp = adultos?.passengerFare.totalFare || 0;
                return resp ;

            case 'totalPrecioAdultos':
           
                resp = cantidad * costo;
                return resp ;

            case 'precioSoles':
                resp = adultos?.passengerFare.totalFare || 0;
                if(conversion){
                    return Math.round((resp*conversion) * 100) / 100;
                }else{
                    return 0;
                }
            }

    }
}