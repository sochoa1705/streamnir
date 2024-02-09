import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../global';

@Component({
	selector: 'app-input-range',
	templateUrl: './input-range.component.html',
	styleUrls: ['./input-range.component.scss']
})
export class InputRangeComponent implements OnChanges,OnInit {
	now = new Date();
	@Output() inputDates = new EventEmitter<any>();
	@Output() openDatepicker = new EventEmitter<boolean>();
	@Input() typeFlight = 0; // si es -1 => vuelo + hotel
	@Input() idRowMulti = 0;
	@Input() minDate: NgbDateStruct = {
		year: this.now.getFullYear(),
		month: this.now.getMonth() + 1,
		day: this.now.getDate()
	};
	@Input() fromDate: NgbDate | null = null;
	@Input() toDate: NgbDate | null = null;

	showCalendar = false;
	dateDeparture = '';
	dateReturn = '';

	hoveredDate: NgbDate | null = null;

	fromDateSeleted: NgbDate | null = null;
	toDateSeleted: NgbDate | null = null;

	selectedDateOneWay: NgbDateStruct;
	dateOneWay: { year: number; month: number };
	disabledPrevMonth = true;

	maxDateRange:NgbDateStruct;

	isOpenMobile=false;

	@ViewChild('dp2') dp2: NgbDatepicker;

	constructor(
		public calendar: NgbCalendar,
		private _modalService: NgbModal
	) {
		const today = this.calendar.getToday();
		this.dateOneWay = { year: today.year, month: today.month };
	}
	ngOnInit(): void {
		document.documentElement.style.setProperty('--visibility', this.typeFlight == 2 || this.typeFlight == 1 ? 'none' : 'block');
		if (window.location.href.includes('resultados')) {
			const dataSearch = GlobalComponent.searchData;
			if (dataSearch.flightType !== 2 && this.typeFlight!==-1 && this.idRowMulti==0) {
				if (dataSearch.departureDate) this.setParamDeparture(dataSearch.departureDate)
				if (dataSearch.arrivalDate) this.setParamArrival(dataSearch.arrivalDate)
			}
			if (dataSearch.multicity && this.typeFlight!==-1) {
				const dateDeparture=dataSearch.multicity[this.idRowMulti].departureDate;
				if(dateDeparture) this.setParamDeparture(dateDeparture);
			}
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['typeFlight'].currentValue == 0 || changes['typeFlight'].currentValue == -1) {
			this.showCalendar = false;
			document.documentElement.style.setProperty('--visibility', 'block');
		}

		if (changes['typeFlight'].currentValue == 1) {
			document.documentElement.style.setProperty('--visibility', 'none');
			this.showCalendar = false;
			this.setDateOneWay();
		}

		if (changes['fromDate']?.currentValue !== null && changes['toDate']?.currentValue !== null) {
			this.applyRange();
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

		if(this.fromDate){
			const sumMonth=this.fromDate.month + 6;
			const year = sumMonth >= 12 ? this.fromDate.year + 1 : this.fromDate.year;
			const month = sumMonth >= 12 ? sumMonth - 12 : this.fromDate.month + 6;
			this.maxDateRange={
				year,
				month,
				day:this.fromDate.day
			}
		}
	}

	changeMonth(month: number) {
		//12-10-2023
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
		this.isOpenMobile=true;
		this.openDatepicker.emit(this.showCalendar)
		if (this.showCalendar) {
			this.fromDate = this.fromDateSeleted;
			this.toDate = this.toDateSeleted;
		}
	}

	openCalendarModal(content: TemplateRef<any>){
		this._modalService.open(content, {
			centered: true,
			windowClass:'modal-datepicker'
		})
	}

	applyRange() {
		this.showCalendar = false;
		this.dateDeparture = this.fromDate ? this.convertDateToString(this.fromDate) : '';
		this.dateReturn = this.toDate ? this.convertDateToString(this.toDate) : '';
		this.fromDateSeleted = this.fromDate;
		this.toDateSeleted = this.toDate;
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
		this.openDatepicker.emit(false)
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

	resetDateMulti() {
		this.fromDate = null;
		this.fromDateSeleted = null;
		this.dateDeparture = '';
	}

	setParamDeparture(departureDate: string) {
		const dateDep = departureDate?.split('-');
		this.fromDate = new NgbDate(Number(dateDep[0]), Number(dateDep[1]), Number(dateDep[2]));
		this.dateDeparture = this.convertDateToString(this.fromDate);
		this.fromDateSeleted = this.fromDate;
		this.setDateOneWay();
	}

	setParamArrival(arrivalDate: string) {
		const dateRet = arrivalDate?.split('-');
		this.toDate = new NgbDate(Number(dateRet[0]), Number(dateRet[1]), Number(dateRet[2]));
		this.dateReturn = this.convertDateToString(this.toDate);
		this.toDateSeleted = this.toDate;
	}

	setDateOneWay(){
		if(this.fromDate){
			this.selectedDateOneWay = new NgbDate(this.fromDate.year, this.fromDate.month, this.fromDate.day);
		    this.dateOneWay = { year: this.selectedDateOneWay.year, month: this.selectedDateOneWay.month };
		}
	}

	getValues() {
		return {
			arrivalDate: this.typeFlight==1 ? '' : this.dateReturn,
			departureDate: this.dateDeparture
		};
	}

	getValuesByHotel() {
		return {
			arrivalDate: this.toDate,
			departureDate: this.fromDate
		};
	}

	@ViewChild('calendar') miDiv: ElementRef;
	@HostListener('document:click', ['$event'])
	blurRange(event: MouseEvent) {
		if (this.miDiv && !this.miDiv.nativeElement.contains(event.target) && this.showCalendar) {
			this.showCalendar=false;
			this.openDatepicker.emit(false);
		}
	}
}
