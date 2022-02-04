import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import {
  AirlineFilter,
  FilterResult,
  RangeFilter,
} from 'src/app/shared/components/filter-result/models/filter-result.interfaces';
import { DisponibilidadPayload } from 'src/app/shared/components/flights/models/flights.class';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { IVuelos } from '../vuelos/commons/components/flight/flight.models';
import { ResultadosPaginacion } from './models/resultados.class';
import { ENUM_ORDER_BY } from './models/resultados.enum';
import { IAerolineas, ParamsVuelos } from './models/resultados.interfaces';
import { FareBreakPipe } from './pipes/fare-break-downs.pipe';
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
  conversion: number;
  currency: string = "dolares";
  flightsOri: IAerolineas[];
  filtersObj: FilterResult;

  ENUM_ORDER_BY = ENUM_ORDER_BY;

  pag = new ResultadosPaginacion(5, 5);

  exchangeRate: any;

  error = {
    isError: false,
    errorMessage: '',
  };

  orderByActive: number = ENUM_ORDER_BY.PRECIO_BAJO;

  constructor(
    public route: Router,
    private service: ResultadosService,
    private _snackBar: MatSnackBar,
    private ar: ActivatedRoute,
    private loader: LoaderSubjectService,
    private fareBreakPipe: FareBreakPipe
  ) {
    this.showTabs = true;
  }

  ngOnInit() {
    this.filtersObj = {
      airlines: [],
      price: { min: 0, max: 0 },
      exchangeRate: 0,
      flightDurationExit: { min: 0, max: 0 },
      flightElapsedExit: { min: 0, max: 0 },
    };
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

          let pf: RangeFilter = { min: 0, max: 0 };
          let durationExit: RangeFilter = { min: 0, max: 0 };
          let elapsedExit: RangeFilter = { min: 0, max: 0 };

          if (this.flights.length > 0) {
            pf.min =
              this.flights[0].pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare.totalFare;
            durationExit.min = Number(
              this.flights[0].departure[0].segments[0].flightDuration
            );
            elapsedExit.min = Number(
              this.flights[0].departure[0].segments[0].flightSegments[0]
                .elapsedTime
            );
          }

          for (const x of this.flights) {
            if (
              x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
                .totalFare > pf.max
            )
              pf.max =
                x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare.totalFare;

            if (
              x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
                .totalFare < pf.min
            )
              pf.min =
                x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare.totalFare;

            if (
              Number(x.departure[0].segments[0].flightDuration) >
              durationExit.max
            )
              durationExit.max = Number(
                x.departure[0].segments[0].flightDuration
              );

            if (
              Number(x.departure[0].segments[0].flightDuration) <
              durationExit.min
            )
              durationExit.min = Number(
                x.departure[0].segments[0].flightDuration
              );

            if (
              Number(x.departure[0].segments[0].flightSegments[0].elapsedTime) >
              elapsedExit.max
            )
              elapsedExit.max = Number(
                x.departure[0].segments[0].flightSegments[0].elapsedTime
              );

            if (
              Number(x.departure[0].segments[0].flightSegments[0].elapsedTime) <
              elapsedExit.min
            )
              elapsedExit.min = Number(
                x.departure[0].segments[0].flightSegments[0].elapsedTime
              );
          }

          this.filtersObj.price = pf;
          this.filtersObj.flightDurationExit = durationExit;
          this.filtersObj.flightElapsedExit = elapsedExit;

          this.conversion = resp.exchangeRate.amount;
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

          this.filtersObj.exchangeRate = resp.exchangeRate.amount;

          console.log(this.filtersObj);

          this.filtersObj = { ...this.filtersObj };

          this.exchangeRate = resp.exchangeRate;

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

  actualizarPag() {
    this.pag.elemContainer += this.pag.elemPag;
    this.flights = [...this.flights];
  }

  comparePrecioBajo(a: IAerolineas, b: IAerolineas) {
    const priceA = this.fareBreakPipe.transform(
      a.pricingInfo.itinTotalFare.fareBreakDowns,
      'precioFinal'
    );
    const priceB = this.fareBreakPipe.transform(
      b.pricingInfo.itinTotalFare.fareBreakDowns,
      'precioFinal'
    );

    if (priceA < priceB) {
      return -1;
    }
    if (priceA > priceB) {
      return 1;
    }
    return 0;
  }
  comparePrecioAlto(a: IAerolineas, b: IAerolineas) {
    const priceA = this.fareBreakPipe.transform(
      a.pricingInfo.itinTotalFare.fareBreakDowns,
      'precioFinal'
    );
    const priceB = this.fareBreakPipe.transform(
      b.pricingInfo.itinTotalFare.fareBreakDowns,
      'precioFinal'
    );

    if (priceA > priceB) {
      return -1;
    }
    if (priceA < priceB) {
      return 1;
    }
    return 0;
  }

  compareMenorTiempo(a: IAerolineas, b: IAerolineas) {
    const durationA = Number(a.departure[0].segments[0].flightDuration);
    const durationB = Number(b.departure[0].segments[0].flightDuration);

    if (durationA < durationB) {
      return -1;
    }
    if (durationA > durationB) {
      return 1;
    }
    return 0;
  }

  compareMayorTiempo(a: IAerolineas, b: IAerolineas) {
    const durationA = Number(a.departure[0].segments[0].flightDuration);
    const durationB = Number(b.departure[0].segments[0].flightDuration);

    if (durationA > durationB) {
      return -1;
    }
    if (durationA < durationB) {
      return 1;
    }
    return 0;
  }

  orderBy(tipo: number) {
    switch (tipo) {
      case ENUM_ORDER_BY.PRECIO_BAJO:
        this.flights = [
          ...this.flights.sort(this.comparePrecioBajo.bind(this)),
        ];
        break;
      case ENUM_ORDER_BY.PRECIO_ALTO:
        this.flights = [
          ...this.flights.sort(this.comparePrecioAlto.bind(this)),
        ];
        break;
      case ENUM_ORDER_BY.CONVENIENTE:
        break;
      case ENUM_ORDER_BY.MENOR_TIEMPO:
        this.flights = [
          ...this.flights.sort(this.compareMenorTiempo.bind(this)),
        ];
        break;
      case ENUM_ORDER_BY.MAYOR_TIEMPO:
        this.flights = [
          ...this.flights.sort(this.compareMayorTiempo.bind(this)),
        ];
        break;
      default:
        break;
    }
    this.orderByActive = tipo;
    this.pag = new ResultadosPaginacion(5, 5);
  }

  id: any = 'tabIda';
  showOption(ids: any) {
    this.id = ids;
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

    console.log('aplicando filtro');
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

    console.log(this.flights);

    this.flights = this.flights.filter(
      (x) =>
        Number(x.departure[0].segments[0].flightDuration) >=
          filter.durationExit.min &&
        Number(x.departure[0].segments[0].flightDuration) <=
          filter.durationExit.max
    );

    this.flights = this.flights.filter(
      (x) =>
        Number(x.departure[0].segments[0].flightSegments[0].elapsedTime) >=
          filter.elapsedExit.min &&
        Number(x.departure[0].segments[0].flightSegments[0].elapsedTime) <=
          filter.elapsedExit.max
    );

    if (filter.airline.length > 0) {
      let af: any = this.flights.map((x) => {
        let df = x.departure[0].segments[0].flightSegments[0]
          ? x.departure[0].segments[0].flightSegments[0].marketingAirline.code
          : '';

        let rf = x.returns.segments[0].flightSegments[0]
          ? x.returns.segments[0].flightSegments[0].marketingAirline.code
          : '';

        if (
          filter.airline.find((ff: any) => ff == df) ||
          filter.airline.find((ff: any) => ff == rf)
        ) {
          return x;
        }
        return null;
      });

      this.flights = af.filter((x: any) => x != null);
    }

    if (filter.equipaje.mano || filter.equipaje.bodega) {
      let eql: any = this.flights.map((x) => {
        if (
          (filter.equipaje.mano &&
            x.departure[0].segments[0].equipaje != undefined &&
            x.departure[0].segments[0].equipaje.cabina != undefined &&
            x.departure[0].segments[0].equipaje.cabina.piezas > 0) ||
          (filter.equipaje.mano &&
            x.returns.segments[0].equipaje != undefined &&
            x.returns.segments[0].equipaje.cabina != undefined &&
            x.returns.segments[0].equipaje.cabina.piezas > 0) ||
          (filter.equipaje.bodega &&
            x.departure[0].segments[0].equipaje != undefined &&
            x.departure[0].segments[0].equipaje.piezas > 0) ||
          (filter.equipaje.bodega &&
            x.returns.segments[0].equipaje != undefined &&
            x.returns.segments[0].equipaje.piezas > 0)
        ) {
          return x;
        } else {
          return null;
        }
      });

      this.flights = eql.filter((x: any) => x != null);
    }

    if (filter.escala.directo || filter.escala.uno || filter.escala.mas) {
      console.log(this.flights);
      let esl: any = this.flights.map((x) => {
        if (
          (filter.escala.directo &&
            x.departure[0].segments[0].flightSegments != undefined &&
            x.departure[0].segments[0].flightSegments.length == 1) ||
          (filter.escala.directo &&
            x.returns.segments[0].flightSegments != undefined &&
            x.returns.segments[0].flightSegments.length == 1) ||
          (filter.escala.uno &&
            x.departure[0].segments[0].flightSegments != undefined &&
            x.departure[0].segments[0].flightSegments.length == 2) ||
          (filter.escala.uno &&
            x.returns.segments[0].flightSegments != undefined &&
            x.returns.segments[0].flightSegments.length == 2) ||
          (filter.escala.mas &&
            x.departure[0].segments[0].flightSegments != undefined &&
            x.departure[0].segments[0].flightSegments.length > 2) ||
          (filter.escala.mas &&
            x.returns.segments[0].flightSegments != undefined &&
            x.returns.segments[0].flightSegments.length > 2)
        ) {
          return x;
        } else {
          return null;
        }
      });

      console.log(esl);

      this.flights = esl.filter((x: any) => x != null);
    }

    this.flights = [...this.flights];

    // console.log(filter);
    this.loader.closeLoader();
  }

  currencyChangeEvent(currency: string) {
    console.log(currency);
    this.currency = currency;
  }
}
