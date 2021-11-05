import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    public route: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
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
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      clase: new FormControl('economy')
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

}
