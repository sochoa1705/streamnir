import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsabilidadSocialComponent } from './responsabilidad-social.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ ResponsabilidadSocialComponent ],
  exports: [ ResponsabilidadSocialComponent ],
  imports: [
    CommonModule
  ]
})
export class ResponsabilidadSocialModule { }
