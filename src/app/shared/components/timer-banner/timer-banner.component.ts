import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
	selector: 'app-timer-banner',
	templateUrl: './timer-banner.component.html',
	styleUrls: ['./timer-banner.component.scss']
})
export class TimerBannerComponent implements OnInit, OnDestroy {
	isDisplayed = false;
	offerDescription = '';

	startTime: number = Date.now();
	hours: number = 0;
	minutes: number = 0;
	seconds: number = 0;
	interval: any;

	constructor() { }

	ngOnInit(): void {
		this.offerDescription = environment.offerText;
		this.configTimer();
	}

	configTimer() {
		const expireDateSeparated = environment.offerExpireDate.split('-');
		this.startTime = new Date(+expireDateSeparated[0], +expireDateSeparated[1] - 1, +expireDateSeparated[2]).getTime();
		if (this.startTime > Date.now()) {
			this.isDisplayed = true;
			this.interval = setInterval(() => {
				const elapsed = Math.abs(Date.now() - this.startTime);
				this.hours = Math.floor(elapsed / (60 * 60 * 1000));
				this.minutes = Math.floor((elapsed % (60 * 60 * 1000)) / (60 * 1000));
				this.seconds = Math.floor((elapsed % (60 * 1000)) / 1000);
			}, 1000);
		}
	}

	get hoursFormatted(): string {
		return this.hours < 10 ? `0${this.hours}` : `${this.hours}`;
	}

	get minutesFormatted(): string {
		return this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
	}

	get secondsFormatted(): string {
		return this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
	}

	ngOnDestroy() {
		clearInterval(this.interval);
	}
}
