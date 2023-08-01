import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
	selector: 'app-cards-tile',
	templateUrl: './cards-tile.component.html',
	styleUrls: [ './cards-tile.component.scss' ]
})
export class CardsTileComponent implements OnChanges {
	@ViewChild('slider') slider!: ElementRef;

	@Input() id: string;
	@Input() list: any[];
	@Output() clickCard = new EventEmitter<string>();

	currentIndex = 0;
	maxIndex = 0;
	isLeftButtonVisible = false;
	isRightButtonVisible = true;

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.list && changes.list.currentValue.length > 0) {
			this.maxIndex = this.list.length - 1
			this.updateButtonsVisibility(0);
		}
	}

	slide(direction: number) {
		const cardWrapper = document.querySelector(`#${this.id}-sliderInner`)!;
		const cardWidth = document.querySelector(`#${this.id}-wrapper`)!.clientWidth;
		const slideAmount = (cardWidth + 10) * direction; // Assuming a 10px margin between cards

		const cardsQuantity = Math.round(this.slider.nativeElement.clientWidth / cardWidth);
		this.currentIndex += direction;
		this.updateButtonsVisibility(cardsQuantity);

		cardWrapper.scrollBy({ left: slideAmount, behavior: 'smooth' });
	}

	updateButtonsVisibility(cardsDisplayed: number) {
		this.isLeftButtonVisible = (this.currentIndex + cardsDisplayed) > cardsDisplayed;
		this.isRightButtonVisible = (this.currentIndex + cardsDisplayed) <= this.maxIndex;
	}

	onClick(url: string) {
		this.clickCard.emit(url);
	}
}
