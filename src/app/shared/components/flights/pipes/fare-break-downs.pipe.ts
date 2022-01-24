import { Pipe, PipeTransform } from '@angular/core';
import { FareBreakDown } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';

@Pipe({
    name: 'fareBreak'
})

export class FareBreakPipe implements PipeTransform {
    transform(array: FareBreakDown[], type: 'persona' | 'nroAdultos' | 'totalPrecioAdultos' | 'impuestos' | 'cargos' | 'precioFinal'):string {
        let resp:number | undefined;

        const adultos = array.find(item=>item.passengerType.passengerTypeSearch == 'ADT');

        switch(type){

            case 'persona':
                resp = adultos?.passengerFare.baseFare;
                return `$${resp}` ;

            case 'impuestos':
                resp = adultos?.passengerFare.taxes;
                return `$${resp}` ;

            case 'cargos':
                resp = adultos?.passengerFare.feeNMV;
                return `$${resp}` ;

            case 'nroAdultos':
                resp = adultos?.passengerType.quantity || 0;
                return `${resp} adultos` ;

            case 'precioFinal':
                resp = adultos?.passengerFare.totalFare || 0;
                return `$${resp}` ;

            case 'totalPrecioAdultos':
                let cantidad = adultos?.passengerType.quantity || 0;
                let costo = adultos?.passengerFare.baseFare || 0
                resp = cantidad * costo;
                return `$${resp}` ;
            }

    }
}