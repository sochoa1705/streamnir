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
  ];
  count(valor: number, e: any) {
    let item = e.target.name;
    let pasajero = this.pasajeros[0][item];
    if (pasajero >= 100 && valor >= 0) {
      return pasajero = 100
    }
    if (pasajero <= 0 && valor < 0) {
      return pasajero = 0
    }
    return pasajero = pasajero + valor
  }

  customers(e: any) {
    let cdr: any = document.getElementById('cdr');
    let btn: any = e.clientY;
    let top = e.screenY;
    let top2 = e.clientY;
    let scrolTop = document.body.scrollHeight;
    let scren = window.innerHeight;
    let scrent = window.scrollY;
    console.log(scrent);
    console.log(btn);
    // console.log(scren);
    // console.log(scrent);
    let n =   btn + scrent;

    cdr.style = `display:block;top:${n}px; left: ${e.screenX}px; width:300px`;

  }

  customerClose(e: any){
    let cdr: any = document.getElementById('cdr');
    cdr.style = `display:none`;

  }

}
