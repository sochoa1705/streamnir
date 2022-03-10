import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionErrorComponent } from './notificacion-error/notificacion-error.component';



@NgModule({
  declarations: [
    NotificacionErrorComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    NotificacionErrorComponent
  ]
})
export class NotificationModule { }
