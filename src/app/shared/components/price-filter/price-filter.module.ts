import { NgModule } from '@angular/core';
import { PriceFilterComponent } from './price-filter.component';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { CardResultSearchModule } from '../card-result-search/card-result-search.module';

@NgModule({
    imports: [CommonModule, Ng5SliderModule,CardResultSearchModule],
    exports: [PriceFilterComponent],
    declarations: [PriceFilterComponent],
    providers: [],
})
export class PriceFilterModule { }
