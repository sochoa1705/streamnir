import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { NgbDateAdapter, } from '@ng-bootstrap/ng-bootstrap';
import { FlightsService } from 'src/app/Services/flights/flights.service';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */

export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],

})



export class FilterComponent implements OnInit {
  form!: FormGroup;
  model!: NgbDateStruct;
  citys: any;
  stateCtrl = new FormControl();
  stateCtrl2 = new FormControl();
  filteredStates: Observable<State[]>;

  dpFromDate: any;
  dpToDate: any;

  // fechaInicial : NgbDate | undefined;
  // FechaFinal : NgbDate | undefined;
  diffInDays: number | undefined


  showOption: Boolean = true;
  showPasajero() {
    this.showOption = this.showOption ? false : true;
  }


  model1: string | undefined;
  model2: string | undefined;
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'origen.png'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'origen.png'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'origen.png'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'origen.png'
    },

  ];
  selected = 'idavuelta';

  pasajeros: any = [
    {
      adultos: 6,
      ninos: 1,
      infantes: 1
    }
  ];
  @ViewChild('inputOrigen', { static: false }) origen!: ElementRef<HTMLInputElement>
  @ViewChild('inputDestino', { static: false }) destino!: ElementRef<HTMLInputElement>
  classAutoOrigen!: boolean
  classAutoDestino!: boolean
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null
  toDate: NgbDate | null;

  constructor(
    public route: Router,
    private flightsService: FlightsService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => {
          return state ? this._filter(state) : this.states.slice()
        })
      );
  }
  private _filter(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }
  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  ngOnInit(): void {
    this.classAutoOrigen = false
    this.classAutoDestino = false
    this.createForm()

    //this.getListVuelos('lim')
  }
  ngAfterViewInit() {
    console.log(this.origen.nativeElement.value);
  }

  getListVuelos(e: any) {
    console.log(e)
    this.flightsService.getCiudades(e).subscribe(
      data => {
        console.log(data);

        this.citys = data
      },
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }

  autoComplete(e: any) {
    let inp = e.target.name
    let inputy
    if (inp === 'origen') {
      inputy = this.origen.nativeElement.value
      this.setClass(inputy, 'origen')
    } else {
      inputy = this.destino.nativeElement.value
      this.setClass(inputy, 'destino')
    }
    console.log(inputy);

    this.citys = []
  }

  setClass(inputy: string, inp: string) {
    if (inp === 'origen') {
      if (inputy.length == 0) {
        this.classAutoOrigen = false
      } else {
        this.classAutoOrigen = true
      }
    } else {
      if (inputy.length == 0) {
        this.classAutoDestino = false
      } else {
        this.classAutoDestino = true
      }
    }
    if (inputy.length >= 3) {
      this.getListVuelos(inputy)
    }

  }

  createForm() {
    this.form = new FormGroup({
      tipo: new FormControl('idavuelta'),
      catergory: new FormControl('economy'),
      // adultos: new FormControl(0),
      ninos: new FormControl(0),
      infantes: new FormControl(0),
      origen: new FormControl(),
      destino: new FormControl(''),
      range: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    })
  }

  send() {
    // console.log(this.form.value);
    // debugger;
    var FeIni = this.fromDate!.month + "/" + this.fromDate!.day + "/" + this.fromDate!.year
    var FeFin = this.toDate!.month + "/" + this.toDate!.day + "/" + this.toDate!.year

    // var FeIni = this.fromDate?.month + "/" + this.fromDate?.day + "/" + this.fromDate?.year;
    // var FeFin = this.toDate?.month + "/" + this.toDate?.day + "/" + this.toDate?.year;
    const date1 = new Date(FeIni);
    const date2 = new Date(FeFin);

    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    this.route.navigateByUrl('/vuelos/resultados');

  }

  // count(valor: number, e: any) {
  //   console.log('HOLA');

  //   let item = e.target.name;
  //   let pasajero = this.pasajeros[0][item];
  //   if (pasajero >= 100 && valor >= 0) {
  //     return pasajero = 100
  //   }
  //   if (pasajero <= 0 && valor < 0) {
  //     return pasajero = 0
  //   }
  //   console.log(pasajero);

  //   return pasajero = pasajero + valor
  // }

  customers(e: any) {
    let cdr: any = document.getElementById('cdr');
    let btn: any = e.clientY;
    let top = e.screenY;
    let top2 = e.clientY;
    let scrolTop = document.body.scrollHeight;
    let scren = window.innerHeight;
    let scrent = window.scrollY;
    // console.log(e.pageX);
    // console.log(e.pageY);
    // console.log(scrent);
    // console.log(btn);
    // console.log(scren);
    // console.log(scrent);
    let n = btn + scrent;

    // cdr.style = `display:block;top:${n}px; left: ${e.screenX}px; width:300px`;
    cdr.style = `display:block;top:${e.pageY}px; left: ${e.pageX}px; width:310px`;

  }

  customerClose(e: any) {
    let cdr: any = document.getElementById('cdr');
    cdr.style = `display:none`;
  }

  count(valor: number, e: any) {
    // (document.getElementById("num1") as HTMLInputElement).value
    let adultos: any = Number((document.getElementById('adultos') as HTMLInputElement).value);
    // console.log(adultos);
    // console.log(adultos.value);
    // console.log(e);
    adultos = 10;
    let item = e.target.name;
    // console.log(valor);

    // let pasajero = this.form.value.adultos;
    // if (pasajero >= 100 && valor >= 0) {
    //   return pasajero = 100
    // }
    // if (pasajero <= 0 && valor < 0) {
    //   return pasajero = 0  
    // }
    // console.log(pasajero);
    // console.log(pasajero + valor);
    //console.log(this.pasajeros[0]);

    adultos = adultos + valor
  }

}
