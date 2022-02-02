import { Pipe, PipeTransform } from '@angular/core';
import { removeTimeZonePart } from 'src/app/shared/utils';

@Pipe({
    name: 'withoutZone'
})

export class WithoutZonePipe implements PipeTransform {
    transform(fecha:string ): string {
        return removeTimeZonePart(fecha);
    }
}