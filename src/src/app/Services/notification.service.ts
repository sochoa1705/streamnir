import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export class NotificationModel {
  constructor(
    public show: boolean = false,
    public title: string = "Error",
    public message: string = "",
    public timeSecond: number = 5,

  ) { }
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private notification$ = new BehaviorSubject<NotificationModel>(new NotificationModel());

  constructor() { }

  showNotificacion(title = "Error", message: string, timeSecond = 5) {
    this.notification$.next(new NotificationModel(true, title, message, timeSecond));
  }

  getNotification() {
    return this.notification$.asObservable();
  }

}