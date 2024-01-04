import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { CardsTileComponent } from './cards-tile/cards-tile.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [
		OffersComponent,
		CardsTileComponent
	],
	imports: [
		CommonModule,
		NgxSpinnerModule
	]
})
export class OffersModule {
}
