import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { IntermediaryService } from '../../../Services/intermediary.service';

const I18N_VALUES = {
  weekdays: ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do'],
  monthLong: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
};

@Component({
  selector: 'app-calendar-price',
  templateUrl: './calendar-price.component.html',
  styleUrls: ['./calendar-price.component.scss']
})
export class CalendarPriceComponent implements OnInit {

  @Input() flightData: any;
  @Output() inputDates = new EventEmitter<any>();

  calendarMonths: any[] = [];
  departureDate: any = null;
  arrivalDate: any = null;

  constructor(private searchService: DestinyService, private intermediaryService: IntermediaryService) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.intermediaryService.$getObjectCalendarPriceSource.subscribe(res => {
      if(res) {
        this.chargeCalendarPrice();
      }
    });
  }

  chargeCalendarPrice(){
    let firstMonth = new Date();
    if (this.flightData.departureDate == '' && this.flightData.arrivalDate == '') {
      let currentDate = new Date();
      firstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    } else
      firstMonth = new Date(this.flightData.departureDate.split('/')[2], Number.parseInt(this.flightData.departureDate.split('/')[1]) - 1, 1);

    this.calendarMonths.push(this.getCalendar(firstMonth));
    this.calendarMonths.push(this.getCalendar(new Date(firstMonth.setMonth(firstMonth.getMonth() + 1))));

    if (this.flightData.departureDate != '') {
      this.departureDate = {
        day: this.flightData.departureDate.split('/')[0],
        date: this.flightData.departureDate,
        formatYMD: this.flightData.departureDate.split('/')[2] + this.flightData.departureDate.split('/')[1] + this.flightData.departureDate.split('/')[0],
        price: '-',
      };

      if (this.flightData.arrivalDate != '') {
        this.arrivalDate = {
          day: this.flightData.arrivalDate.split('/')[0],
          date: this.flightData.arrivalDate,
          formatYMD: this.flightData.arrivalDate.split('/')[2] + this.flightData.arrivalDate.split('/')[1] + this.flightData.arrivalDate.split('/')[0],
          price: '-',
        };
      }
      
      this.getTarifas(this.departureDate);
    } else {
      this.departureDate = null;
      this.arrivalDate = null;
    }
  }

  getCalendar(currentDate: Date) {
    let calendar: any[] = [];

    let month = Number.parseInt(moment(currentDate).format('MM'));
    let year = Number.parseInt(moment(currentDate).format('YYYY'));
    let daysinMonth = new Date(year, month, 0).getDate();

    let firstDayWeek = Number.parseInt(this.getWeekYear(new Date(year, currentDate.getMonth(), 1)));
    let lastDayWeek = Number.parseInt(this.getWeekYear(new Date(year, currentDate.getMonth(), daysinMonth)));
    let totalWeeks = lastDayWeek - (month == 1 && firstDayWeek > 1 ? 0 : firstDayWeek);

    let firstDay = this.getDayWeek(new Date(year, currentDate.getMonth(), 1));
    let indexFirst = I18N_VALUES.weekdays.findIndex((el: any) => { return el == firstDay });
    let lastDay = this.getDayWeek(new Date(year, currentDate.getMonth(), daysinMonth));
    let indexLast = I18N_VALUES.weekdays.findIndex((el: any) => { return el == lastDay });

    let calendarDate = new Date(year, currentDate.getMonth(), 1);
    for (let i = 0; i <= totalWeeks; i++) {
      let week: any[] = [];
      for (let y = 0; y < 7; y++) {
        if (i == 0) {
          if (y < indexFirst)
            week.push({
              day: '',
              date: '',
              formatYMD: '',
              price: '-',
            });
          if (y == indexFirst) {
            week.push({
              day: moment(calendarDate).format('DD'),
              date: moment(calendarDate).format('DD/MM/YYYY'),
              formatYMD: moment(calendarDate).format('YYYYMMDD'),
              price: '-',
            });
            calendarDate.setDate(calendarDate.getDate() + 1);
          }
          if (y > indexFirst) {
            week.push({
              day: moment(calendarDate).format('DD'),
              date: moment(calendarDate).format('DD/MM/YYYY'),
              formatYMD: moment(calendarDate).format('YYYYMMDD'),
              price: '-',
            });
            calendarDate.setDate(calendarDate.getDate() + 1);
          }
        }

        if (i > 0 && i < totalWeeks) {
          week.push({
            day: moment(calendarDate).format('DD'),
            date: moment(calendarDate).format('DD/MM/YYYY'),
            formatYMD: moment(calendarDate).format('YYYYMMDD'),
            price: '-',
          });
          calendarDate.setDate(calendarDate.getDate() + 1);
        }

        if (i == totalWeeks) {
          if (y < indexLast) {
            week.push({
              day: moment(calendarDate).format('DD'),
              date: moment(calendarDate).format('DD/MM/YYYY'),
              formatYMD: moment(calendarDate).format('YYYYMMDD'),
              price: '-',
            });
            calendarDate.setDate(calendarDate.getDate() + 1);
          }
          if (y == indexLast) {
            week.push({
              day: moment(calendarDate).format('DD'),
              date: moment(calendarDate).format('DD/MM/YYYY'),
              formatYMD: moment(calendarDate).format('YYYYMMDD'),
              price: '-',
            });
            calendarDate.setDate(calendarDate.getDate() + 1);
          }
          if (y > indexLast)
            week.push({
              day: '',
              date: '',
              formatYMD: '',
              price: '-',
            });
        }
      }
      calendar.push(week);
    }

    return {
      month: moment(currentDate).format('MM'),
      monthLetters: moment(currentDate).format('MMMM').toUpperCase(),
      year: year.toString(),
      calendar: calendar
    };
  }

  getDayWeek(date: Date) {
    return moment(date).format('dd');
  }

  getWeekYear(date: Date) {
    return moment(date).format('w');
  }

  previousMonth(calendarMonth: any) {
    let currentDate = new Date();
    let format = Number.parseInt(moment(currentDate).format('YYYYMM'));
    let formatCalendar = Number.parseInt(calendarMonth.year + calendarMonth.month);

    if (format < formatCalendar) {
      let date = new Date(Number.parseInt(calendarMonth.year), Number.parseInt(calendarMonth.month) - 1, 1);
      let firstMonth = new Date(date.setMonth(date.getMonth() - 1));
      let secondMonth = new Date(Number.parseInt(calendarMonth.year), Number.parseInt(calendarMonth.month) - 1, 1);

      let newCalendar: any[] = [];
      newCalendar.push(this.getCalendar(firstMonth));
      newCalendar.push(this.getCalendar(secondMonth));

      this.calendarMonths = newCalendar;

      if (this.departureDate != null)
        this.getTarifas(this.departureDate);
    }
  }

  nextMonth(calendarMonth: any) {
    let date = new Date(Number.parseInt(calendarMonth.year), Number.parseInt(calendarMonth.month) - 1, 1);
    let firstMonth = new Date(Number.parseInt(calendarMonth.year), Number.parseInt(calendarMonth.month) - 1, 1);
    let secondMonth = new Date(date.setMonth(date.getMonth() + 1));

    let newCalendar: any[] = [];
    newCalendar.push(this.getCalendar(firstMonth));
    newCalendar.push(this.getCalendar(secondMonth));

    this.calendarMonths = newCalendar;

    if (this.departureDate != null)
      this.getTarifas(this.departureDate);
  }

  selectDate(item: any) {
    let currentDate = new Date();
    let currentFormat = moment(currentDate).format('YYYYMMDD');

    if (item.day != '' && Number.parseInt(item.formatYMD) >= Number.parseInt(currentFormat)) {
      if (this.departureDate == null || this.arrivalDate != null) {
        this.arrivalDate = null;
        this.departureDate = item;

        this.getTarifas(item);
      } else {
        let departure = Number.parseInt(this.departureDate.formatYMD);
        let arrival = Number.parseInt(item.formatYMD);

        if (arrival > departure)
          this.arrivalDate = item;
      }
    }
  }

  getTarifas(item: any) {
    let daysinMonth = new Date(Number.parseInt(this.calendarMonths[1].year), Number.parseInt(this.calendarMonths[1].month), 0).getDate();
    let fecFin = this.calendarMonths[1].year + this.calendarMonths[1].month + daysinMonth;

    let requestRate = {
      fecIni: '',
      fecFin: '',
      fecDep: item.formatYMD,
      fecRet: item.formatYMD,
      tipoDur: 'V',
      diasDur: '0',
      origen: this.flightData.departureCity?.substring(0, 3),
      destino: this.flightData.arrivalCity?.substring(0, 3),
      itiTipo: this.flightData.flightType == 0 ? 'RT' : 'OW',
      clase: 'Y',
      adts: 1,
      chs: 0,
      infs: 0,
    };

    this.searchService.getRates(requestRate, item.formatYMD, fecFin).subscribe({
      next: (response) => {
        let date: string = item.formatYMD;
        let detalle = response[0].detalle;
        let rateCurrent = detalle.filter((item: any) => { return item.diadep == date });

        this.calendarMonths.forEach((month: any) => {
          month.calendar.forEach((week: any) => {
            week.forEach((day: any) => {
              let diaret: string = day.formatYMD;
              if (rateCurrent.filter((item: any) => { return item.diaret == diaret }).length > 0)
                day.price = '$' + rateCurrent.filter((item: any) => { return item.diaret == diaret })[0].neto.split('.')[0];
              else
                day.price = '-';
            });
          });
        });
      }
    });
  }

  disableDate(item: any) {
    let currentDate = new Date();
    let currentFormat = moment(currentDate).format('YYYYMMDD');

    return Number.parseInt(item.formatYMD) < Number.parseInt(currentFormat)
  }

  departureActive(item: any) {
    return this.departureDate?.date == item.date;
  }

  arrivalActive(item: any) {
    return this.arrivalDate?.date == item.date;
  }

  rangeActive(item: any) {
    if (this.arrivalDate != null) {
      let departure: Number = this.departureDate.formatYMD;
      let arrival: Number = this.arrivalDate.formatYMD;
      let currentDate: Number = item.formatYMD;

      return departure < currentDate && currentDate < arrival;
    }

    return false;
  }

  selectDateTravel() {
    let departure = this.departureDate == undefined ? null : this.departureDate;
    let arrival = this.arrivalDate == undefined ? null : this.arrivalDate;
    this.inputDates.emit({ departure: departure, arrival: arrival });
  }
}
