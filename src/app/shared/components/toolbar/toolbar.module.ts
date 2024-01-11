import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from '../button/button.module';
import { BurgerMenuModule } from '../burger-menu/burger-menu.module';
import { ToolbarMobileModule } from '../toolbar-mobile/toolbar-mobile.module';

@NgModule({
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	declarations: [ ToolbarComponent ],
	imports: [
		CommonModule,
		MaterialModule,
		MatButtonModule,
		RouterModule,
		DirectivesModule,
		ButtonModule,
		BurgerMenuModule,
		ToolbarMobileModule
	],
	exports: [ ToolbarComponent ]
})
export class ToolbarModule {
}
