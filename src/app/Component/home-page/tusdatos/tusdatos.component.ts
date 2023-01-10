import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/Services/util/crypto.service';

@Component({
  selector: 'app-tusdatos',
  templateUrl: './tusdatos.component.html',
  styleUrls: ['./tusdatos.component.scss']
})
export class TusdatosComponent implements OnInit {

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
      virtualPagePath: "/tusdatos",
      virtualPageTitle: "NMV: Tus datos"
    });

    window.addEventListener('message', function (event) {
      //console.log('event height ', event);

      let frm = document.getElementById("iframeTusDatos");
      let height = event.data + 50;
      if (event.data?.scroolTop) {
        this.window.scrollTo(0, 0);
      }

      // @ts-ignore: Object is possibly 'null'.
      (frm || {}).style?.height = height + 'px';
    });
  }
}
