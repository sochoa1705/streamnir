import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class PopupClass{
  constructor(
    public id = '',
    public open = false
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private popUpSubject = new BehaviorSubject<PopupClass>(new PopupClass());
  private objectSourceFirstDate  = new BehaviorSubject<Date>(new Date());

  $getObjectSourceFirstDate = this.objectSourceFirstDate.asObservable();

  constructor() { }

  state(){
    return this.popUpSubject.asObservable();
  }

  sendObjectSourceFirstDate(data: Date) {
    this.objectSourceFirstDate.next(data);
  }

  openPopUp(id:string){
    const popupClass = new PopupClass(id,true);
    this.popUpSubject.next(popupClass);
  }

  closePopUp(id:string){
    const popupClass = new PopupClass(id,false);
    this.popUpSubject.next(popupClass);
  }

  dispatch(){
    this.popUpSubject.next( {...this.popUpSubject.value} );
  }

}
