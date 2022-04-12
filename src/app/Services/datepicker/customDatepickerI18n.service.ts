import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES:any = {
  'es': {
    weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18nService extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super()
  }
    getWeekdayLabel(weekday: number): string { return I18N_VALUES[this._i18n.language].weekdays[weekday - 1]; }
    getWeekLabel(): string { return I18N_VALUES[this._i18n.language].weekLabel; }
    getMonthShortName(month: number): string { return I18N_VALUES[this._i18n.language].months[month - 1]; }
    getMonthFullName(month: number): string { return this.getMonthShortName(month); }
    getDayAriaLabel(date: NgbDateStruct): string { return `${date.day}-${date.month}-${date.year}`; }
}