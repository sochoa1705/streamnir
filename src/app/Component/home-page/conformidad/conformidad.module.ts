import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConformidadComponent } from './conformidad.component';
import { CoverageModule } from 'src/app/shared/components/coverage/coverage.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ ConformidadComponent ],
  imports: [
    CommonModule,
    CoverageModule, 
  ],
  exports: [ ConformidadComponent ],

})
export class ConformidadModule { }
