import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuestrasAgenciasComponent } from './nuestras-agencias.component';
import { MaterialModule } from '../../../shared/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ NuestrasAgenciasComponent ],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	exports: [ NuestrasAgenciasComponent ]
})
export class NuestrasAgenciasModule {
}
