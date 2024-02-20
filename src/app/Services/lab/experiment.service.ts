import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ExperimentService {

	constructor() {
	}

	getUserGroup(): string {
		const randomNumber = Math.random();
		return randomNumber < 0.5 ? 'A' : 'B';
	}
}
