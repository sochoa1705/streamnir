import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

interface CustomDate {
	year: number;
	month: number;
	day: number;
	monthName: string;
}
@Component({
	selector: 'app-input-range',
	templateUrl: './input-range.component.html',
	styleUrls: ['./input-range.component.scss']
})
export class InputRangeComponent implements OnChanges {
	@Output() inputDates = new EventEmitter<any>();
	@Input() typeFlight = 0;

	showCalendar = false;
	now = new Date();
	minDate: NgbDateStruct = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
	dateDeparture = '';
	dateReturn = '';

	hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null = null;
	toDate: NgbDate | null = null;

	fromDateSeleted: NgbDate | null = null;
	toDateSeleted: NgbDate | null = null;

	selectedDateOneWay: NgbDateStruct;
	dateOneWay: { year: number; month: number };
	disabledPrevMonth=true;

	@ViewChild('dp2') dp2: NgbDatepicker;

	constructor(public calendar: NgbCalendar) {
		const today = this.calendar.getToday();
		this.dateOneWay = { year: today.year, month: today.month };
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['typeFlight'].currentValue == 0) {
			this.showCalendar=false;
			document.documentElement.style.setProperty('--visibility', 'block');
		}

		if (changes['typeFlight'].currentValue == 1 || changes['typeFlight'].currentValue == 2) {
			this.showCalendar=false;
			this.toDate = null;
			this.dateReturn = '';
			this.toDateSeleted = null;
			if(this.fromDate) {
				this.selectedDateOneWay = new NgbDate(this.fromDate.year, this.fromDate.month, this.fromDate.day);
				this.dateOneWay = { year: this.selectedDateOneWay.year, month: this.selectedDateOneWay.month };
				//this.dp2.navigateTo({ ... })
			}
			document.documentElement.style.setProperty('--visibility', 'none');
		}
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

	changeMonth(month: number) { //12-10-2023
		const currentDate = new Date();
		const newDate = { year: this.dateOneWay.year, month: this.dateOneWay.month + month };
		if (newDate.year < currentDate.getFullYear() || (newDate.year === currentDate.getFullYear() && newDate.month < currentDate.getMonth() + 1))
		    this.disabledPrevMonth=true; 
		else{
			this.disabledPrevMonth=false;
			if (this.dateOneWay.month === 12 && month === 1) this.dateOneWay = { year: this.dateOneWay.year + 1, month: 1 };
			else if (this.dateOneWay.month === 1 && month === -1) this.dateOneWay = { year: this.dateOneWay.year - 1, month: 12 };
			else this.dateOneWay = { year: this.dateOneWay.year, month: this.dateOneWay.month + month };
			this.dp2.navigateTo({ year: this.dateOneWay.year, month: this.dateOneWay.month });
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

	openCalendar(isClose = false) {
		this.showCalendar = isClose ? false : !this.showCalendar;
		if (this.showCalendar) {
			this.fromDate = this.fromDateSeleted;
			this.toDate = this.toDateSeleted;
		}
	}

	applyRange() {
		this.showCalendar = false;
		this.dateDeparture = this.fromDate ? this.convertDateToString(this.fromDate) : '';
		this.dateReturn = this.toDate ? this.convertDateToString(this.toDate) : '';
		this.fromDateSeleted = this.fromDate;
		this.toDateSeleted = this.toDate;
	}

	applyDate(){
		this.showCalendar = false;
		if(this.selectedDateOneWay){
			const split = this.selectedDateOneWay.toString().split('-');
			const dateFormat=new NgbDate(parseInt(split[2], 10),parseInt(split[1], 10),parseInt(split[0], 10));
			this.fromDate=dateFormat;
			this.fromDateSeleted = this.fromDate;
			this.dateDeparture = this.convertDateToString(dateFormat);
		}
	}

	convertDateToString(date: NgbDate) {
		return `${this.formatNumber(date.day)}/${this.formatNumber(date.month)}/${date.year}`;
	}

	convertDateToParam(date: string) {
		if (date !== '') {
			const arrayDate = date.split('/');
			return arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0];
		}
		return date;
	}

	formatNumber(numberDate: number) {
		if (numberDate < 10) return `0${numberDate}`;
		return numberDate;
	}

	getValues() {
		return {
			arrivalDate: this.dateReturn,
			departureDate: this.dateDeparture
		};
	}
}
