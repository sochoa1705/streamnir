import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { concat, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError, map, debounceTime } from 'rxjs/operators';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { ICardAutocomplete } from '../../card-autocomplete/card-autocomplete.interface';
import { EnumCabins, EnumFlightType } from '../../flights/models/flights.interface';
import { IDistributionObject, PopUpPasajeroComponent } from '../../pop-up-pasajero/pop-up-pasajero.component';
import { ParamsVueloHotel, ParamsVuelos, URLVueloHotel, URLVuelos } from '../../tabs/tabs.models';
import { IGeoTree } from './tab-vuelos.interfaces';

@Component({
  selector: 'app-tab-vuelos',
  templateUrl: './tab-vuelos.component.html',
  styleUrls: ['./tab-vuelos.component.scss']
})
export class TabVuelosComponent implements OnInit{


  @ViewChild('popUp') popUpElement: PopUpPasajeroComponent | undefined;

  form!: FormGroup;
  fromDate: NgbDate | null
  citysOrigenSelect: IGeoTree[]= [];
  citysDestinosSelect: IGeoTree[]= [];
  origen: any;
  destino: any;
  origenHotel: any;
  toDate: NgbDate | null;

  distributionObject: IDistributionObject;
  hoveredDate: NgbDate | null = null;

  EnumFlightType = EnumFlightType;
  EnumCabins = EnumCabins;




  vuelos$:Observable<ICardAutocomplete[]>;
  vuelosLoading = false;
  vuelosInput$ = new Subject<string>();

  vuelos2$:Observable<ICardAutocomplete[]>;
  vuelosLoading2 = false;
  vuelosInput2$ = new Subject<string>();



  constructor(private calendar: NgbCalendar, private destineService: DestinyService, public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar, private router: Router
  ){
    this.createForm();


    //  const data = this.destineService.searchMv();
    //  console.log(data);

  }


  ngOnInit(): void {
      this.loadVuelosOrigen();
      this.loadVuelosDestino();
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
            map(item=> this.convertFormatAutocomplete(item))
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
            map(item=> this.convertFormatAutocomplete(item))
        )
    )
  }

  convertFormatAutocomplete(array:IGeoTree[]):ICardAutocomplete[]{

      const nuevoArray:ICardAutocomplete[] = [];

      array.forEach((x) => {

        const elementFind = nuevoArray.find(item=>item.id == x.aerocodiata);

        if(!elementFind && x.tn_iata_padre == "0"){
          const obj = {
            id: x.aerocodiata,
            codigo: x.city_code,
            title: x.city,
            children: []
          }
          nuevoArray.push(obj)
        }else if(!elementFind && x.tn_iata_padre == "2"){

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

        }else if(elementFind && x.tn_iata_padre == "2"){

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
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl(EnumCabins.economico),
      viajes: new FormControl(EnumFlightType.ida_vuelta),
      origen: new FormControl(),
      destino: new FormControl(''),
      origenHotel: new FormControl('')

    });
  }

  navigateToResponseUrl(url: string): void {
    this.router.navigateByUrl(url);
  }


  public searchVueloHotel() {
    if (!this.isValidate()) {
      this.openSnackBar("Error de validacion")
      return;
    }


    const url = this.getUrl();
    this.navigateToResponseUrl(url);
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

    let vuelo = { ...params, ...this.distributionObject }
    console.log(this.distributionObject)


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
