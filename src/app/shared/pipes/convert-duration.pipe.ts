import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesFormat'
})
export class MinutesFormatPipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let formattedTime = '';
    formattedTime += `${hours==0 ? '00' : hours < 9 ? '0'+hours:hours}h `;
    if (remainingMinutes > 0 || formattedTime === '') {
      formattedTime += `${remainingMinutes < 9 ? '0'+remainingMinutes.toFixed(0):remainingMinutes.toFixed(0)}m`;
    }

    if(remainingMinutes==0){
      formattedTime +='00m'
    }

    return formattedTime.trim();
  }
}