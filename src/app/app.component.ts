import { Component } from '@angular/core';
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

}
