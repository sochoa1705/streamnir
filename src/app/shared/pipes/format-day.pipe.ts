import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'formatPipe'
})

export class FormatPipe implements PipeTransform {
    transform(date: string, format:string): string {
        return moment(date,moment.ISO_8601).format(format);
    }
}