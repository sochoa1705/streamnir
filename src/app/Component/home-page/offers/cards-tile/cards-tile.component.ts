import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-cards-tile',
	templateUrl: './cards-tile.component.html',
	styleUrls: [ './cards-tile.component.scss' ]
})
export class CardsTileComponent {
	@Input() id: string;
	@Input() list: any[];
	@Output() clickCard = new EventEmitter<string>();

	constructor() { }

	slide(direction: number) {
		const cardWrapper = document.querySelector(`#${this.id}-sliderInner`)!;
		const cardWidth = document.querySelector(`#${this.id}-wrapper`)!.clientWidth;
		const slideAmount = (cardWidth + 10) * direction; // Assuming a 10px margin between cards

		cardWrapper.scrollBy({ left: slideAmount, behavior: 'smooth' });
	}

	onClick(url: string) {
		this.clickCard.emit(url);
	}
}
