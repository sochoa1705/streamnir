import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/Services/util/crypto.service';
import { toUp } from '../../../shared/utils';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.scss']
})
export class PoliticasComponent implements OnInit {

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
      virtualPagePath: "/politicas",
      virtualPageTitle: "NMV: Politica de proteccion y tratamiento de datos personales"
    });

    toUp();
  }
}
