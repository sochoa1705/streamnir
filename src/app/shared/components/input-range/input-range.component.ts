import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.scss']
})
export class InputRangeComponent implements OnInit {

  @Output() inputDates = new EventEmitter<any>();
  @Input() typeFlight = 0;
  
  showCalendar=false;
  now = new Date();
  minDate: NgbDateStruct = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
  dateDeparture=''
  dateReturn=''

  ngOnInit(): void {
  }

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null = null;
	toDate: NgbDate | null = null;

	fromDateSeleted: NgbDate | null = null;
	toDateSeleted: NgbDate | null = null;

	constructor(calendar: NgbCalendar) {
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

	openCalendar(isClose=false){
		this.showCalendar= isClose ? false : !this.showCalendar;
		if(this.showCalendar){
			this.fromDate=this.fromDateSeleted;
			this.toDate=this.toDateSeleted;
		}
	}

	applyRange(){
		this.showCalendar=false;
		this.dateDeparture=this.fromDate ? this.convertDateToString(this.fromDate) : '';
		this.dateReturn= this.toDate ?  this.convertDateToString(this.toDate) : '';
		this.fromDateSeleted=this.fromDate;
		this.toDateSeleted=this.toDate;
	}

	convertDateToString(date:NgbDate){
		return `${this.formatNumber(date.day)}/${this.formatNumber(date.month)}/${date.year}`
	}

	formatNumber(numberDate:number){
		if(numberDate < 10) return `0${numberDate}`
		return numberDate
	}
}
