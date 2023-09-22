import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthToText'
})
export class MonthToTextPipe implements PipeTransform {

  transform(monthNumber: number): string {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return 'Invalid Month';
    }
  }
}