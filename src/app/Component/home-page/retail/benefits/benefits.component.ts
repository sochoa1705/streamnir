import { Component, ElementRef } from '@angular/core';

@Component({
	selector: 'app-benefits',
	templateUrl: './benefits.component.html',
	styleUrls: [ './benefits.component.scss' ]
})
export class BenefitsComponent {
	conditionsCollapsed = true;

	constructor(private elementRef: ElementRef) {
	}

	scrollCondiciones() {
		this.conditionsCollapsed = false;

		const el = this.elementRef.nativeElement.querySelector('#condiciones');
		el.scrollIntoView({ behavior: 'smooth' });
	}
}
