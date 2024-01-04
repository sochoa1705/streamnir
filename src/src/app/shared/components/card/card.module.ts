import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ CardComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [ CardComponent ],

})
export class CardModule { }
