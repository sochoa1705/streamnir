import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import {
  AirlineFilter,
  FilterResult,
} from 'src/app/shared/components/filter-result/models/filter-result.interfaces';
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

  //flights: IAerolineas[];
  flights: any[];
  flightsOri: IAerolineas[];
  filtersObj: FilterResult;

  exchangeRate: any;

  error = {
    isError: false,
    errorMessage: '',
  };

  constructor(
    public route: Router,
    private service: ResultadosService,
    private _snackBar: MatSnackBar,
    private ar: ActivatedRoute,
    private loader: LoaderSubjectService
  ) {
    this.showTabs = true;
  }

  ngOnInit() {
    this.filtersObj = { airlines: [] };
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

      this.service
        .searchMv(payload)
        .then((resp) => {
          this.error.isError = false;
          this.flights = resp.groups;
          this.flightsOri = resp.groups;
          this.filtersObj.airlines = resp.airlinesFilter.map((x) => {
            let airline: AirlineFilter = {
              code: x.code,
              name: x.name,
              imageUrl: x.imageUrl,
              checked: false,
            };

            return airline;
          });

          this.exchangeRate = resp.exchangeRate;

          console.log(resp);

          this.loader.closeLoader();
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err);

          this.error = {
            isError: true,
            errorMessage: err.message,
          };

          this.openSnackBar(err.message);

          this.loader.closeLoader();
        });
    });
  }

  id: any = 'tabIda';
  showOption(ids: any) {
    this.id = ids;
    console.log(this.id);
  }

  openSnackBar(message: string, action: string = 'Error') {
    this._snackBar.open(message, '', {
      duration: 2000 * 5,
    });
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
    this.loader.showText('Cargando los vuelos');
    this.loader.showLoader();

    console.log(filter);

    if (filter.price.currency == 'soles') {
      this.flights = this.flightsOri.filter(
        (x) =>
          x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
            .totalFare *
            this.exchangeRate.amount >=
            filter.price.min &&
          x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
            .totalFare *
            this.exchangeRate.amount <=
            filter.price.max
      );
    } else {
      this.flights = this.flightsOri.filter(
        (x) =>
          x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
            .totalFare >= filter.price.min &&
          x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
            .totalFare <= filter.price.max
      );
    }

    if (filter.airline.length > 0) {
      let af = this.flights.map((x) => {
        let df = x.departure[0].segments[0].flightSegments[0]
          ? x.departure[0].segments[0].flightSegments[0].marketingAirline.code
          : '';
        let dg = x.departure[0].segments[0].flightSegments[1]
          ? x.departure[0].segments[0].flightSegments[1].marketingAirline.code
          : '';

        let rf = x.returns.segments[0].flightSegments[0]
          ? x.returns.segments[0].flightSegments[0].marketingAirline.code
          : '';
        let rg = x.returns.segments[0].flightSegments[1]
          ? x.returns.segments[0].flightSegments[1].marketingAirline.code
          : '';

        if (
          filter.airline.find((ff: any) => ff == df) ||
          filter.airline.find((ff: any) => ff == dg) ||
          filter.airline.find((ff: any) => ff == rf) ||
          filter.airline.find((ff: any) => ff == rg)
        ) {
          return x;
        }
        return null;
      });

      this.flights = af.filter((x) => x != null);
    }

    // console.log(filter);
    this.loader.closeLoader();
  }
}
