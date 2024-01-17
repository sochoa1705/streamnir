import { Component, ElementRef, HostListener, Injectable, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { take } from 'rxjs/operators';

import { NotificationService } from 'src/app/Services/notification.service';
import { ModelTaggingBuscarSeguros, SearchTravelInsurance } from 'src/app/Services/analytics/tagging.models';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { InputRangeComponent } from '../input-range/input-range.component';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';

export interface IFormSeguros {
  origenSafe: string;
  destinoSafe: string;
  passengers: IPassenger[];
  ClienteCotizacion: any[];
  countCustomers: number;
  Edades: string;
  fromDate: string;
  toDate: string;
  days: string;
  destinyString: IDestinyString;
  aniosNacimiento: IAniosNacimiento[];
}

export interface IAniosNacimiento {
  anio: number;
  edad: number;
}

export interface IDestinyString {
  id_destino: string;
  descripcion_destino: string;
  es_nacional: number;
  ref_assistcard: number;
}

export interface IPassenger {
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
  @ViewChild('childDates') childDates!: InputRangeComponent;
  insuranceQuoteForm: FormGroup;

  model!: NgbDateStruct;
  selected = 'idavuelta';
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

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  pop: any;

  filters: any;
  filtersJSON: any;

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

  constructor(
    public _router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private renderer: Renderer2,
    private notification: NotificationService,
    private _formBuilder: FormBuilder,
    private coreService: DestinyService,
  ) {
    // this.fromDate = null
    // this.toDate = null
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.filters = localStorage.getItem('filters');
    this.filtersJSON = JSON.parse(this.filters) || {};
  }

  async ngOnInit(): Promise<void> {
    this.insuranceQuoteForm = this.createInsuranceQuoteForm();

    const destiny = JSON.parse(localStorage.getItem('destiny')!) || [];
    destiny.length > 0 ? this.options = destiny : await this.listDestiny();

    this.updateForm();
  }

  async listDestiny() {
    await new Promise<boolean>((resolve, reject) => { 
    let payload = new NMRequest();
    this.coreService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        const arrDestiny = response['Resultado']
        this.options = arrDestiny;
        resolve(true);
      },
      error: (err) => {
        console.error(err); 
        reject(false);
      }
    })
    })
  }

  createInsuranceQuoteForm(): FormGroup {
    return  this._formBuilder.group({
      origenSafe: ['510'],
      destinoSafe: ['', [Validators.required]],
      fromDate: [],
      toDate: [],
      passengers: this._formBuilder.array([])
    });
  }

  updateForm() {
    if (Object.keys(this.filtersJSON).length > 0) {
      this.getPassengers();
      console.log('updateForm', this.filtersJSON)

      const dmy = (param: string) => {
        const [day, month, year] = param.split('/');
        return {
          day,
          month,
          year,
        }
      }

      const fromDate = dmy(this.filtersJSON.fromDate)
      const toDate = dmy(this.filtersJSON.toDate)

      console.log({ fromDate, toDate });

      this.insuranceQuoteForm.patchValue({
        destinoSafe: this.filtersJSON.destination,
        fromDate,
        toDate,
      })
    } else {
      this.addPassenger()
    }
  }

  get passengers() {
    return this.insuranceQuoteForm.get('passengers') as FormArray;
  }
//   get getFromDate(): NgbDate | null {
//   const fromDateControl = this.insuranceQuoteForm.get('fromDate');
//   return fromDateControl ? fromDateControl.value : null;
// }

// get getToDate(): NgbDate | null {
//   const toDateControl = this.insuranceQuoteForm.get('toDate');
//   return toDateControl ? toDateControl.value : null;
// }

  addPassenger(): void {
    console.log('addPassenger')

    this.limit = this.insuranceQuoteForm.controls['passengers'].value.length + 1;

    if (this.limit > 4)
      this.limitePassenger = true;

    let formGroup = this.createPassengerForm();
    const row: any = {
      edad: '',
      fechaNacimiento: moment().format('DD/MM/YYYY')
    };

    formGroup.patchValue(row);
    this.passengers.push(formGroup);
  }

  getPassengers(): void {
    console.log('getPassengers');
    
    this.limit = this.filtersJSON.passengers.length;

    if (this.limit > 4)
      this.limitePassenger = true;

    this.filtersJSON.passengers.forEach((element: any) => {
      let formGroup = this.createPassengerForm();
      formGroup.patchValue(element);
      this.passengers.push(formGroup);
    });
  }

  createPassengerForm(): FormGroup {
    return this._formBuilder.group({
      edad: [''],
      fechaNacimiento: []
    });
  }

  deletePassenger(index: number): void {
    this.limit = this.insuranceQuoteForm.controls['passengers'].value.length - 1

    if (this.limit < 5) {
      this.limitePassenger = false
    }

    this.passengers.removeAt(index);
  }

  confirmPassengers(): void {
    this.showPassengerBox = !this.showPassengerBox;

    const arrPassengers = this.insuranceQuoteForm.controls['passengers'].value;
    const arrAges = []

    for (let i in arrPassengers) {
      Number(i);

      let age = Number(this.insuranceQuoteForm.controls['passengers'].value[i].edad);

      this.insuranceQuoteForm.controls['passengers'].value[i].fechaNacimiento = moment().subtract(age, 'years').format('DD/MM/YYYY');

      let fecha = this.insuranceQuoteForm.controls['passengers'].value[i].fechaNacimiento;
      let anioNacio: any = moment(fecha, 'DD/MM/YYYY').year();

      arrAges.push(age);

      this.ageCustomers = arrAges.join(';');
      this.anios.push({ anio: Number(anioNacio), edad: age });
    }
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
      this.showPassengerBox = true;
      this.notification.showNotificacion("Error", "Debe ingresar la edad del pasajero", 10)
      this.errors.push({ name: this.MSG_CUSTOMERS, message: 'Debe ingresar la edad' })
    }

    let destinoSafe: string = this.insuranceQuoteForm.getRawValue()['destinoSafe']
    if (destinoSafe === undefined || destinoSafe === null || destinoSafe.trim() === '') {
      this.notification.showNotificacion("Error", "Debe ingresar el destino", 10)
      this.errors.push({ name: this.MSG_DESTINO, message: 'Elija el Destino' })
    }

    if (this.fromDate === undefined || this.fromDate === null) {
      this.errors.push({ name: this.MSG_OUTFLY, message: 'Elija La fecha' })
    }

    if (this.toDate === undefined || this.toDate === null) {
      this.errors.push({ name: this.MSG_INFLY, message: 'Elija la fecha de llegada' })
    }

    return this.errors.length === 0
  }

  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }

  insertTag(form: IFormSeguros) {
    const edades = form.Edades.split(';');
    const sum = edades.reduce((acc, el) => (Number(el) + acc), 0);
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

    TaggingService.tagBuscarSeguros(tag);

    const daysFromNow = moment(form.fromDate, 'DD/MM/YYYY').diff(moment(), 'days');

    const model: SearchTravelInsurance = {
      event: 'nmv_seguros_buscar',
      operacion: {
        dias_anticipacion: daysFromNow
      },
      origen: {
        nombre: 'Peru',
        codigo: 'PE',
        pais: 'Peru'
      },
      destino: {
        nombre: form.destinyString.descripcion_destino,
        codigo: form.destinyString.id_destino,
        pais: ''
      },
      pasajeros: {
        total: form.passengers.length,
        infantes: form.passengers.filter(p => Number(p.edad) <= 5).length,
        ninos: form.passengers.filter(p => Number(p.edad) > 5 && Number(p.edad) < 18).length,
        adultos: form.passengers.filter(p => Number(p.edad) >= 18).length
      },
      fechas: {
        salida: moment(form.fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        retorno: moment(form.toDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        estadia: Number(this.diffDays())
      }
    };

    TaggingService.tagSearchTravelInsurance(model);
  }

  quoteNow() {
    const { arrivalDate, departureDate } = this.childDates.getValuesByHotel();
    this.fromDate = departureDate;
    this.toDate = arrivalDate;

    
    if (this.validForm()) {
      let startDate = `${this.fromDate!.day}/${this.fromDate!.month}/${this.fromDate!.year}`;
      let endDate = `${this.toDate!.day}/${this.toDate!.month}/${this.toDate!.year}`;
      this.insuranceQuoteForm.addControl('ClienteCotizacion', new FormControl(this.ClienteCotizacion))
      this.insuranceQuoteForm.addControl('countCustomers', new FormControl(this.ClienteCotizacion.length))
      this.insuranceQuoteForm.addControl('Edades', new FormControl(this.ageCustomers))
      this.insuranceQuoteForm.addControl('fromDate', new FormControl(startDate))
      this.insuranceQuoteForm.addControl('toDate', new FormControl(endDate))
      this.insuranceQuoteForm.removeControl('days')
      this.insuranceQuoteForm.addControl('days', new FormControl(this.diffDays()))
      this.insuranceQuoteForm.removeControl('destinyString')
      this.insuranceQuoteForm.addControl('destinyString', new FormControl(this.destinyString()))
      //validacion fecha de nacimiento ▼
      this.insuranceQuoteForm.addControl('aniosNacimiento', new FormControl(this.anios))

      for (let i in this.insuranceQuoteForm.controls['passengers'].value) {
        let age = Number(this.insuranceQuoteForm.controls['passengers'].value[i].edad);
        this.insuranceQuoteForm.controls['passengers'].value[i].fechaNacimiento = moment().subtract(age, 'years').format('DD/MM/YYYY');
      }

      let form = this.insuranceQuoteForm.value;
      localStorage.removeItem('Datasafe');

      this.insertTag(form);

      localStorage.setItem('Datasafe', JSON.stringify(form));

      const filters = {
        destination: this.insuranceQuoteForm.getRawValue()['destinoSafe'],
        fromDate: startDate,
        toDate: endDate,
        passengers: this.insuranceQuoteForm.getRawValue()['passengers']
      };

      localStorage.setItem('filters', JSON.stringify(filters));

      this._router.navigateByUrl('/seguros', { skipLocationChange: true }).then(() =>
        this._router.navigate(["/seguros/planes"]));
    }
  }

  destinyString() {
    for (const i of this.options) {
      if (String(i.ref_assistcard) === this.destino.nativeElement.value)
        return i;
    }
  }

  diffDays() {
    const FeIni = this.fromDate!.month + '/' + this.fromDate!.day + '/' + this.fromDate!.year;
    const FeFin = this.toDate!.month + '/' + this.toDate!.day + '/' + this.toDate!.year;
    const date1 = new Date(FeIni)
    const date2 = new Date(FeFin)
    const diff = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    return String(diffDays);
  }

  count(valor: number, e: any) {
    let customer: any;
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

    let inputvalue = Number(customer.value)
    inputvalue = inputvalue + valor
    this.renderer.setAttribute(customer, 'value', String(inputvalue))
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

  @ViewChild('tagSecure') miDiv: ElementRef;
	@HostListener('document:click', ['$event'])
  blurTagSafe(event: MouseEvent) {
    
		// if (this.miDiv && !this.miDiv.nativeElement.contains(event.target)) {
		// 	// this.showPassengerBox=false;
		// }
	}

}
