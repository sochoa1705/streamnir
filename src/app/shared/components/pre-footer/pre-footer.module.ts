import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreFooterComponent } from './pre-footer.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PreFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [PreFooterComponent],

})
export class PreFooterModule { }
