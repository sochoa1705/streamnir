import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuestrasAgenciasComponent } from './nuestras-agencias.component';
import { MaterialModule } from '../../../shared/material.module';

@NgModule({
  declarations: [ NuestrasAgenciasComponent ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ NuestrasAgenciasComponent ],
})
export class NuestrasAgenciasModule { }
