import { Pipe, PipeTransform } from '@angular/core';
import 'moment-precise-range-plugin';
import * as moment from 'moment';

@Pipe({
    name: 'getDays'
})

export class GetDaysPipe implements PipeTransform {
    transform(date1: string, date2:string): number {

        const salida = moment(date1, moment.ISO_8601);
        const llegada = moment(date2, moment.ISO_8601);

        // console.log(moment(date1, moment.ISO_8601).format("DD/MM/YYYY, h:mm:ss a"));
        // console.log(moment(date2, moment.ISO_8601).format("DD/MM/YYYY, h:mm:ss a"));

        const durationTime =  salida.diff(llegada,'days');

        return durationTime;
    }
}