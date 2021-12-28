import { Component } from '@angular/core';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PopupService } from './Services/pop-up/popup.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NuevoMundoViajes';
  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ]

  constructor(private popUpSubject: PopupService) {

    this.cerrarBoxClicFuera()
  }


  cerrarBoxClicFuera() {
    combineLatest([fromEvent(document, 'click'), this.popUpSubject.state()]).pipe(
      filter(resp => resp[1].open == true)
    ).subscribe(resp => {
      const htmlSelected = (resp[0].target as HTMLElement)
      const popUpElement = document.getElementById(resp[1].id);

      if (htmlSelected.contains(popUpElement)) {
        this.popUpSubject.closePopUp('')
      }

    })

  }


}
