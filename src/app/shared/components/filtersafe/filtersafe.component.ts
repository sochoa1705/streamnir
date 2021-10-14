import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { NgbDateAdapter, } from '@ng-bootstrap/ng-bootstrap';
import { FlightsService } from 'src/app/Services/flights/flights.service';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-filtersafe',
  templateUrl: './filtersafe.component.html',
  styleUrls: ['./filtersafe.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class FiltersafeComponent implements OnInit, AfterViewInit {
  @Input() options: any;
  @Input() plan: any;

  form!: FormGroup;
  model!: NgbDateStruct;
  selected = 'idavuelta';
  stateCtrl = new FormControl();
  stateCtrl2 = new FormControl();
  customers!: number;
  showOption: Boolean = true;

  model1: string | undefined;
  model2: string | undefined;
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
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  @ViewChild('dpFromDate', { static: false }) FromDate2!: ElementRef<HTMLInputElement>;
  @ViewChild('dpToDate', { static: false }) ToDate2!: ElementRef<HTMLInputElement>;
  @ViewChild('menorEdad', { static: false }) menor!: ElementRef<HTMLInputElement>;
  @ViewChild('adulto', { static: false }) adulto!: ElementRef<HTMLInputElement>;
  @ViewChild('mayor', { static: false }) mayor!: ElementRef<HTMLInputElement>;
  // @ViewChild('dpFromDate', { static: false }) dpFromDate!: ElementRef<HTMLInputElement>;
  // @ViewChild('dpToDate', { static: false }) dpToDate!: ElementRef<HTMLInputElement>;

  constructor(
    public route: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    public elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.fromDate = null
    this.toDate = null
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
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
    this.createForm()
  }

  ngAfterViewInit() {
    console.log(this.FromDate2.nativeElement.value);
    //this.form.addControl('fromDate', new FormControl(this.FromDate2.nativeElement.value));
    // this.form.updateValueAndValidity();
  }

  send() {
    console.log(this.form);

    this.form.removeControl('fromDate');
    this.form.removeControl('toDate');
    this.form.addControl('fromDate', new FormControl(this.FromDate2.nativeElement.value));
    this.form.addControl('toDate', new FormControl(this.ToDate2.nativeElement.value));
    this.form.addControl('days', new FormControl())

    console.log(this.fromDate);
    let form = this.form.value
    console.log(form);
    localStorage.setItem('form', JSON.stringify(form));
    console.log(this.FromDate2.nativeElement.value);
    const navigationExtras: NavigationExtras = { state: this.plan };
    this.route.navigateByUrl('/home/seguros/planes', navigationExtras);
  }

  createForm() {
    this.form = new FormGroup({
      // adulto: new FormControl(),
      // menor: new FormControl(),
      // mayor: new FormControl(), 
      origenSafe: new FormControl(0),
      destinoSafe: new FormControl('', Validators.required),
      fromDate: new FormControl(''), // <== Cambia
      toDate: new FormControl(''), // <== Cambia
      ages: new FormArray([])
    })
  }

  getArrayAges(){
    return (<FormArray>this.form.get('ages')).controls
  }

  addAge() {
    (<FormArray>this.form.controls['ages']).push(
      new FormGroup({
        fehca: new FormControl()
      }));
  }

  removeAge(index:any) {
    (<FormArray>this.form.controls['ages']).removeAt(index);
  }

  customersAdd() {
    console.log(this.menor.nativeElement.value);
    let totalCustomers = Number(this.mayor.nativeElement.value) + Number(this.menor.nativeElement.value) + Number(this.adulto.nativeElement.value)
    this.customers = totalCustomers;

    if (totalCustomers === 0) {
      this.form.addControl('menor', new FormControl(this.menor.nativeElement.value));
      this.form.addControl('adulto', new FormControl(this.adulto.nativeElement.value));
      this.form.addControl('mayor', new FormControl(this.mayor.nativeElement.value));
      this.form.addControl('total', new FormControl(totalCustomers));
    } else {
      this.form.removeControl('menor');
      this.form.removeControl('adulto');
      this.form.removeControl('mayor');
      this.form.removeControl('total');

      this.form.addControl('menor', new FormControl(this.menor.nativeElement.value));
      this.form.addControl('adulto', new FormControl(this.adulto.nativeElement.value));
      this.form.addControl('mayor', new FormControl(this.mayor.nativeElement.value));
      this.form.addControl('total', new FormControl(totalCustomers));
      this.showOption = !this.showOption
    }
  }

  showPasajero() {
    this.showOption = !this.showOption

    if (this.customers !== undefined) {
      setTimeout(() => {
        this.menor.nativeElement.defaultValue = this.form.getRawValue().menor
        this.adulto.nativeElement.defaultValue = this.form.getRawValue().adulto
        this.mayor.nativeElement.defaultValue = this.form.getRawValue().mayor
      }, 1000)
    }
  }

  count(valor: number, e: any) {
    let customer: any;
    console.log(valor);
    switch (e) {
      case 'menor':
        customer = this.menor.nativeElement
        break;
      case 'adulto':
        customer = this.adulto.nativeElement
        break;
      case 'mayor':
        customer = this.mayor.nativeElement
        break;
      default:
      // code block
    }
    // let menor = this.pasajeros.menor
    // let adultos: any = Number((document.getElementById('adultos') as HTMLInputElement).value);

    // let menor = Number(this.menorEdad.nativeElement.value)
    let inputvalue = Number(customer.value)
    inputvalue = inputvalue + valor
    this.renderer.setAttribute(customer, 'value', String(inputvalue))


    // (document.getElementById("num1") as HTMLInputElement).value
    // let adultos: any = Number((document.getElementById('adultos') as HTMLInputElement).value);
    // console.log(adultos.value);
    // adultos = 10;
    // let item = e.target.name;

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

    // adultos = adultos + valor
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }


}
