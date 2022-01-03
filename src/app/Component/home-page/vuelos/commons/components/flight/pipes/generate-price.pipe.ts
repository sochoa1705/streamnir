import { Pipe, PipeTransform } from '@angular/core';
import { IFlightRates } from '../flight.models';

@Pipe({
    name: 'generateprice'
})

export class GeneratePricePipe implements PipeTransform {
    transform(value: IFlightRates): string {
        return '$' + value.Rate;
    }
}