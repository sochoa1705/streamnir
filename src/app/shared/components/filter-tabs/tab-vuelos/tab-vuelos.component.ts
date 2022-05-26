import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { concat, Observable, of, OperatorFunction, pipe, Subject, UnaryFunction } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError, map, debounceTime, filter, takeUntil } from 'rxjs/operators';
import { DestinosService } from 'src/app/Component/home-page/vuelos/commons/components/destinos/services/destinos.service';
import { ModelTaggingVuelos } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { ICardAutocomplete } from '../../card-autocomplete/card-autocomplete.interface';
import { PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { IDistributionObjectVuelos } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { EnumCabinsVuelos, EnumFlightType, ParamsVueloHotel, ParamsVuelos, SaveModelVuelos, URLVueloHotel, URLVuelos, URLVuelosMulti } from '../../tabs/tabs.models';
import { IGeoTree } from './tab-vuelos.interfaces';
import { IntermediaryService } from '../../../../Services/intermediary.service';
import { UserStorage, AccountsService } from '../../../../Services/accounts.service';

@Component({
  selector: 'app-tab-vuelos',
  templateUrl: './tab-vuelos.component.html',
  styleUrls: ['./tab-vuelos.component.scss']
})
export class TabVuelosComponent implements OnInit, OnDestroy {


  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;

  private _vuelosTab: SaveModelVuelos;

  @Input() set vuelosTab(value: SaveModelVuelos) {
    if (value) {
      this.form.setValue(value.form);
      this._vuelosTab = value;
    }
  }

  get vuelosTab() {
    return this._vuelosTab;
  }

  vuelosEscogidos: {} = {};


  form!: FormGroup;
  fromDate: NgbDate | null
  citysOrigenSelect: IGeoTree[] = [];
  citysDestinosSelect: IGeoTree[] = [];
  origen: any;
  destino: any;
  origenHotel: any;
  toDate: NgbDate | null;

  distributionObject: IDistributionObjectVuelos;
  hoveredDate: NgbDate | null = null;

  EnumFlightType = EnumFlightType;
  EnumCabins = EnumCabinsVuelos;


  vuelos$: Observable<ICardAutocomplete[]>;
  vuelosLoading = false;
  vuelosInput$ = new Subject<string>();

  vuelos2$: Observable<ICardAutocomplete[]>;
  vuelosLoading2 = false;
  vuelosInput2$ = new Subject<string>();

  vuelosValue: EnumFlightType;


  minLengthAutocomplete = 3;


  valueInputOrigen = "";
  valueInputDestino = "";

  isSubmit = false;

  private readonly destroy$ = new Subject();
  flightSearchForm!: FormGroup;
  displayCalendar = false;
  flightData: any;

  userStorage: UserStorage;
  processOk = true;


  constructor(private destineService: DestinyService, public formatter: NgbDateParserFormatter, private calendar: NgbCalendar,
    private _snackBar: MatSnackBar, private router: Router, private destinosService: DestinosService, public accountService: AccountsService,
    private notification: NotificationService, private fb: FormBuilder, private intermediaryService: IntermediaryService
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



  logicPathVuelos() {

    this.destinosService.getParam().pipe(
      takeUntil(this.destroy$)
    ).subscribe(codigo => {
      if (!codigo) {

        this.form.controls["origen"].patchValue(null);
        this.form.controls["destino"].patchValue(null);
      } else {
        this.initCiudadDestino(codigo)
      }
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
  get viajesForm() {
    return this.form.get("viajes")?.value;
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
        map(item => this.convertFormatAutocomplete(item))
      )
    )
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

  convertFormatAutocomplete(array: IGeoTree[]): ICardAutocomplete[] {

    const nuevoArray: ICardAutocomplete[] = [];

    array.forEach((x) => {

      const elementFind = nuevoArray.find(item => item.id == x.aerocodiata);

      if (!elementFind && x.tn_iata_padre_fn == "0") {
        const obj = {
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

      } else if (elementFind && x.tn_iata_padre_fn == "2") {

        elementFind.children.push(
          {
            id: x.aerocodiata,
            codigo: x.city_code,
            title: x.city,
            country: x.country,
            children: []
          }
        )
      }

    });

    return nuevoArray;
  }


  openSnackBar(message: string, action: string = "Error") {
    this._snackBar.open(message, "", {
      duration: 10000,
    });
  }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl(this.EnumCabins.economy),
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

  navigateToResponseUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

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
    if (!this.toDate && this.viajesForm !== EnumFlightType.ida) {
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

    if(this.processOk) {

      this.isSubmit = true;
      const errors = this.validateTab();
  
      if (errors.length > 0) {
        this.notification.showNotificacion("Error", errors.join(" - "), 10);
        return;
      }
  
      const url = this.getUrl();
  
      this.navigateToResponseUrl(url);
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


    const nombre = `${params.idOrigen}_${params.idDestino}_${params.businessClass ? 'BS' : 'EC'}_${getTipoTag(params.flightType).codigo}`;

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
    )

    TaggingService.buscarVuelos(model);

  }


  getParams() {
    let params = new ParamsVuelos(
      {
        fromDate: this.fromDate || null,
        toDate: this.toDate || null,
        form: this.form,
        citysDestinosSelect: this.citysDestinosSelect || null,
        citysOrigenSelect: this.citysOrigenSelect || null,
        email: this.userStorage.email || ''
      }
    );
    return params;
  }
  public getUrl() {

    this.userStorage = this.accountService.getUserStorage();

    let url = ''
    let params = this.getParams();

    // nuevo
    let adultosCount = this.distributionObject['adultos'],
      ninosCount = this.distributionObject['ninos'],
      infantesCount = this.distributionObject['infantes'],
      pasajeros = this.distributionObject['pasajeros']

    let adultosN = { item: 'Adulto' }
    let ninosN = { item: 'Niño' }
    let infantesN = { item: 'Infante' }

    if (adultosCount > 0) {
      for (let i = 0; i < adultosCount; i++) {
        pasajeros.push(adultosN)
      }
    }
    if (ninosCount > 0) {
      for (let i = 0; i < ninosCount; i++) {
        pasajeros.push(ninosN)
      }
    }
    if (infantesCount > 0) {
      for (let i = 0; i < infantesCount; i++) {
        pasajeros.push(infantesN)
      }
    }


    this.insertTag(params);

    let vuelo = { ...params, ...this.distributionObject };


    localStorage.setItem('filtroVuelo', JSON.stringify(vuelo))

    url = new URLVuelos(params, this.distributionObject).getUrl();

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
    let url = new URLVuelosMulti(this.form.controls['clase'].value, this.form.controls['viajes'].value, this.distributionObject).getUrlMulti(jsonArray);
    this.navigateToResponseUrl(url);
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
    if (!this.displayCalendar) {
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
