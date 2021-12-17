import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getNombrePipe'
})

export class GetNombrePipe implements PipeTransform {
    transform(onlyPasajeros: boolean): string {
        return onlyPasajeros?'Pasajeros':"Habitación - Pasajero"
    }
}