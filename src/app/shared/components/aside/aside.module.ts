import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ AsideComponent ],
  imports: [
    CommonModule
  ],
  exports: [ AsideComponent ]
})
export class AsideModule { }
