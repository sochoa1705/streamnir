import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  DestinosService
} from 'src/app/Component/home-page/vuelos/commons/components/destinos/services/destinos.service';
import { ModelTaggingVuelos, SearchFlights } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { ICardAutocomplete } from '../../card-autocomplete/card-autocomplete.interface';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { IDistributionObjectVuelos } from '../../pop-up-pasajero/pop-up-pasajero.model';
import {
  EnumCabinsVuelos,
  EnumFlightType,
  ParamsVuelos,
  SaveModelVuelos,
  URLVuelosMulti
} from '../../tabs/tabs.models';
import { IGeoTree } from './tab-vuelos.interfaces';
import { IntermediaryService } from '../../../../Services/intermediary.service';
import { AccountsService, UserStorage } from '../../../../Services/accounts.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-tab-vuelos',
  templateUrl: './tab-vuelos.component.html',
  styleUrls: ['./tab-vuelos.component.scss']
})
export class TabVuelosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inputDestino', { static: false }) inputDestino!: any;//ElementRef<HTMLInputElement>
  @ViewChild('inputDepartureDate') inputDepartureDate: ElementRef;

  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;

  private _vuelosTab: SaveModelVuelos;

  tipoVuelo: number = 0;

  @Input() set vuelosTab(value: SaveModelVuelos) {
    if (value) {
      this.form.setValue(value.form);
      this._vuelosTab = value;
    }
  }

  get vuelosTab() {
    return this._vuelosTab;
  }

  form!: FormGroup;
  fromDate: NgbDate | null
  citysOrigenSelect: IGeoTree[] = [];
  citysDestinosSelect: IGeoTree[] = [];
  origen: any;
  destino: any;
  toDate: NgbDate | null;

  distributionObject: IDistributionObjectVuelos;
  hoveredDate: NgbDate | null = null;

  EnumFlightType = EnumFlightType;

  vuelos$: Observable<ICardAutocomplete[]>;
  vuelosLoading = false;
  vuelosInput$ = new Subject<string>();

  vuelos2$: Observable<ICardAutocomplete[]>;
  vuelosLoading2 = false;
  vuelosInput2$ = new Subject<string>();

  minLengthAutocomplete = 3;

  valueInputOrigen = 'Lima';
  valueInputDestino = "";

  isSubmit = false;
  isViewInitialized: boolean;

  private readonly destroy$ = new Subject();
  flightSearchForm!: FormGroup;
  displayCalendar = false;
  flightData: any;

  userStorage: UserStorage;
  processOk = true;
  disabledInput = true;

  constructor(
      private destineService: DestinyService,
      public formatter: NgbDateParserFormatter,
      private calendar: NgbCalendar,
      private _snackBar: MatSnackBar,
      private router: Router,
      private destinosService: DestinosService,
      public accountService: AccountsService,
      private notification: NotificationService,
      private fb: FormBuilder,
      private intermediaryService: IntermediaryService
  ) {
    this.createForm();
    this.createFormMultiCity();
  }

  ngOnInit(): void {
    this.loadVuelosOrigen();
    this.loadVuelosDestino();

    this.logicPathVuelos();
    this.userStorage = this.accountService.getUserStorage();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.vuelosInput$.next('Lima');
  }

  logicPathVuelos() {
    this.destinosService.getParam().pipe(
      takeUntil(this.destroy$)
    ).subscribe(codigo => {
      if (!codigo) {
        this.form.controls["origen"].patchValue(null);
        this.form.controls["destino"].patchValue(null);
      } else
        this.initCiudadDestino(codigo)
    })
  }

  initCiudadDestino(codigoCiudad: string) {
    this.form.controls["origen"].patchValue({
      children: [],
      codigo: "LIM",
      id: "LIM",
      title: "Lima"
    })

    this.valueInputOrigen = "Lima";

    this.destineService.getGeoTree(codigoCiudad).subscribe(data => {
      const ciudad = this.convertFormatAutocomplete(data);
      this.form.controls["destino"].patchValue(ciudad[0]);

      this.valueInputDestino = ciudad[0].title;
    })
  }

  private loadVuelosOrigen() {
    this.vuelos$ = concat(
      of([]),
      this.vuelosInput$.pipe(
        distinctUntilChanged(),
        debounceTime(400),
        tap(() => this.vuelosLoading = true),
        switchMap(term => this.destineService.getGeoTree(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.vuelosLoading = false)
        )),
        map(item => this.convertFormatAutocomplete(item, true))
      )
    );
  }

  private loadVuelosDestino() {
    this.vuelos2$ = concat(
      of([]),
      this.vuelosInput2$.pipe(
        distinctUntilChanged(),
        debounceTime(400),
        tap(() => this.vuelosLoading2 = true),
        switchMap(term => this.destineService.getGeoTree(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.vuelosLoading2 = false)
        )),
        map(item => this.convertFormatAutocomplete(item))
      )
    )
  }

  getControls() {
    return (this.flightSearchForm.get('multicity') as FormArray).controls;
  }

  convertFormatAutocomplete(array: IGeoTree[], isOrigin: boolean = false): ICardAutocomplete[] {
    const nuevoArray: ICardAutocomplete[] = [];
    array.forEach((x: IGeoTree) => {
      const elementFind = nuevoArray.find(item => item.id == x.aerocodiata);
      if (!elementFind && x.tn_iata_padre_fn == "0") {
        const obj: ICardAutocomplete = {
          id: x.aerocodiata,
          codigo: x.city_code,
          title: x.city,
          country: x.country,
          children: []
        }
        nuevoArray.push(obj)
      } else if (!elementFind && x.tn_iata_padre_fn == "2") {
        const obj = {
          id: x.aerocodiata,
          country: "",
          codigo: "",
          title: "",
          children: [
            {
              id: x.aerocodiata,
              codigo: x.city_code,
              title: x.city,
              country: x.country,
              children: []
            }
          ]
        }
        nuevoArray.push(obj)
      } else if (elementFind && x.tn_iata_padre_fn == "2")
        elementFind.children.push({
          id: x.aerocodiata,
          codigo: x.city_code,
          title: x.city,
          country: x.country,
          children: []
        });
    });

    if (this.isViewInitialized && isOrigin) nuevoArray[0].isSelected = true;
    this.isViewInitialized = false;

    return nuevoArray;
  }

  createForm() {
    this.form = new FormGroup({
      //clase: new FormControl(this.EnumCabins.economy),
      viajes: new FormControl(EnumFlightType.ida_vuelta),
      origen: new FormControl(''),
      destino: new FormControl(''),
      origenHotel: new FormControl(''),
      departureDate: new FormControl(''),
      arrivalDate: new FormControl(''),
    });
  }

  createFormMultiCity() {
    this.flightSearchForm = this.fb.group({
      multicity: this.jsonMulticityToFormGroup()
    });
  }

  jsonMulticityToFormGroup() {
    return this.fb.array([
      this.fb.group({
        origen: [''],
        destino: [''],
        departureDate: [''],
      }),
    ]);
  }

  /*navigateToResponseUrl(url: string): void {
    //this.router.navigateByUrl(url);
    //window.open(url, '_blank');
    window.location.href = url;
  }*/

  validateTab() {
    const errors = [];

    if (!this.isValidate()) {
      errors.push("Error al definir los pasajeros, debe agregar al menos uno");
    }

    if (this.valueInputOrigen.length <= this.minLengthAutocomplete) {
      errors.push("El origen es requerido");
    }
    if (this.valueInputDestino.length <= this.minLengthAutocomplete) {
      errors.push("El destino es requerido");
    }
    if (!this.toDate && this.tipoVuelo !== EnumFlightType.ida) {
      errors.push("La fecha final es requerido");
    }
    if (!this.fromDate) {
      errors.push("La fecha de inicio es requerido");
    }

    return errors;
  }

  emitValidation(validation: string) {
    const errors = [];
    errors.push(validation);
    if (errors.length > 0) {
      this.processOk = false;
      this.notification.showNotificacion("Error", errors.join(" - "), 10);
      return;
    }
  }

  public searchVueloHotel() {
    this.processOk = true;
    this.intermediaryService.sendChangePopupPasajerosValidation(true);

    setTimeout(() => {

    }, 1000);

    if (this.processOk) {
      this.isSubmit = true;
      const errors = this.validateTab();

      if (errors.length > 0) {
        this.notification.showNotificacion("Error", errors.join(" - "), 10);
        return;
      }

      //this.navigateToResponseUrl(url);
      window.location.href = this.getUrl();
    }
  }


  insertTag(params: any) {
    const getTipoTag = ((tipo: EnumFlightType) => {

      if (tipo == EnumFlightType.ida) {
        return {
          codigo: 'SI',
          descripcion: 'Solo Ida'
        }
      } else if (tipo == EnumFlightType.ida_vuelta) {
        return {
          codigo: 'IV',
          descripcion: 'Ida y Vuelta'
        }
      } else if (tipo == EnumFlightType.multy_city) {
        return {
          codigo: 'MC',
          descripcion: 'Multi City'
        }
      } else {
        return {
          codigo: '',
          descripcion: ''
        }
      }
    })

    const getCabinsVuelosCode = (cabin: string) => {
      switch (cabin) {
        case EnumCabinsVuelos.economy:
          return "EC"
        case EnumCabinsVuelos.business:
          return "BS"
        case EnumCabinsVuelos.first_class:
          return "FC"
        default:
          return ""
      }
    }

    //const nombre = `${params.idOrigen}_${params.idDestino}_${params.businessClass ? 'BS' : 'EC'}_${getTipoTag(params.flightType).codigo}`;
    const nombre = `${params.idOrigen}_${params.idDestino}`;

    let diasAnticipacion = moment(params.startDate, "DD/MM/YYYY").diff(moment(), 'days');
    let duracionViaje = 0;

    let fechaRegreso = '';

    if (params.flightType === EnumFlightType.ida_vuelta) {
      duracionViaje = moment(params.endDate, "DD/MM/YYYY").diff(moment(params.startDate, "DD/MM/YYYY"), 'days');
      fechaRegreso = moment(params.endDate, "DD/MM/YYYY").format("YYYY/MM/DD");
    }

    const model = new ModelTaggingVuelos(
      nombre,
      params.origen.title,
      params.destino.title,
      getCabinsVuelosCode(params.cabinsVuelos),
      getTipoTag(params.flightType).descripcion,
      this.distributionObject.adultos + this.distributionObject.ninos + this.distributionObject.infantes,
      this.distributionObject.adultos,
      this.distributionObject.ninos,
      this.distributionObject.infantes,
      0,
      moment(params.startDate, "DD/MM/YYYY").format("YYYY/MM/DD"),
      fechaRegreso,
      diasAnticipacion,
      duracionViaje
    );

    TaggingService.buscarVuelos(model);

    let flightType = '';
    switch (params.flightType) {
      case 0:
        flightType = 'ida y vuelta';
        break;
      case 1:
        flightType = 'solo ida';
        break;
      case 2:
        flightType = 'multidestino';
        break;
      default:
        break;
    }
    let flightClass = '';
    switch (Number(this.distributionObject['clase'])) {
      case 0:
        flightClass = 'economic';
        break;
      case 1:
        flightClass = 'business';
        break;
      case 2:
        flightClass = 'first class';
        break;
      default:
        break;
    }
    const newModel: SearchFlights = {
      event: 'nmv_vuelos_buscar',
      operacion: {
        dias_anticipacion: diasAnticipacion
      },
      origen: {
        nombre: params.origen.title,
        codigo: params.origen.codigo,
        pais: params.destino.country
      },
      destino: {
        nombre: params.destino.title,
        codigo: params.destino.codigo,
        pais: params.destino.country
      },
      vuelo: {
        clase: flightClass,
        tipo: flightType
      },
      pasajeros: {
        adultos: this.distributionObject.adultos,
        ninos: this.distributionObject.ninos,
        infantes: this.distributionObject.infantes,
        total: this.distributionObject.adultos + this.distributionObject.ninos + this.distributionObject.infantes
      },
      fechas: {
        salida: moment(params.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        retorno: fechaRegreso.replace(/\//g, '-'),
        estadia: duracionViaje
      }
    };
    TaggingService.tagSearchFlights(newModel);
  }

  getParams() {
    return new ParamsVuelos({
      fromDate: this.fromDate || null,
      toDate: this.toDate || null,
      form: this.form,
      citysDestinosSelect: this.citysDestinosSelect || null,
      citysOrigenSelect: this.citysOrigenSelect || null,
      email: this.userStorage.email || '',
      clase: this.distributionObject['clase'],
      tipoVuelo: this.tipoVuelo
    });
  }

  public getUrl() {
    this.userStorage = this.accountService.getUserStorage();

    let url: string;
    let params = this.getParams();

    // nuevo
    let adultosCount = this.distributionObject['adultos'],
      ninosCount = this.distributionObject['ninos'],
      infantesCount = this.distributionObject['infantes'],
      pasajeros = this.distributionObject['pasajeros']

    let adultosN = { item: 'Adulto' };
    let ninosN = { item: 'Niño' };
    let infantesN = { item: 'Infante' };

    if (adultosCount > 0)
      for (let i = 0; i < adultosCount; i++)
        pasajeros.push(adultosN);

    if (ninosCount > 0)
      for (let i = 0; i < ninosCount; i++)
        pasajeros.push(ninosN);

    if (infantesCount > 0)
      for (let i = 0; i < infantesCount; i++)
        pasajeros.push(infantesN);

    this.insertTag(params);

    let vuelo = { ...params, ...this.distributionObject };

    localStorage.setItem('filtroVuelo', JSON.stringify(vuelo));

    //url = new URLVuelos(params, this.distributionObject).getUrl();
    url = environment.urlIframeMotorVuelos + '?rand=' + Math.round(Math.random() * 10000000000) + "&";

    url += `departureLocation=${params.idOrigen + "%20" + params.origen?.title || ''}&arrivalLocation=${params.idDestino + "%20" + params.destino?.title || ''}&departureDate=${params.startDate}&arrivalDate=${params.endDate}&adults=${this.distributionObject['adultos']}&children=${this.distributionObject['ninos']}&infants=${this.distributionObject['infantes']}&flightType=${params.flightType}&flightClass=${this.distributionObject['clase']}&lang=ES&email=${params.email}`;

    // return `${this.url}?directSubmit=true&tripType=${this.tab}&flightType=${this.params.flightType}&destination=${this.params.idDestino + "%20" + this.params.destino?.title || ''}
    // &departure=${this.params.idOrigen + "%20" + this.params.origen?.title || ''}&departureDate=${this.params.startDate}
    // &arrivalDate=${this.params.endDate}&adults=${this.distribution.adultos}&children=${this.distribution.ninos}&infants=${this.distribution.infantes}&flightClass=${this.params.cabinsVuelos}&lang=ES&email=${this.params.email}`;

    return url;
  }

  isValidate() {
    return this.popUpElement?.isValid();
  }

  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }

  get multicity() {
    return this.flightSearchForm.get('multicity') as FormArray;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchVueloHotelMulti(): void {
    let jsonArray = this.setMultiCityArray();
    const email: string = this.userStorage.email || '';
    window.location.href = new URLVuelosMulti(this.tipoVuelo, this.distributionObject, email).getUrlMulti(jsonArray);
    //this.navigateToResponseUrl(url);
  }

  setMultiCityArray(): string {
    let json: Array<any> = [];
    for (let i = 0; i < this.multicity.length; i++) {
      let dataOrigen: any = this.getControlForm('origen', i);
      let dataDestino: any = this.getControlForm('destino', i);
      let dataDate = this.getControlForm('departureDate', i);
      let data: any = {
        departureLocation: dataOrigen.codigo + " " + dataOrigen.title + ", " + dataOrigen.country,
        arrivalLocation: dataDestino.codigo + " " + dataDestino.title + ", " + dataDestino.country,
        departureDate: dataDate
      }
      json.push(data);
    }
    return JSON.stringify(json);
  }

  getControlForm(key: any, index: number): string {
    const control = <FormArray>this.multicity.controls[index];
    return control.controls[key].value;
  }

  insertDates(inputDates: any) {
    let flightType = this.form.get('viajes')?.value;

    let departureDate = inputDates.departure == null ? '' : inputDates.departure?.date;
    let arrivalDate = inputDates.arrival == null ? '' : inputDates.arrival?.date;

    this.fromDate = departureDate == '' ? this.calendar.getToday() : inputDates.departure?.date;
    this.toDate = arrivalDate == '' ? this.calendar.getToday() : inputDates.arrival?.date;

    this.form.get('departureDate')?.setValue(departureDate);
    if (flightType == 0)
      this.form.get('arrivalDate')?.setValue(arrivalDate);

    this.displayCalendar = false;
  }

  onFocus() {
    if (!this.displayCalendar && this.valueInputOrigen != '' && this.valueInputDestino != '') {
      if (this.form.get('origen')?.value && this.form.get('destino')?.value) {
        let flightType = this.form.get('viajes')?.value;
        let departureCity = this.form.get('origen')?.value.codigo;
        let arrivalCity = this.form.get('destino')?.value.codigo;
        let departureDate = this.form.get('departureDate')?.value;
        let arrivalDate = flightType == 0 ? this.form.get('arrivalDate')?.value : '';

        if (departureCity != '' && arrivalCity != '') {
          this.flightData = {
            flightType: flightType,
            departureCity: departureCity,
            arrivalCity: arrivalCity,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
          };

          this.displayCalendar = true;
          this.intermediaryService.sendChangeCalendarPrice(true);
        }
      }
    }
  }

  cleanInput(): void {
    this.disabledInput = this.valueInputDestino == '' || this.valueInputDestino == '';
    if (this.disabledInput) {
      this.form.get('departureDate')?.setValue('');
      this.form.get('arrivalDate')?.setValue('');
    }
  }

  changeSelect(tipoVuelo: number): void {
    this.tipoVuelo = tipoVuelo;

    this.form.get('departureDate')?.setValue('');
    this.form.get('arrivalDate')?.setValue('');
  }

  onkeypressSource(event: any) {
    if (event.keyCode === 13)
      this.inputDestino.inputSearch.nativeElement.focus();
  }

  onkeypressDestiny(event: any) {
    if (event.keyCode === 13)
      this.inputDepartureDate.nativeElement.focus();
  }
}

