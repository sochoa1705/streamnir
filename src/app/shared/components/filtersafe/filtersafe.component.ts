import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
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
  ClienteCotizacion: Array<any> = [];
  showOption: Boolean = true;
  limitePassenger = false
  limit = 0

  model1: string | undefined;
  model2: string | undefined;

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
    this.addPassenger(null)
  }

  ngAfterViewInit() {
    console.log(this.FromDate2.nativeElement.value);
    //this.form.addControl('fromDate', new FormControl(this.FromDate2.nativeElement.value));
    // this.form.updateValueAndValidity();
  }

  send() {
    // console.log(this.form);
    // console.log(this.form.controls['passenger'].value[0].age);
    // this.form.removeControl('passenger');
    this.form.removeControl('fromDate');
    this.form.removeControl('toDate');
    this.form.addControl('ClienteCotizacion', new FormControl(this.ClienteCotizacion));
    this.form.addControl('fromDate', new FormControl(this.FromDate2.nativeElement.value));
    this.form.addControl('toDate', new FormControl(this.ToDate2.nativeElement.value));
    this.form.addControl('days', new FormControl())

    //console.log(this.fromDate);
    let form = this.form.value
    console.log(form);
    localStorage.setItem('Datasafe', JSON.stringify(form));
    // console.log(this.FromDate2.nativeElement.value);
    const navigationExtras: NavigationExtras = { state: this.plan };
    this.route.navigateByUrl('/home/seguros/planes', navigationExtras);
  }


  createForm() {
    this.form = new FormGroup({
      // adulto: new FormControl(),
      // menor: new FormControl(),
      // mayor: new FormControl(), 
      origenSafe: new FormControl('510'),
      destinoSafe: new FormControl('', Validators.required),
      fromDate: new FormControl(''), // <== Cambia
      toDate: new FormControl(''), // <== Cambia
      passenger: new FormArray([
        // new FormGroup({
        //   age: new FormControl(0),
        // })
      ])
    })
  }

  getArraypassenger() {
    return (<FormArray>this.form.get('passenger')).controls
  }

  get agePass() {
    return 38
  }

  fechNac() {
    this.showOption = !this.showOption

    // (<FormArray>this.form.controls['passenger']).push(
    //   new FormControl()
    // )

    // let numer = this.form.controls['passenger'].value[0]
    // numer.addControl('es', new FormControl(this.form.controls['passenger'].value[0].age));
    // console.log(this.form.controls['passenger'].value.length)
    // let array = [1,2,3,4]
    let array = this.form.controls['passenger'].value
    for (let i in array) {
      // console.log(i);
      let indice = Number(i)
      // console.log(this.form.controls['passenger'].value[i].age);
      let age = Number(this.form.controls['passenger'].value[i].age);
      //let fech = Number(this.form.controls['passenger'].value[i].fecha);
      // this.form.controls['passenger'].valueChanges.subscribe(data => fech = fech - age);
      //fechga.Set(12)
      let fecha: FormArray = (<FormArray>this.form.get('passenger'))
      ['controls'][indice].value.fecha;
      let fechaEnd = Number(fecha) - age
      let dayFech:any = String(fechaEnd).substr(0, 2)
      let monthFech:any = String(fechaEnd).substr(2, 2)
      let yearFech:any = String(fechaEnd).substr(4, 4)

      let omac2 ={'Edad': String(age),'FechaNacimiento': String(dayFech + '/' + monthFech + '/'+ yearFech)}
      // omac.push(omac2)
      // console.log(fech);
      //  console.log(fech);
      //  console.log(age);
      this.ClienteCotizacion.push(omac2)
      //  console.log(this.form.controls);
      
    }

    // console.log(this.form.controls['passenger'].value[0].age);
  }

  addPassenger(e: any) {
    // console.log(e+1);
    let numss = e - 1;
    // console.log(this.form.controls['passenger'].value.length + 1);
    const fecha = new Date()
    const day = String(fecha.getDate() + 1).padStart(2, '0')
    const month = String(fecha.getMonth() + 1).padStart(2, '0')
    const year = String(fecha.getFullYear())

    //console.log(this.form.controls['passenger'].value);
    if (this.form.controls['passenger'].value.length < 2) {
      //console.log('1');
    } else {
      console.log(this.form.controls['passenger'].value[numss].age);
      // console.log('mas');
    }
    // console.log(this.form.controls['passenger'].value[1].age);

    const fechaFormat = day + month + year;
    const fechaNac = Number(fechaFormat);
    let limite = this.form.controls['passenger'].value.length + 1
    this.limit = limite
    if (limite > 4) {
      this.limitePassenger = true
    }

    (<FormArray>this.form.controls['passenger']).push(
      new FormGroup({
        age: new FormControl(),
        fecha: new FormControl(fechaNac),
      }));

      //this.form.controls['passenger'].addControl

  }

  removePassenger(index: any) {
    let limite = this.form.controls['passenger'].value.length - 1
    this.limit = limite

    if (this.limit < 5) {
      this.limitePassenger = false
    }
    (<FormArray>this.form.controls['passenger']).removeAt(index);
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

}
