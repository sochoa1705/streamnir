import { NgModule } from '@angular/core';
import { DropdownFilterComponent } from './dropdown-filter.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [DropdownFilterComponent],
    declarations: [
    DropdownFilterComponent
  ],
    providers: [],
})
export class DropdownFilterModule { }
