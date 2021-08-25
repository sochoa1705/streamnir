import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ CustomersComponent ],
  imports: [
    CommonModule
  ],
  exports: [ CustomersComponent ],

})
export class CustomersModule { }
