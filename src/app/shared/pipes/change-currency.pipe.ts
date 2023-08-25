import { Pipe, PipeTransform } from '@angular/core';
import { GlobalComponent } from '../global';

@Pipe({
  name: 'changeCurrency'
})
export class ChangeCurrencyPipe implements PipeTransform {
  private exchangeRate: number = GlobalComponent.appExchangeRate.amount;

  transform(amount: number, change: string): number {
    if (change === 'PEN') {
      return amount * this.exchangeRate;
    } else if (change === 'USD') {
      return amount;
    } else {
      // Si se proporciona un change incorrecto, devolver el amount original
      return amount;
    }
  }
}