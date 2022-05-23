import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntermediaryService {

  private objectCalendarPriceSource = new BehaviorSubject<boolean>(false);

  $getObjectCalendarPriceSource = this.objectCalendarPriceSource.asObservable();

  sendChangeCalendarPrice(data: boolean) {
    this.objectCalendarPriceSource.next(data);
  }
}