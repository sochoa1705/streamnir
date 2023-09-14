import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { IntermediaryService } from 'src/app/Services/intermediary.service';
const I18N_VALUES = {
  weekdays: ['DO','LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
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
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.scss']
})
export class InputRangeComponent implements OnInit {
  calendarMonths: any[] = [];
  departureDate: any = null;
  arrivalDate: any = null;
  inside: boolean = false;
  countOutside: number = 0;
  @Output() inputDates = new EventEmitter<any>();


  ngOnInit(): void {
    /*const fechaActual = moment();
    const diasDelMesActual = [];
    const diasEnElMesActual = fechaActual.daysInMonth();

    for (let i = 1; i <= diasEnElMesActual; i++) {
      const dia = fechaActual.date(i);
      diasDelMesActual.push({
        numero: i,
        diaSemana: dia.format('dddd'), // Obtén el nombre del día de la semana
      });
    }

    console.log(diasDelMesActual,'see')*/
  }

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate;
	toDate: NgbDate | null = null;

	constructor(calendar: NgbCalendar) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}



}
