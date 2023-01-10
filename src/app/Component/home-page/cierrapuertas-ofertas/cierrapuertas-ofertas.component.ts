import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/Services/util/crypto.service';

@Component({
  selector: 'app-cierrapuertas-ofertas',
  templateUrl: './cierrapuertas-ofertas.component.html',
  styleUrls: ['./cierrapuertas-ofertas.component.scss']
})
export class CierrapuertasOfertasComponent implements OnInit {

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
      virtualPagePath: "/cierrapuertas/ofertas",
      virtualPageTitle: "NMV: Cierrapuertas ofertas"
    });
  }
}
