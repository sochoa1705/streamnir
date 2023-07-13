import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-cards-tile',
	templateUrl: './cards-tile.component.html',
	styleUrls: [ './cards-tile.component.scss' ]
})
export class CardsTileComponent implements OnInit {
	@Input() list: any[];
	@Output() clickCard = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {
	}

	slide(direction: number) {
		const cardWrapper = document.querySelector('.card-slider-inner')!;
		const cardWidth = document.querySelector('.card-wrapper')!.clientWidth;
		const slideAmount = (cardWidth + 10) * direction; // Assuming a 10px margin between cards

		cardWrapper.scrollBy({ left: slideAmount, behavior: 'smooth' });
	}

	onClick(url: string) {
		this.clickCard.emit(url);
	}
}
