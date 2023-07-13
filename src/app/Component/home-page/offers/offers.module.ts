import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { CardsTileComponent } from './cards-tile/cards-tile.component';

@NgModule({
	declarations: [
		OffersComponent,
		CardsTileComponent
	],
	imports: [
		CommonModule
	]
})
export class OffersModule {
}
