import { NgModule } from '@angular/core';
import { DurationFilterComponent } from './duration-filter.component';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [CommonModule,Ng5SliderModule, ButtonModule],
    exports: [DurationFilterComponent],
    declarations: [DurationFilterComponent],
    providers: [],
})
export class DurationFilterModule { }
