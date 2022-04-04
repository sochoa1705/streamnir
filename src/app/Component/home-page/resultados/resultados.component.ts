import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ICardAutocomplete } from 'src/app/shared/components/card-autocomplete/card-autocomplete.interface';
import {
  AirlineFilter,
  FilterResult,
  RangeFilter,
} from 'src/app/shared/components/filter-result/models/filter-result.interfaces';
import { IForm } from 'src/app/shared/components/filter-tabs/tab-vuelos/tab-vuelos.interfaces';
import { DisponibilidadPayload } from 'src/app/shared/components/flights/models/flights.class';
import { EnumCabins, EnumFlightType } from 'src/app/shared/components/flights/models/flights.interface';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { SaveModelVuelos } from 'src/app/shared/components/tabs/tabs.models';
import { IVuelos } from '../vuelos/commons/components/flight/flight.models';
import { ResultadosPaginacion } from './models/resultados.class';
import { ENUM_ORDER_BY } from './models/resultados.enum';
import { IAerolineas, ParamsVuelos, Returns } from './models/resultados.interfaces';
import { FareBreakPipe } from './pipes/fare-break-downs.pipe';
import { ResultadosService } from './services/resultados.service';
import { objectToQueryString, toUp } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

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
  currency: string = 'dolares';
  flightsOri: IAerolineas[];
  filtersObj: FilterResult;

  ENUM_ORDER_BY = ENUM_ORDER_BY;

  pag = new ResultadosPaginacion(5, 5);

  exchangeRate: any;

  error = {
    isError: false,
    errorMessage: '',
  };

  urlIframe = "";

  orderByActive: number = ENUM_ORDER_BY.PRECIO_BAJO;

  vuelosTab: SaveModelVuelos;

  constructor(
    public route: Router,
    private service: ResultadosService,
    private _snackBar: MatSnackBar,
    private ar: ActivatedRoute,
    // private loader: LoaderSubjectService,
    private fareBreakPipe: FareBreakPipe
  ) {
    this.showTabs = true;
  }

  ngOnInit() {
    this.addTag()
    toUp()
    this.filtersObj = {
      airlines: [],
      price: { min: 0, max: 0 },
      exchangeRate: 0,
      flightDurationExit: { min: 0, max: 0 },
      flightElapsedExit: { min: 0, max: 0 },
    };
    // this.loader.showText('Cargando los vuelos');
    // this.loader.showLoader();
    this.getParams();

    window.addEventListener('message', function(event) {
      let frm = document.getElementById("iframeMotorVuelos");
      let height = event.data + 50;
      // @ts-ignore: Object is possibly 'null'.
      (frm || {}).style.height = height + 'px';
    }); 
  }

  vuelosLogicInit(respVuelos: ParamsVuelos, obj: Returns | null) {

    const origen: ICardAutocomplete = {
      id: obj?.originCity?.code || respVuelos.departure,
      codigo: obj?.originCity.code || respVuelos.departure,
      title: obj?.originCity.name || respVuelos.departure,
      children: [],
    };

    const destino: ICardAutocomplete = {
      id: obj?.destinationCity.code || respVuelos.destination,
      codigo: obj?.destinationCity.code || respVuelos.destination,
      title: obj?.destinationCity.name || respVuelos.destination,
      children: [],
    };

    const formModel: IForm = {
      clase: respVuelos.businessCabin
        ? EnumCabins.economico
        : EnumCabins.economico,
      viajes: Number(respVuelos.flightType),
      origen: origen,
      destino: destino,
      origenHotel: '',
    };

    const fromDate = new NgbDate(
      moment(respVuelos.departureDate, 'DD/MM/YYYY').year(),
      moment(respVuelos.departureDate, 'DD/MM/YYYY').month() + 1,
      moment(respVuelos.departureDate, 'DD/MM/YYYY').date()
    );
    const toDate = new NgbDate(
      moment(respVuelos.arrivalDate, 'DD/MM/YYYY').year(),
      moment(respVuelos.arrivalDate, 'DD/MM/YYYY').month() + 1,
      moment(respVuelos.arrivalDate, 'DD/MM/YYYY').date()
    );

    const pasajeros = {
      adultos: Number(respVuelos.adults),
      ninos: Number(respVuelos.children),
      infantes: Number(respVuelos.infants),
    };

    this.vuelosTab = new SaveModelVuelos(
      fromDate,
      toDate,
      formModel,
      pasajeros
    );

    // this.vuelosService.getValue().subscribe(resp=>{
    //   if(!resp){
    //     return;
    //   }
    //   console.log(resp);
    //   this.vuelosTab = resp;
    // })
  }

  async getParams() {

    this.ar.queryParams.subscribe((resp) => {

      this.urlIframe = environment.urlIframeMotorVuelos ;

      const respVuelos: ParamsVuelos = resp as ParamsVuelos;

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


      this.vuelosLogicInit(respVuelos, null)

      arrivalDate = moment(arrivalDate, 'DD/MM/YYYY').format("YYYY-MM-DD");
      departureDate = moment(departureDate, 'DD/MM/YYYY').format("YYYY-MM-DD");

      // arrivalDate = moment(arrivalDate, 'DD/MM/YYYY').format("YYYY-MM-DD");
      // departureDate = moment(departureDate, 'DD/MM/YYYY').format("YYYY-MM-DD");
      
      const disponibilidadPayload = new DisponibilidadPayload(
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

      let payload = {...disponibilidadPayload};

      if(payload.flightType == EnumFlightType.ida){
        delete payload.arrivalDate
      }
      
      const params = objectToQueryString(payload);

      this.urlIframe = this.urlIframe + "?" + params;

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
    this.route.navigateByUrl('/comprar', navigationExtras);
  }

  showTab() {
    this.showTabs = false;
  }

  // filterChange(filter: any) {
  //   this.loader.showText('Cargando los vuelos');
  //   this.loader.showLoader();

  //   console.log('aplicando filtro');
  //   console.log(filter);

  //   let aFlights: IAerolineas[];

  //   if (filter.price.currency == 'soles') {
  //     aFlights = this.flightsOri.filter(
  //       (x) =>
  //         x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
  //           .totalFare *
  //           this.exchangeRate.amount >=
  //           filter.price.min &&
  //         x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
  //           .totalFare *
  //           this.exchangeRate.amount <=
  //           filter.price.max
  //     );
  //   } else {
  //     aFlights = this.flightsOri.filter(
  //       (x) =>
  //         x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
  //           .totalFare >= filter.price.min &&
  //         x.pricingInfo.itinTotalFare.fareBreakDowns[0].passengerFare
  //           .totalFare <= filter.price.max
  //     );
  //   }

  //   console.log(this.flights);

  //   aFlights = aFlights.filter(
  //     (x) =>
  //       Number(x.departure[0].segments[0].flightDuration) >=
  //         filter.durationExit.min &&
  //       Number(x.departure[0].segments[0].flightDuration) <=
  //         filter.durationExit.max
  //   );

  //   aFlights = aFlights.filter(
  //     (x) =>
  //       Number(x.departure[0].segments[0].flightSegments[0].elapsedTime) >=
  //         filter.elapsedExit.min &&
  //       Number(x.departure[0].segments[0].flightSegments[0].elapsedTime) <=
  //         filter.elapsedExit.max
  //   );

  //   if (filter.airline.length > 0) {
  //     let af: any = aFlights.map((x) => {
  //       let df = x.departure[0].segments[0].flightSegments[0]
  //         ? x.departure[0].segments[0].flightSegments[0].marketingAirline.code
  //         : '';

  //       let rf = x.returns.segments[0].flightSegments[0]
  //         ? x.returns.segments[0].flightSegments[0].marketingAirline.code
  //         : '';

  //       if (
  //         filter.airline.find((ff: any) => ff == df) ||
  //         filter.airline.find((ff: any) => ff == rf)
  //       ) {
  //         return x;
  //       }
  //       return null;
  //     });

  //     aFlights = af.filter((x: any) => x != null);
  //   }

  //   if (filter.equipaje.mano || filter.equipaje.bodega) {
  //     let eql: any = aFlights.map((x) => {
  //       if (
  //         (filter.equipaje.mano &&
  //           x.departure[0].segments[0].equipaje != undefined &&
  //           x.departure[0].segments[0].equipaje.cabina != undefined &&
  //           x.departure[0].segments[0].equipaje.cabina.piezas > 0) ||
  //         (filter.equipaje.mano &&
  //           x.returns.segments[0].equipaje != undefined &&
  //           x.returns.segments[0].equipaje.cabina != undefined &&
  //           x.returns.segments[0].equipaje.cabina.piezas > 0) ||
  //         (filter.equipaje.bodega &&
  //           x.departure[0].segments[0].equipaje != undefined &&
  //           x.departure[0].segments[0].equipaje.piezas > 0) ||
  //         (filter.equipaje.bodega &&
  //           x.returns.segments[0].equipaje != undefined &&
  //           x.returns.segments[0].equipaje.piezas > 0)
  //       ) {
  //         return x;
  //       } else {
  //         return null;
  //       }
  //     });

  //     aFlights = eql.filter((x: any) => x != null);
  //   }

  //   if (filter.escala.directo || filter.escala.uno || filter.escala.mas) {
  //     console.log(this.flights);
  //     let esl: any = aFlights.map((x) => {
  //       if (
  //         (filter.escala.directo &&
  //           x.departure[0].segments[0].flightSegments != undefined &&
  //           x.departure[0].segments[0].flightSegments.length == 1) ||
  //         (filter.escala.directo &&
  //           x.returns.segments[0].flightSegments != undefined &&
  //           x.returns.segments[0].flightSegments.length == 1) ||
  //         (filter.escala.uno &&
  //           x.departure[0].segments[0].flightSegments != undefined &&
  //           x.departure[0].segments[0].flightSegments.length == 2) ||
  //         (filter.escala.uno &&
  //           x.returns.segments[0].flightSegments != undefined &&
  //           x.returns.segments[0].flightSegments.length == 2) ||
  //         (filter.escala.mas &&
  //           x.departure[0].segments[0].flightSegments != undefined &&
  //           x.departure[0].segments[0].flightSegments.length > 2) ||
  //         (filter.escala.mas &&
  //           x.returns.segments[0].flightSegments != undefined &&
  //           x.returns.segments[0].flightSegments.length > 2)
  //       ) {
  //         return x;
  //       } else {
  //         return null;
  //       }
  //     });

  //     console.log(esl);

  //     aFlights = esl.filter((x: any) => x != null);
  //   }

  //   this.flights = [...aFlights];

  //   if (this.orderByActive && this.orderByActive > 0)
  //     this.orderBy(this.orderByActive);

  //   // console.log(filter);
  //   this.loader.closeLoader();
  // }

  currencyChangeEvent(currency: string) {
    console.log(currency);
    this.currency = currency;
  }
  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'virtualPageView',
      'virtualPagePath': '/vuelos/resultados',
      'virtualPageTitle': 'Resultados'
    })
  }
}
