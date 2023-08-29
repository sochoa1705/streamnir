import { NgModule } from '@angular/core';
import { PriceFilterComponent } from './price-filter.component';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
    imports: [CommonModule, Ng5SliderModule],
    exports: [PriceFilterComponent],
    declarations: [PriceFilterComponent],
    providers: [],
})
export class PriceFilterModule { }
