import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ TitleComponent ],
  imports: [
    CommonModule
  ],
  exports: [ TitleComponent ],

})
export class TitleModule { }
