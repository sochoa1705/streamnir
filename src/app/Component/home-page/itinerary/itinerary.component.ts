import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toUp } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

  urlIframe: string;

  constructor(
    public route: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    toUp()
    this.getParams();

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
    this._activatedRoute.params.subscribe(params => {
      const parameters = `/${params.transactionId}/${params.idGroup}/${params.segments}/${params.flightType}/${params.departureLocation}/${params.arrivalLocation}/${params.departureDate}/${params.arrivalDate}/${params.adults}/${params.children}/${params.infants}/${params.flightClass}`;

      //this.urlIframe = environment.urlIframeMotorVuelosItinerary + parameters;

      window.location.href = environment.urlIframeMotorVuelosItinerary + parameters;
    });
  }
}