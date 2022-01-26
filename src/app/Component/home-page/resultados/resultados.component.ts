import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DisponibilidadPayload } from 'src/app/shared/components/flights/models/flights.class';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { IAerolineas, ParamsVuelos } from './models/resultados.interfaces';
import { ResultadosService } from './services/resultados.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  showTabs!: boolean;
  selectedValue!: string;
  json = {
    filter: 'filter',
    title: '¡Falta poco! Confirma ahora tu reserva.',
    asistencia: true,
    reembolso: true,
    detalleViaje: true,
    detalleCobertura: false,
    cupon: true,
  };
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  flights: IAerolineas[];
  flightsOri: IAerolineas[];

  constructor(
    public route: Router,
    private service: ResultadosService,
    private ar: ActivatedRoute,
    private loader: LoaderSubjectService
  ) {
    this.showTabs = true;
  }

  ngOnInit() {
    this.loader.showText('Cargando los vuelos');
    this.loader.showLoader();
    this.getParams();
  }

  async getParams() {
    this.ar.queryParams.subscribe((resp) => {
      let {
        arrivalDate,
        businessCabin,
        departure,
        departureDate,
        destination,
        adults,
        infants,
        children,
        flightType,
      } = resp as ParamsVuelos;

      arrivalDate = moment(arrivalDate, 'DD/MM/YYYY').toISOString();
      departureDate = moment(departureDate, 'DD/MM/YYYY').toISOString();

      const payload = new DisponibilidadPayload(
        Number(flightType),
        departure,
        destination,
        departureDate,
        arrivalDate,
        Number(adults),
        Number(children),
        Number(infants),
        businessCabin
      );

      this.service.searchMv(payload).then((resp) => {
        this.flights = resp;
        this.flightsOri = resp;
        this.loader.closeLoader();
      });
    });
  }

  id: any = 'tabIda';
  showOption(ids: any) {
    this.id = ids;
    console.log(this.id);
  }

  tab(e: any) {
    // console.log(e.path[1].id);
    // console.log(e.path[0].id);
    let id = e.path[1].id;
    var nu = id.charAt(id.length - 1);
    // console.log(nu);

    let cdr: any = document.getElementsByClassName('mat-tab-body-content');
    // console.log(cdr);

    cdr[0].style.display = `none`;
  }

  shop() {
    //console.log(this.form.value);
    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }

  showTab() {
    this.showTabs = false;
  }

  filterChange(filter: any) {
    console.log(filter);
    this.flights = this.flightsOri.filter(
      (x) =>
        x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare.totalFare >=
          filter.precio.min &&
        x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare.totalFare <=
          filter.precio.max
    );
    // console.log(filter);
  }
}
