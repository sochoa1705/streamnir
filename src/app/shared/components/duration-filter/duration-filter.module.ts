import { NgModule } from '@angular/core';
import { DurationFilterComponent } from './duration-filter.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [DurationFilterComponent],
    declarations: [DurationFilterComponent],
    providers: [],
})
export class DurationFilterModule { }
