import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/Services/util/crypto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-canales-atencion',
  templateUrl: './canales-atencion.component.html',
  styleUrls: ['./canales-atencion.component.scss']
})
export class CanalesAtencionComponent implements OnInit {

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
      virtualPagePath: "/canales-de-atencion",
      virtualPageTitle: "NMV: Canales de atencion"
    });

    // Renombrando valores para SEO - Inicio
    document.getElementsByTagName("title")[0].innerHTML = environment.SEO.careChannels.title;

    let description = document.getElementsByName('description')[0];
    description.setAttribute("content", environment.SEO.careChannels.description);
    // Renombrando valores para SEO - Fin
  }

}
