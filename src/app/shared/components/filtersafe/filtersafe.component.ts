import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { NgbDateAdapter, } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/Services/notification.service';
import * as moment from "moment";
import { ModelTaggingBuscarSeguros } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';

export interface IFormSeguros {
  origenSafe: string;
  destinoSafe: string;
  passengers: Passenger[];
  ClienteCotizacion: any[];
  countCustomers: number;
  Edades: string;
  fromDate: string;
  toDate: string;
  days: string;
  destinyString: DestinyString;
  aniosNacimiento: AniosNacimiento[];
}

export interface AniosNacimiento {
  anio: number;
  edad: number;
}

export interface DestinyString {
  id_destino: string;
  descripcion_destino: string;
  es_nacional: number;
  ref_assistcard: number;
}

export interface Passenger {
  edad: string;
  fechaNacimiento: string;
}


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

export interface Clientes {
  Edad: string;
  FechaNacimiento: string;
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
export class FiltersafeComponent implements OnInit {

  @Input() options: any;
  @Input() plan: any;

  insuranceQuoteForm: FormGroup;

  model!: NgbDateStruct;
  selected = 'idavuelta';
  stateCtrl = new FormControl();
  stateCtrl2 = new FormControl();
  customers!: number;
  ageCustomers: any;
  ClienteCotizacion: Array<any> = [];
  anios: Array<any> = [];
  showPassengerBox: boolean = false;
  limitePassenger = false;
  limit = 0;

  errors: any[] = []
  MSG_EMPTY: string = 'none'

  MSG_CUSTOMERS: string = 'age'
  MSG_DESTINO: string = 'destinoSafe'
  MSG_OUTFLY: string = 'fromDate'
  MSG_INFLY: string = 'toDate'

  model1: string | undefined;
  model2: string | undefined;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  unidadNegocio: any;
  plansAC: any = [];
  plans: any = [];
  dollar: any;
  pop: any;
  coverageDisplay: boolean = false;
  coverageList: any;
  asistMedic: any;

  json = {
    detailPay: 'safe',
    filter: 'filtersafe',
    title: '!Viaja seguro!',
    asistencia: false,
    reembolso: false,
    detalleViaje: false,
    detalleCobertura: true,
    cupon: false,
  }

  @ViewChild('dpFromDate', { static: false }) FromDate2!: ElementRef<HTMLInputElement>;
  @ViewChild('dpToDate', { static: false }) ToDate2!: ElementRef<HTMLInputElement>;
  @ViewChild('menorEdad', { static: false }) menor!: ElementRef<HTMLInputElement>;
  @ViewChild('adulto', { static: false }) adulto!: ElementRef<HTMLInputElement>;
  @ViewChild('mayor', { static: false }) mayor!: ElementRef<HTMLInputElement>;
  @ViewChild('destino', { static: false }) destino!: ElementRef<HTMLInputElement>;
  // @ViewChild('dpFromDate', { static: false }) dpFromDate!: ElementRef<HTMLInputElement>;
  // @ViewChild('dpToDate', { static: false }) dpToDate!: ElementRef<HTMLInputElement>;

  constructor(
    public _router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private notification: NotificationService,
    private _formBuilder: FormBuilder
  ) {
    this.fromDate = null
    this.toDate = null
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.insuranceQuoteForm = this.createInsuranceQuoteForm();
    this.addPassenger();
  }

  createInsuranceQuoteForm(): FormGroup {
    return this._formBuilder.group({
      origenSafe: ['510'],
      destinoSafe: ['', [Validators.required]],
      fromDate: [''],
      toDate: [''],
      passengers: this._formBuilder.array([])
    });
  }

  get passengers() {
    return this.insuranceQuoteForm.get('passengers') as FormArray;
  }

  addPassenger(): void {

    const fechaFormat = moment().format('DD/MM/YYYY');

    let limite = this.insuranceQuoteForm.controls['passengers'].value.length + 1;

    this.limit = limite;
    if (limite > 4) {
      this.limitePassenger = true;
    }

    let passengerFormGroup = this.createPassengerForm();
    const row: any = {
      edad: '',
      fechaNacimiento: moment().format('DD/MM/YYYY')
    };

    passengerFormGroup.patchValue(row);
    this.passengers.push(passengerFormGroup);
  }

  createPassengerForm(): FormGroup {
    return this._formBuilder.group({
      edad: [''],
      fechaNacimiento: []
    });
  }

  deletePassenger(index: number): void {
    let limite = this.insuranceQuoteForm.controls['passengers'].value.length - 1
    this.limit = limite

    if (this.limit < 5) {
      this.limitePassenger = false
    }

    this.passengers.removeAt(index);
  }


  confirmPassengers(): void {
    this.showPassengerBox = !this.showPassengerBox;

    let array = this.insuranceQuoteForm.controls['passengers'].value;
    let Ages = []

    for (let i in array) {

      let indice = Number(i);

      let age = Number(this.insuranceQuoteForm.controls['passengers'].value[i].edad);

      let fecha = this.insuranceQuoteForm.controls['passengers'].value[i].fechaNacimiento;
      const anio = moment(fecha, 'DD/MM/YYYY').year();

      let anioNacio: any = anio - age;

      Ages.push(age);
      this.ageCustomers = Ages.join(';');

      this.anios.push({ anio: Number(anioNacio), edad: age });
    }
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

  validForm() {

    this.errors = []

    let age: string = this.insuranceQuoteForm.getRawValue()['passengers'][0]['edad']
    if (age === undefined || age === null || age.trim() === '') {
      this.notification.showNotificacion("Error", "Debe ingresar la edad del pasajero", 10)
      this.errors.push({ name: this.MSG_CUSTOMERS, message: 'Debe ingresar la edad' })

      this.showPassengerBox = true;
    }

    let destinoSafe: string = this.insuranceQuoteForm.getRawValue()['destinoSafe']
    if (destinoSafe === undefined || destinoSafe === null || destinoSafe.trim() === '') {
      this.errors.push({ name: this.MSG_DESTINO, message: 'Elija el Destino' })
    }

    // let fromDate: string = this.form.getRawValue()['fromDate']
    let fromDate: string = this.FromDate2.nativeElement.value
    if (fromDate === undefined || fromDate === null || fromDate.trim() === '') {
      this.errors.push({ name: this.MSG_OUTFLY, message: 'Elija La fecha' })
    }

    // let fromDate: string = this.form.getRawValue()['fromDate']
    let toDate: string = this.ToDate2.nativeElement.value
    if (toDate === undefined || toDate === null || toDate.trim() === '') {
      this.errors.push({ name: this.MSG_INFLY, message: 'Elija la fecha de llegada' })
    }

    return this.errors.length === 0
  }

  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }


  insertTag(form: IFormSeguros) {
    const edades = form.Edades.split(';');
    const sum = edades.reduce((acc, el) => (acc = Number(el) + acc), 0);
    const promEdades = sum / edades.length;

    const tag = new ModelTaggingBuscarSeguros(
      form.destinyString.descripcion_destino,
      form.destinyString.id_destino,
      form.passengers.length,
      promEdades,
      form.fromDate,
      form.toDate,
      "PE",
      "Peru",
      Number(this.diffDays())
    )

    console.log('tagde buscar');
    console.log(JSON.stringify(tag));

    TaggingService.tagBuscarSeguros(tag);
  }

  quoteNow() {

    if (this.validForm()) {
      let fechaSalida = this.FromDate2.nativeElement.value
      let fechaVuelta = this.ToDate2.nativeElement.value
      let startDate = moment(fechaSalida, 'D/M/YYYY').format('DD/MM/YYYY')
      let endDate = moment(fechaVuelta, 'D/M/YYYY').format('DD/MM/YYYY')

      this.insuranceQuoteForm.removeControl('fromDate')
      this.insuranceQuoteForm.removeControl('toDate')
      this.insuranceQuoteForm.addControl('ClienteCotizacion', new FormControl(this.ClienteCotizacion))
      this.insuranceQuoteForm.addControl('countCustomers', new FormControl(this.ClienteCotizacion.length))
      this.insuranceQuoteForm.addControl('Edades', new FormControl(this.ageCustomers))
      this.insuranceQuoteForm.addControl('fromDate', new FormControl(startDate))
      this.insuranceQuoteForm.addControl('toDate', new FormControl(endDate))
      this.insuranceQuoteForm.removeControl('days')
      this.insuranceQuoteForm.addControl('days', new FormControl(this.diffDays()))
      this.insuranceQuoteForm.removeControl('destinyString')
      this.insuranceQuoteForm.addControl('destinyString', new FormControl(this.destinySring()))
      //validacion fecha de nacimiento ▼
      this.insuranceQuoteForm.addControl('aniosNacimiento', new FormControl(this.anios))

      //console.log(this.fromDate);
      let form = this.insuranceQuoteForm.value
      localStorage.removeItem('Datasafe')

      this.insertTag(form);

      localStorage.setItem('Datasafe', JSON.stringify(form));

      this._router.navigateByUrl('/seguros', { skipLocationChange: true }).then(() =>
        this._router.navigate(["/seguros/planes"]));
    }
  }

  destinySring() {
    for (const i of this.options) {
      if (String(i.ref_assistcard) === this.destino.nativeElement.value) {
        console.log(i.descripcion_destino);
        return i
      }
    }
  }

  diffDays() {
    var FeIni = this.fromDate!.month + "/" + this.fromDate!.day + "/" + this.fromDate!.year
    var FeFin = this.toDate!.month + "/" + this.toDate!.day + "/" + this.toDate!.year
    const date1 = new Date(FeIni)
    const date2 = new Date(FeFin)
    var diff = Math.abs(date1.getTime() - date2.getTime())
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1
    return String(diffDays);
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

  allowNumeric(event: KeyboardEvent) {
    const pattern = /[0-9]/;

    if (!pattern.test(event.key))
      event.preventDefault();
  }

  onPasteNumeric(event: ClipboardEvent) {
    event.preventDefault();

    if (event.clipboardData != null) {
      const texto: string = event.clipboardData.getData('text/plain').replace(/\D/g, '');

      document.execCommand('insertText', false, texto);
    }
  }

  denyDrop(event: DragEvent) {
    event.preventDefault();
  }


}