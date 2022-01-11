import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuestraEmpresaComponent } from './nuestra-empresa.component';
import { MaterialModule } from '../../../shared/material.module';

@NgModule({
  declarations: [ NuestraEmpresaComponent ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ NuestraEmpresaComponent ],
})
export class NuestraEmpresaModule { }
