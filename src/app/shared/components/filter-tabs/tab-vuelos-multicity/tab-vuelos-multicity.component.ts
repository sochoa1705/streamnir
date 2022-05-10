import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICardAutocomplete } from "../../card-autocomplete/card-autocomplete.interface";
import { concat, Observable, of, Subject } from 'rxjs';
import { EnumFlightType } from "../../tabs/tabs.models";
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { IGeoTree } from '../tab-vuelos/tab-vuelos.interfaces';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-tab-vuelos-multicity',
    templateUrl: './tab-vuelos-multicity.component.html',
    styleUrls: ['./tab-vuelos-multicity.component.scss']
  })
  export class TabVuelosMulticityComponent implements OnInit{

    isSubmit = false;

    vuelos$: Observable<ICardAutocomplete[]>;
  vuelosLoading = false;
  vuelosInput$ = new Subject<string>();

  vuelos2$: Observable<ICardAutocomplete[]>;
  vuelosLoading2 = false;
  vuelosInput2$ = new Subject<string>();

  vuelosValue:EnumFlightType ;
  toDate: NgbDate | null;
  fromDate: NgbDate | null;
  maxTramo: number = 5;

  model: string;
  hoveredDate: NgbDate | null = null;
  currentDate: NgbDate | null = null;
  systemCurrentDate: string;

  dpFromDate3: any;

  @Input() controls: any[];
  @Input() requiredFromDate: boolean ;
  @Input() placeHolder: string = 'Salida';

  @Output() changeDateEvent = new EventEmitter<ClassValueCalendar>();

    constructor(private destineService: DestinyService, private fb: FormBuilder,public formatter: NgbDateParserFormatter, private calendar: NgbCalendar){

    }

    ngOnInit(): void {

      this.loadVuelosOrigen();
      this.loadVuelosDestino();
  
      //this.logicPathVuelos();
  
    }

    validateInput(input: string): NgbDate | null{
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed))
        ? NgbDate.from(parsed)
        : this.currentDate;
    }


    onDateSelection(group: any,date: NgbDate) {
      group.get('departureDate')?.setValue(this.formatter.format(date));
    }

    emitValue(){
      console.log('emit 5', this.fromDate);
      this.changeDateEvent.emit( new ClassValueCalendar(this.toDate,this.fromDate) )
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

    changeDate(value: ClassValueCalendar) {
      this.toDate = value.toDate;
      this.fromDate = value.fromDate;
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
            children: [],
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

    addTramo(groupIndex: number): void {
      if (groupIndex >= this.maxTramo) return;
      const formGroup = this.controls[groupIndex] as FormGroup;
      this.controls.push(
        this.fb.group({
          origen: [formGroup.controls.destino.value],
          destino: [''],
          departureDate: [''],
        })
      );
    }
    deleteTramo(group: any) {
      this.controls.splice(this.controls.indexOf(group), 1);
    }

    dateToNgbDateStruct(date: string): NgbDateStruct{
      return this.convertToNgbDateStruct(date);
    }

    convertToNgbDateStruct(date: string) {
      date = date || moment().format("DD/MM/YYYY");
      return {
        day: +date.split('/')[0],
        month: +date.split('/')[1],
        year: +date.split('/')[2],
      };
    }

  }