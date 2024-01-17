import { NgModule } from '@angular/core';
import { DropdownFilterComponent } from './dropdown-filter.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [CommonModule, ButtonModule],
    exports: [DropdownFilterComponent],
    declarations: [
    DropdownFilterComponent
  ],
    providers: [],
})
export class DropdownFilterModule { }
