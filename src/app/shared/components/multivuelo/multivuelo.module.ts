import { NgModule } from '@angular/core';
import { MultivueloComponent } from './multivuelo.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputSearchFlightModule } from '../input-search-flight/input-search-flight.module';
import { InputRangeModule } from '../input-range/input-range.module';
import { ButtonModule } from '../button/button.module';
import { InputClassModule } from '../input-class/input-class.module';
import { InputPassengersModule } from '../input-passengers/input-passengers.module';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        InputSearchFlightModule,
        InputRangeModule,
        ButtonModule,
        InputClassModule,
        InputPassengersModule,
    ],
    exports: [MultivueloComponent],
    declarations: [MultivueloComponent],
    providers: [],
})
export class MultivueloModule { }
