import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-new-calendar',
	templateUrl: './new-calendar.component.html',
	styleUrls: ['../input-range/input-range.component.scss']
})
export class NewCalendarComponent implements OnInit {
	now = new Date();
	constructor(public calendar: NgbCalendar) {
		const today = this.calendar.getToday();
		this.dateOneWay = { year: today.year, month: today.month };
	}
	minDate: NgbDateStruct = {
		year: this.now.getFullYear(),
		month: this.now.getMonth() + 1,
		day: this.now.getDate()
	};

	showCalendar = false;
	dateDeparture = '';
	dateReturn = '';
	selectedDateOneWay: NgbDateStruct;
	dateOneWay: { year: number; month: number };
	disabledPrevMonth = true;

	fromDate: NgbDate | null = null;
	fromDateSeleted: NgbDate | null = null;
	nameCurrentMonth = 'Enero';

	@ViewChild('dp2') dp2: NgbDatepicker;
	@Input() placeholder='Salida';

	ngOnInit(): void {
		this.setNameMonth(this.now.getMonth() + 1);
		document.documentElement.style.setProperty('--visibility', 'none');
	}

	changeMonth(month: number) {
		const currentDate = new Date();
		const newDate = { year: this.dateOneWay.year, month: this.dateOneWay.month + month };
		if (
			newDate.year < currentDate.getFullYear() ||
			(newDate.year === currentDate.getFullYear() && newDate.month < currentDate.getMonth() + 1)
		)
			this.disabledPrevMonth = true;
		else {
			this.disabledPrevMonth = false;
			if (this.dateOneWay.month === 12 && month === 1) this.dateOneWay = { year: this.dateOneWay.year + 1, month: 1 };
			else if (this.dateOneWay.month === 1 && month === -1)
				this.dateOneWay = { year: this.dateOneWay.year - 1, month: 12 };
			else this.dateOneWay = { year: this.dateOneWay.year, month: this.dateOneWay.month + month };
			this.dp2.navigateTo({ year: this.dateOneWay.year, month: this.dateOneWay.month });
		}

		this.setNameMonth(this.dateOneWay.month);
	}

	openCalendar(isClose = false) {
		this.showCalendar = isClose ? false : !this.showCalendar;
		if (this.showCalendar) {
			this.fromDate = this.fromDateSeleted;
		}
	}

	applyDate() {
		this.showCalendar = false;
		if (this.selectedDateOneWay) {
			const split = this.selectedDateOneWay.toString().split('-');
			const dateFormat = new NgbDate(parseInt(split[2], 10), parseInt(split[1], 10), parseInt(split[0], 10));
			this.fromDate = dateFormat;
			this.fromDateSeleted = this.fromDate;
			this.dateDeparture = this.convertDateToString(dateFormat);
		}
	}

	convertDateToString(date: NgbDate) {
		return `${this.formatNumber(date.day)}/${this.formatNumber(date.month)}/${date.year}`;
	}

	formatNumber(numberDate: number) {
		if (numberDate < 10) return `0${numberDate}`;
		return numberDate;
	}

	setNameMonth(monthNumber: number) {
		const months = [
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
			'Diciembre'
		];

		if (monthNumber >= 1 && monthNumber <= 12) {
			this.nameCurrentMonth = months[monthNumber - 1];
		}
	}

	getValues() {
		return this.fromDateSeleted;
	}
}
