import { Component, Input, OnInit } from '@angular/core';
import {NotificationService} from '../../../../Services/notification.service'

@Component({
  selector: 'app-notificacion-error',
  templateUrl: './notificacion-error.component.html',
  styleUrls: ['./notificacion-error.component.scss']
})
export class NotificacionErrorComponent implements OnInit{


  isShow = false;
  title:string
  message:string;

  constructor(private notificationService:NotificationService) { }


  ngOnInit(): void {

    this.notificationService.getNotification().subscribe(resp=>{
      this.isShow = resp.show;
      this.title = resp.title;
      this.message = resp.message;

      setTimeout(() => {
        this.isShow = false;
      }, resp.timeSecond*1000);

    })
  }





}
