import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateISOParserFormatter} from './dateformat';

export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  // providers: [
  //    {provide: FilterComponent, useClass: NgbDateISOParserFormatter}
  //   ]
})
export class FilterComponent implements OnInit {
  form!: FormGroup;
  model!: NgbDateStruct;
  stateCtrl = new FormControl();
  stateCtrl2 = new FormControl();
  filteredStates: Observable<State[]>;
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

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  constructor(public route: Router,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
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
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      tipo: new FormControl('idavuelta'),
      catergory: new FormControl('economy'),
      // adultos: new FormControl(0),
      ninos: new FormControl(0),
      infantes: new FormControl(0),
      origen: new FormControl(''),
      destino: new FormControl(''),
      range: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    })
  }

  send() {
    console.log(this.form.value);
    this.route.navigateByUrl('/home/vuelos/resultados');
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
    console.log(e.pageX);
    console.log(e.pageY);
    // console.log(scrent);
    // console.log(btn);
    // console.log(scren);
    // console.log(scrent);
    let n = btn + scrent;

    // cdr.style = `display:block;top:${n}px; left: ${e.screenX}px; width:300px`;
    cdr.style = `display:block;top:${e.pageY}px; left: ${e.pageX}px; width:310px`;

  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  customerClose(e: any) {
    let cdr: any = document.getElementById('cdr');
    cdr.style = `display:none`;
  }

  count(valor: number, e: any) {
    // (document.getElementById("num1") as HTMLInputElement).value
    let adultos: any = Number((document.getElementById('adultos') as HTMLInputElement).value);
    console.log(adultos);
    // console.log(adultos.value);
    // console.log(e);
    adultos = 10;
    let item = e.target.name;
    console.log(valor);

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
