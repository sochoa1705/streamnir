import {Component, OnInit} from '@angular/core';
import {countDownTimerConfigModel, CountdownTimerService, countDownTimerTexts} from "ngx-timer";
import {environment} from "../../../../environments/environment";

@Component({
	selector: 'app-timer-banner',
	templateUrl: './timer-banner.component.html',
	styleUrls: ['./timer-banner.component.scss']
})
export class TimerBannerComponent implements OnInit {
	isDisplayed = false;
	expireDate: Date;
	timerConfig: countDownTimerConfigModel;

	constructor(private countdownService: CountdownTimerService) { }

	ngOnInit(): void {
		this.configTimer();
	}

	configTimer() {
		const currentDate = new Date();
		const expireDateSeparated = environment.offerExpireDate.split('-');
		this.expireDate = new Date(+expireDateSeparated[0], +expireDateSeparated[1] - 1, +expireDateSeparated[2]);

		if (this.expireDate > currentDate) {
			this.isDisplayed = true;

			this.timerConfig = new countDownTimerConfigModel();
			this.timerConfig.timerClass = 'countdown-timer';

			this.timerConfig.timerTexts = new countDownTimerTexts();
			this.timerConfig.timerTexts.hourText = 'HH';
			this.timerConfig.timerTexts.minuteText = 'MM';
			this.timerConfig.timerTexts.secondsText = 'SS';

			this.countdownService.startTimer(this.expireDate);
		}

	}

}
