import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderSubjectService {
  private loaderSubject = new BehaviorSubject(false)
  loader$ = this.loaderSubject.asObservable()
  txtLoader!: any;
  showLoader() {
    if (this.loaderSubject.getValue()) {
      return
    }
    this.loaderSubject.next(true)
  }

  showText(txt: string){
    this.txtLoader = String(txt)
    this.loaderSubject.next(this.txtLoader)
  }

  closeLoader() {
    this.loaderSubject.next(false)
  }
}
