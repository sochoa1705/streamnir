import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesFormat'
})
export class MinutesFormatPipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let formattedTime = '';
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (remainingMinutes > 0 || formattedTime === '') {
      formattedTime += `${remainingMinutes.toFixed(0)}m`;
    }

    return formattedTime.trim();
  }
}