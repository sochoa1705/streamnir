import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  transform(value: string): string {
    if(value.length>0)
    return value.replace(/ - /g, ', ');
    return value
  }
}