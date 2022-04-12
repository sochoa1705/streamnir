import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { concat, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError, map, debounceTime } from 'rxjs/operators';
import { ModelTaggingVuelos } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { ICardAutocomplete } from '../../card-autocomplete/card-autocomplete.interface';
import { DisponibilidadPayload } from '../../flights/models/flights.class';
import { EnumCabins, EnumFlightType } from '../../flights/models/flights.interface';
import {  PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { IDistributionObjectVuelos } from '../../pop-up-pasajero/pop-up-pasajero.model';
import { ParamsVueloHotel, ParamsVuelos, SaveModelVuelos, URLVueloHotel, URLVuelos } from '../../tabs/tabs.models';
import { IGeoTree } from './tab-vuelos.interfaces';

@Component({
  selector: 'app-tab-vuelos',
  templateUrl: './tab-vuelos.component.html',
  styleUrls: ['./tab-vuelos.component.scss']
})
export class TabVuelosComponent implements OnInit {


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
  EnumCabins = EnumCabins;


  vuelos$: Observable<ICardAutocomplete[]>;
  vuelosLoading = false;
  vuelosInput$ = new Subject<string>();

  vuelos2$: Observable<ICardAutocomplete[]>;
  vuelosLoading2 = false;
  vuelosInput2$ = new Subject<string>();

  vuelosValue:EnumFlightType ; 



  constructor(private destineService: DestinyService, public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar, private router: Router
  ) {
    this.createForm();


    //  const data = this.destineService.searchMv();
    //  console.log(data);

  }


  ngOnInit(): void {
    this.loadVuelosOrigen();
    this.loadVuelosDestino();
  }


  get viajesForm(){
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

  convertFormatAutocomplete(array: IGeoTree[]): ICardAutocomplete[] {

    const nuevoArray: ICardAutocomplete[] = [];

    array.forEach((x) => {

      const elementFind = nuevoArray.find(item => item.id == x.aerocodiata);

      if (!elementFind && x.tn_iata_padre_fn == "0") {
        const obj = {
          id: x.aerocodiata,
          codigo: x.city_code,
          title: x.city,
          children: []
        }
        nuevoArray.push(obj)
      } else if (!elementFind && x.tn_iata_padre_fn == "2") {

        const obj = {
          id: x.aerocodiata,
          codigo: "",
          title: "",
          children: [
            {
              id: x.aerocodiata,
              codigo: x.city_code,
              title: x.city,
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
      clase: new FormControl(EnumCabins.economico),
      viajes: new FormControl(EnumFlightType.ida_vuelta),
      origen: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
      origenHotel: new FormControl('')

    });
  }

  navigateToResponseUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  validateTab() {
    const errors = [];

    if (!this.isValidate()) {
      errors.push("Error al definir los pasajeros, debe agregar al menos uno");
    }
    if (this.form.controls['origen'].invalid) {
      errors.push("El origen es requerido");
    }
    if (this.form.controls['destino'].invalid) {
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



  public searchVueloHotel() {
    const errors = this.validateTab();

    if (errors.length > 0) {
      this.openSnackBar(errors.join(" - "))
      return;
    }

    const url = this.getUrl();
    this.navigateToResponseUrl(url);
  }



  insertTag(params:any){
    const getTipoTag = ((tipo:EnumFlightType)=>{

      if(tipo == EnumFlightType.ida ){
        return {
          codigo: 'SI',
          descripcion: 'Solo Ida'
        }
      }else if( tipo == EnumFlightType.ida_vuelta){
        return {
          codigo: 'IV',
          descripcion: 'Ida y Vuelta'
        }
      }else if (tipo == EnumFlightType.multy_city){
        return {
          codigo: 'MC',
          descripcion: 'Multi City'
        }
      }else{
        return {
          codigo: '',
          descripcion: ''
        }
      }
    }) 

    const nombre = `${params.idOrigen}_${params.idDestino}_${params.businessClass?'BS':'EC'}_${getTipoTag(params.flightType).codigo}`;

    let diasAnticipacion = moment( params.startDate, "DD/MM/YYYY").diff(moment(), 'days');
    let duracionViaje = 0;

    let fechaRegreso = '';

    if(params.flightType === EnumFlightType.ida_vuelta ){
       duracionViaje =  moment( params.endDate, "DD/MM/YYYY").diff(moment( params.startDate, "DD/MM/YYYY"), 'days');
       fechaRegreso = moment( params.endDate, "DD/MM/YYYY").format("YYYY/MM/DD");
    }
  

    const model = new ModelTaggingVuelos(
      nombre,
      params.origen.title,
      params.destino.title,
      params.businessClass?'Business':'Economy',
      getTipoTag(params.flightType).descripcion,
      this.distributionObject.adultos + this.distributionObject.ninos + this.distributionObject.infantes,
      this.distributionObject.adultos,
      this.distributionObject.ninos,
      this.distributionObject.infantes,
      0,
      moment( params.startDate, "DD/MM/YYYY").format("YYYY/MM/DD"),
      fechaRegreso,
      diasAnticipacion,
      duracionViaje
    )
    
    TaggingService.buscarVuelos(model);

  }


  getParams() {
    let params = new ParamsVuelos(
      this.fromDate,
      this.toDate,
      this.form,
      this.citysDestinosSelect,
      this.citysOrigenSelect
    ).getParams();
    return params;
  }
  public getUrl() {
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
    return this.popUpElement ?.isValid();
  }


  changeDate(value: ClassValueCalendar) {
    this.toDate = value.toDate;
    this.fromDate = value.fromDate;
  }
}
