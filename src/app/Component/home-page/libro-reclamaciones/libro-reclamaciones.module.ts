import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroReclamacionesComponent } from './libro-reclamaciones.component';
import { MaterialModule } from '../../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibroReclamacionesService } from '../../../Services/libro/libro-reclamaciones.service';

@NgModule({
  declarations: [LibroReclamacionesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [LibroReclamacionesComponent],
  providers: [LibroReclamacionesService]
})
export class LibroReclamacionesModule { }
