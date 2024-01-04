import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/Services/util/crypto.service';

@Component({
  selector: 'app-documentacion-viaje',
  templateUrl: './documentacion-viaje.component.html',
  styleUrls: ['./documentacion-viaje.component.scss']
})
export class DocumentacionViajeComponent implements OnInit {

  constructor(private _cryptoService: CryptoService) { }

  ngOnInit(): void {
    let userID: string = '';
    let user_existingCustomer: boolean = false;
    const credentials = localStorage.getItem('usuario');
    const bookings = localStorage.getItem('bookings');

    if (credentials) {
      const credentialsJson = JSON.parse(credentials);
      userID = this._cryptoService.encrypt(credentialsJson.email);

      if (bookings)
        user_existingCustomer = JSON.parse(bookings).length > 0;
    }

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "user_info",
      userID: userID,
      user_existingCustomer: user_existingCustomer
    });

    (window as any).dataLayer.push({
      event: "virtualPageView",
      virtualPagePath: "/documentacion-viaje",
      virtualPageTitle: "NMV: Documentacion de viaje"
    });
  }

  onPrint() {
    window.print();
  }
}
