import { Pipe, PipeTransform } from '@angular/core';
import 'moment-precise-range-plugin';
import * as moment from 'moment';

@Pipe({
    name: 'getDays'
})

export class GetDaysPipe implements PipeTransform {
    transform(date1: string, date2:string): number {

        const salida = moment(date1, moment.ISO_8601)
        const llegada = moment(date2, moment.ISO_8601)

        var daysSalida = salida.set({h:0,m:0})
        var daysLlegada = llegada.set({h:0,m:0})

        const differentDays = daysLlegada.diff(daysSalida,'days')

        return differentDays;
    }
}