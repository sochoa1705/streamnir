import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsVuelos } from './models/resultados.interfaces';
import { objectToQueryString, toUp } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { IframeMotorVuelos, IframeMotorVuelosJson } from './models/resultados.class';
import { EnumFlightType } from 'src/app/shared/components/tabs/tabs.models';
import { CryptoService } from 'src/app/Services/util/crypto.service';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {


  urlIframe: string;

  constructor(
    public route: Router,
    private ar: ActivatedRoute,
    private _cryptoService: CryptoService
  ) {
  }

  ngOnInit() {
    toUp();
    this.getParams();

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
      virtualPagePath: "/nmviajes/search/resultados",
      virtualPageTitle: "NMV: Resultados"
    });

    // window.addEventListener('message', function(event) {
    //   let frm = document.getElementById("iframeMotorVuelos");
    //   let height = event.data + 50;
    //   // @ts-ignore: Object is possibly 'null'.
    //   (frm || {}).style.height = height + 'px';
    // }); 

    window.addEventListener('message', function (event) {
      console.log('event height ', event);
      let frm = document.getElementById("iframeMotorVuelos");
      let height = event.data?.data?.height + 50;
      if (event.data?.data?.scroolTop) {
        this.window.scrollTo(0, 0);
      }
      // @ts-ignore: Object is possibly 'null'.
      (frm || {}).style?.height = height + 'px';
    });
  }



  async getParams() {

    this.ar.queryParams.subscribe((resp) => {
      this.urlIframe = environment.urlIframeMotorVuelos + '?rand=' + Math.round(Math.random() * 10000000000) + "&";

      let {
        arrivalDate,
        flightClass,
        departure,
        departureDate,
        destination,
        adults,
        infants,
        children,
        flightType,
        json,
        email
      } = resp as ParamsVuelos;

      let disponibilidadPayload;
      let payload;
      if (resp.json) {
        disponibilidadPayload = new IframeMotorVuelosJson(
          {
            flightType: Number(flightType),
            flightClass: flightClass,
            adults: Number(adults),
            children: Number(children),
            infants: Number(infants),
            json: json,
            email: email
          }
        );

        payload = { ...disponibilidadPayload };

      } else {

        disponibilidadPayload = new IframeMotorVuelos(
          {
            flightType: Number(flightType),
            flightClass: flightClass,
            departureLocation: departure,
            arrivalLocation: destination,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
            adults: Number(adults),
            children: Number(children),
            infants: Number(infants),
            email: email
          }
        );

        payload = { ...disponibilidadPayload };

        if (payload.flightType == EnumFlightType.ida) {
          delete (payload.arrivalDate);
        }
      }

      const params = objectToQueryString(payload);

      console.log('url iframe');
      console.log(this.urlIframe + params);


      this.urlIframe = this.urlIframe + params;

    });
  }


}
