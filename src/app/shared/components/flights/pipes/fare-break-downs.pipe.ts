import { Pipe, PipeTransform } from '@angular/core';
import { FareBreakDown } from 'src/app/Component/home-page/resultados/models/resultados.interfaces';
import { roundNumber } from '../../../../shared/utils';
@Pipe({
  name: 'fareBreak',
})
export class FareBreakPipe implements PipeTransform {
  transform(
    array: FareBreakDown[],
    type:
      | 'persona'
      | 'nroAdultos'
      | 'totalPrecioAdultos'
      | 'impuestos'
      | 'cargos'
      | 'precioFinal'
      | 'precioSoles',
    conversion?: number,
    currency?: string
  ): number {
    let resp: number | undefined;

    const adultos = array.find(
      (item) => item.passengerType.passengerTypeSearch == 'ADT'
    );

    let cantidad = adultos?.passengerType.quantity || 0;
    let costo = adultos?.passengerFare.baseFare || 0;
    const co = conversion != undefined ? conversion : 0;

    switch (type) {
      case 'persona':
        const bf = adultos?.passengerFare.baseFare || 0;

        resp = currency == 'dolares' ? bf : roundNumber(co * bf, 2);

        return resp || 0;

      case 'impuestos':
        const imp = adultos?.passengerFare.taxes || 0;

        resp = currency == 'dolares' ? imp : roundNumber(co * imp, 2);
        return resp*cantidad || 0;

      case 'cargos':
        const fee = adultos?.passengerFare.feeNMV || 0;
        resp = currency == 'dolares' ? fee : roundNumber(co * fee, 2);

        return resp*cantidad || 0;

      case 'nroAdultos':
        return cantidad;

      case 'precioFinal':
        const tf = adultos?.passengerFare.totalFare || 0;
        resp = currency == 'dolares' ? tf : roundNumber(co * tf, 2);

        return resp*cantidad;

      case 'totalPrecioAdultos':
        resp =
          currency == 'dolares'
            ? cantidad * costo
            : roundNumber(cantidad * costo * co, 2);
        return resp;

      case 'precioSoles':
        resp = adultos?.passengerFare.totalFare || 0;
        if (conversion) {
          return Math.round(resp * conversion * 100) / 100;
        } else {
          return 0;
        }
    }
  }
}
