import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-timer-banner',
	templateUrl: './timer-banner.component.html',
	styleUrls: [ './timer-banner.component.scss' ]
})
export class TimerBannerComponent implements OnInit, OnDestroy {
	isDisplayed = false;
	offerDescription = '';
	offerLink = '';

	startTime: number = Date.now();
	days: number = 0;
	hours: number = 0;
	minutes: number = 0;
	seconds: number = 0;
	interval: any;

	constructor() { }

	ngOnInit(): void {
		this.offerDescription = environment.offerText;
		this.offerLink = environment.offerLink;
		this.configTimer();
	}

	configTimer() {
		const expireDateSeparated = environment.offerExpireDate.split('T')[0].trim().split('-');
		const expireTimeSeparated = environment.offerExpireDate.split('T')[1].trim().split(':');
		this.startTime = new Date(
				+expireDateSeparated[0],
				+expireDateSeparated[1] - 1,
				+expireDateSeparated[2],
				+expireTimeSeparated[0],
				+expireTimeSeparated[1],
				+expireTimeSeparated[2]
		).getTime();

		if (this.startTime > Date.now()) {
			this.isDisplayed = true;
			this.interval = setInterval(() => {
				const elapsed = Math.abs(Date.now() - this.startTime);
				this.days = Math.floor(elapsed / (24 * 60 * 60 * 1000));
				this.hours = Math.floor((elapsed % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
				this.minutes = Math.floor((elapsed % (60 * 60 * 1000)) / (60 * 1000));
				this.seconds = Math.floor((elapsed % (60 * 1000)) / 1000);
			}, 1000);
		}
	}

	onClick() {
		if (this.offerLink) window.open(this.offerLink, '_blank')?.focus();
	}

	get daysFormatted(): string {
		return this.days < 10 ? `0${this.days}` : `${this.days}`;
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
