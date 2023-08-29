import { EventEmitter, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  busyRequestCount = 0;
  requestSearchCount = 0;
  endSearchGDS = new EventEmitter();

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: '',
      size: "large",
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: "#051977",

    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }

  }
}