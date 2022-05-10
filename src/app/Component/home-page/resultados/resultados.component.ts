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

    // window.addEventListener('message', function(event) {
    //   let frm = document.getElementById("iframeMotorVuelos");
    //   let height = event.data + 50;
    //   // @ts-ignore: Object is possibly 'null'.
    //   (frm || {}).style.height = height + 'px';
    // }); 

    window.addEventListener('message', function(event) {
      console.log('event height ', event);
      let frm = document.getElementById("iframeMotorVuelos");
      let height = event.data.data.height + 50;
      if(event.data.data.scroolTop){
        this.window.scrollTo(0,0);
      }
      // @ts-ignore: Object is possibly 'null'.
      (frm || {}).style.height = height + 'px';
    });
  }



  async getParams() {


    
    function getLinkerParam(uaNumber?:string) {

      var _ga:any = window[(window as any).GoogleAnalyticsObject];

      var trackers = _ga.getAll();

      var i;   

      for (i = 0; i < trackers.length; i++) {

        var _tracker = trackers[i];

        if (!uaNumber || _tracker.get('trackingId') === uaNumber) {

          return _tracker.get('linkerParam');

        }
      }

    }



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

      this.urlIframe = this.urlIframe + params + "&" + getLinkerParam();

    });
  }


}
