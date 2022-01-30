import { HttpParams } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

var urlLogout = "http://localhost:8080/Login";

export function CloseSession(): void {
    if (localStorage.getItem('errorNuevoMundo')) {
      if (Number(localStorage.getItem('errorNuevoMundo')) > 0) {
        return;
      }
    }
    let urlSession = urlLogout;
  
    var win = window.open(
      urlSession,
      '_blank',
      'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none'
    );
    Sleep(win);
  }

  export function Sleep(win: any): void {
    var sleep = new Promise<void>(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 8000);
    });
    sleep.then(function () {
      win.close();
      localStorage.clear();
      window.location.replace(environment.urlLogin);
    });
  }

  export function Guid() {
    return Math.floor(Math.random() * 0x10000).toString(16);
  }

 export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

export class NmvModel{

  public params:HttpParams;

  constructor(){
    this.setParams();
  }

  setParams(){
    this.params = new HttpParams().
    set('TrackingCode', Guid()).
    set('MuteExceptions', environment.muteExceptions).
    set('Caller.Company', 'Agil').
    set('Caller.Application','Interagencias')
  }
}


export function removeTimeZonePart(dateString:string) {
  let finalDate = '';
  if (dateString.split('+').length > 1) {
      let b = dateString.split('+');
 
      finalDate = b[0];
  } else {
      let b = dateString.split('-');
       if (b.length > 1) {
        b.pop();
        finalDate = b.join('-');
      }
  }
  return finalDate;
}