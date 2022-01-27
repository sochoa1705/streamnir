import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroReclamacionesComponent } from './libro-reclamaciones.component';
import { MaterialModule } from '../../../shared/material.module';

@NgModule({
  declarations: [ LibroReclamacionesComponent ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ LibroReclamacionesComponent ],

})
export class LibroReclamacionesModule { }
