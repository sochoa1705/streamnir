import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsVuelos } from './models/resultados.interfaces';
import { objectToQueryString, toUp } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { IframeMotorVuelos } from './models/resultados.class';
import { EnumFlightType } from 'src/app/shared/components/tabs/tabs.models';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {


  urlIframe:string;

  constructor(
    public route: Router,
    private ar: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    toUp()
    this.getParams();

    window.addEventListener('message', function(event) {
      let frm = document.getElementById("iframeMotorVuelos");
      let height = event.data + 50;
      // @ts-ignore: Object is possibly 'null'.
      (frm || {}).style.height = height + 'px';
    }); 
  }



  async getParams() {

    this.ar.queryParams.subscribe((resp) => {

      this.urlIframe = environment.urlIframeMotorVuelos ;

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
      } = resp as ParamsVuelos;
      
      const disponibilidadPayload = new IframeMotorVuelos(
       {
        flightType: Number(flightType),
        flightClass: flightClass,
        departureLocation:departure,
        arrivalLocation: destination,
        departureDate: departureDate,
        arrivalDate:arrivalDate ,
        adults:  Number(adults),
        children: Number(children),
        infants:  Number(infants)
       }
      );

      let payload = {...disponibilidadPayload};

      if(payload.flightType == EnumFlightType.ida){
        delete payload.arrivalDate
      }
      
      const params = objectToQueryString(payload);

      this.urlIframe = this.urlIframe + "?" + params;

    });
  }


}
