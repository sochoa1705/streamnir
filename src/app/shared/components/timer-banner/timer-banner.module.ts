import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerBannerComponent} from './timer-banner.component';
import {NgxTimerModule} from "ngx-timer";

@NgModule({
	declarations: [

		TimerBannerComponent
	],
	exports: [
		TimerBannerComponent
	],
	imports: [
		CommonModule,
		NgxTimerModule
	]
})
export class TimerBannerModule {
}
