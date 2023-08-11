import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	declarations: [ ToolbarComponent ],
	imports: [
		CommonModule,
		MaterialModule,
		MatButtonModule,
		RouterModule,
		DirectivesModule
	],
	exports: [ ToolbarComponent ]
})
export class ToolbarModule {
}
