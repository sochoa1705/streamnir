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

  constructor() { }

  state(){
    return this.popUpSubject.asObservable();
  }

  openPopUp(id:string){
    const popupClass = new PopupClass(id,true);
    this.popUpSubject.next(popupClass);
  }

  closePopUp(id:string){
    const popupClass = new PopupClass(id,false);
    this.popUpSubject.next(popupClass);
  }

}
