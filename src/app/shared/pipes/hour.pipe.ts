import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ampm'
})
export class AmPmPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    console.log(value)

    const hour = +value.split('T')[1].slice(0,2);
    console.log(hour)
    return hour >= 12 ? 'PM' : 'AM';
  }
}