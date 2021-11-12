import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from '../../../Services/destiny/destiny.service';

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
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class TabsComponent implements OnInit {
  form!: FormGroup;
  selected = 'option1';
  model!: NgbDateStruct;
  stateCtrl = new FormControl();
  stateCtrl2 = new FormControl();
  dpFromDate: any;
  dpToDate: any;

  dpFromDate2: any;
  dpToDate2: any;

  dpFromDate3: any;
  dpToDate3: any;
  dpFromDate4: any;
  dpToDate4: any;
  // fechaInicial : NgbDate | undefined;
  // FechaFinal : NgbDate | undefined;
  diffInDays: number | undefined

  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ];

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null
  fromDate2: NgbDate | null
  fromDate3: NgbDate | null
  fromDate4: NgbDate | null
  toDate: NgbDate | null;

  citys: Array<any> = [];
  citysOrigenSelect: Array<any> = [];
  citysDestinosSelect: Array<any> = [];
  origen: any;
  destino: any;

  habitacion = 1;
  adultos = 0;
  ninos = 0;
  infantes = 0;
  validPasajeros = false;

  @ViewChild('inputOrigen', { static: false }) inputOrigen!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDestino', { static: false }) inputDestino!: ElementRef<HTMLInputElement>;

  constructor(
    public route: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private destineService: DestinyService
  ) {
    this.fromDate = calendar.getToday();
    this.fromDate2 = calendar.getToday();
    this.fromDate3 = calendar.getToday();
    this.fromDate4 = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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
    debugger;
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  showOption: Boolean = true;
  showPasajero() {
    this.showOption = this.showOption ? false : true;
  }

  showOption2: Boolean = true;
  showPasajero2() {
    this.showOption2 = this.showOption2 ? false : true;
  }

  showOption3: Boolean = true;
  showPasajero3() {
    this.showOption3 = this.showOption3 ? false : true;
  }

  showOption4: Boolean = true;
  showPasajero4() {
    this.showOption4 = this.showOption4 ? false : true;
  }
  ngOnInit(): void {
    this.createForm();
    this.getDestinyOrigin();
  }

  private getDestinyOrigin(){
    this.destineService.getDestinyPaqueteDinamico('truji').subscribe(res => {
      console.log('res ', res);
    });
  }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl('economy'),
      origen: new FormControl(),
      destino: new FormControl(''),
      range: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    })
  }

  count(valor: number, e: any) {
    let item = e.target.name;
    let pasajero = this.pasajeros[0][item];
    if (pasajero >= 100 && valor >= 0) {
      return pasajero = 100
    }
    if (pasajero <= 0 && valor < 0) {
      return pasajero = 0
    }
    return pasajero = pasajero + valor
  }

  // customers() {
  //   var cdr: any = document.getElementById('cdr');
  //   cdr.style = 'display:block'

  // }

  safeLink(e: any) {
    if (e.tab.textLabel === "seguros") {
      this.route.navigate(['/home/seguros'])
    }
  }

  autoComplete(e: any, type: number) {
    this.citys = [];
    console.log(e.target);
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;
    console.log(elemento);

    let value = elemento.value;
    if (value.length == 0) {
      elemento.classList.remove('auto');
    } else {
      elemento.classList.add('auto');
    }
    if (value.length >= 3) {
      this.getListCiudades(value, type);
    }
  }


  getListCiudades(e: any, type: number) {
    this.destineService.getDestinyPaqueteDinamico(e).subscribe(
      data => {
        console.log(data);
        this.citys = data;
        if(type === 1) {
          this.citysOrigenSelect = data;
        } else {
          this.citysDestinosSelect = data;
        }
      },
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }

  public calculateDistributionTravel(optionTravel: string, optionAddRemove: number): void {
    switch(optionTravel) {
      case 'habitacion' :
        //this.habitacion += this.habitacion === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
      case 'adultos' :
        this.adultos += this.adultos === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
      case 'ninos' :
        this.ninos += this.ninos === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
      case 'infantes' :
        this.infantes += this.infantes === 0 && optionAddRemove === 0 ? 0 : optionAddRemove === 1 ? 1 : -1;
        break;
    }
  }

  private getDistributionUrl(){
    let urlDistributon = this.adultos.toString();
    if(this.ninos > 0) {
      urlDistributon += `-${this.ninos}-`;
    } else {
      urlDistributon += "-0";
    }
    for(let i=0;i<this.ninos;i++) {
      urlDistributon += "10,"
    }
    urlDistributon = urlDistributon.charAt(urlDistributon.length - 1 ) === ',' ? urlDistributon.substring(0, urlDistributon.length - 1) : urlDistributon;
    return urlDistributon;
  }

  public searchVueloHotel(){
    console.log('value ', this.form);
    console.log('value fecha ' , this.fromDate, this.toDate);

    this.validPasajeros = this.adultos === 0;

    if(this.adultos > 0) {
      let tab = 'FLIGHT_HOTEL';

      let startDate = this.fromDate!.day + "/" + this.fromDate!.month + "/" + this.fromDate!.year;
      let endDate = this.toDate!.day + "/" + this.toDate!.month + "/" + this.toDate!.year;
      let origen = this.form.controls['origen'].value;
      let destino = this.form.controls['destino'].value;
      let businessClass = this.form.controls['clase'].value === 'business';
  
      let idOrigen = (this.citysOrigenSelect || []).find(item => item.label === origen).id;
      let idDestino = (this.citysDestinosSelect || []).find(item => item.label === destino).id;
  
      let distribution = this.getDistributionUrl();
  
      window.location.href = `https://nmviajes.paquetedinamico.com/home?directSubmit=true&tripType=${tab}&destination=${idDestino}&departure=${idOrigen}&departureDate=${startDate}&arrivalDate=${endDate}&distribution=${distribution}&businessCabin=${businessClass}&lang=ES`;
    }
  }
}
