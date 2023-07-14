import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerBannerComponent} from './timer-banner.component';

@NgModule({
  declarations: [
    TimerBannerComponent
  ],
  exports: [
    TimerBannerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TimerBannerModule {
}
