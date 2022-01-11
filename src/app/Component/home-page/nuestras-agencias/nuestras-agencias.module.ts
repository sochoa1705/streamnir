import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuestrasAgenciasComponent } from './nuestras-agencias.component';
import { MaterialModule } from '../../../shared/material.module';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [ NuestrasAgenciasComponent ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule,
  ],
  exports: [ NuestrasAgenciasComponent ],
})
export class NuestrasAgenciasModule { }
