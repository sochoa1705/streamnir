import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/Services/util/crypto.service';
import { toUp } from 'src/app/shared/utils';

@Component({
  selector: 'app-condiciones-de-reserva',
  templateUrl: './condiciones-de-reserva.component.html',
  styleUrls: ['./condiciones-de-reserva.component.scss']
})
export class CondicionesDeReservaComponent implements OnInit {

  constructor(private _cryptoService: CryptoService) { }

  ngOnInit(): void {
    let userID: string = '';
    let user_existingCustomer: boolean = false;
    const credentials = localStorage.getItem('usuario');

    if (credentials) {
      const credentialsJson = JSON.parse(credentials);
      userID = this._cryptoService.encrypt(credentialsJson.email);
    }

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "user_info",
      userID: userID,
      user_existingCustomer: user_existingCustomer
    });

    (window as any).dataLayer.push({
      event: "virtualPageView",
      virtualPagePath: "/condiciones-de-reserva",
      virtualPageTitle: "NMV: Agenda tu cita"
    });

    toUp()
  }
}
