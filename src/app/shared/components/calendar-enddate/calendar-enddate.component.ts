import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { EnumFlightType } from '../tabs/tabs.models';
import { ClassValueCalendar } from '../calendar/calendar.models';
import { PopupService } from '../../../Services/pop-up/popup.service';


@Component({
  selector: 'app-calendar-enddate',
  templateUrl: './calendar-enddate.component.html',
  styleUrls: ['./calendar-enddate.component.scss'],

})
export class CalendarEndDateComponent implements AfterViewInit, OnInit{

  @Input() toDate: NgbDate | null;
  @Input() fromDate: NgbDate | null;
  @Input() dateLimit: NgbDate | null;

  @Input() typeValue: number = EnumFlightType.ida_vuelta;
  @Input() placeHolder: string = 'Salida';

  @Input() requiredToDate: boolean ;
  @Input() requiredFromDate: boolean ;

  EnumFlightType = EnumFlightType;

  hoveredDate: NgbDate | null = null;

  @Input() minDate:NgbDate;
  maxDate:NgbDate;

  @Output() changeDate = new EventEmitter<ClassValueCalendar>()


  constructor(private calendar: NgbCalendar,public formatter: NgbDateParserFormatter,private cdRef:ChangeDetectorRef, private _changePopupService: PopupService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){

    if(!this.fromDate && !this.toDate){
      // this.fromDate = this.calendar.getToday();
      // this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    }
    this.minDate = this.dateLimit || this.calendar.getToday();

    const value = new ClassValueCalendar(this.toDate,this.fromDate);
    this.changeDate.emit(value);
    this.cdRef.detectChanges();
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
      const value = new ClassValueCalendar(this.toDate,this.fromDate);

      this.changeDate.emit(value);
      console.log('changes ');
    }

    onDateSelectionIda(date: NgbDate) {
      this.toDate = null;
      this.fromDate = date;
      const value = new ClassValueCalendar(this.toDate,this.fromDate);
      this.changeDate.emit(value);
      console.log('changes ');
    }

    emitValue(){
      this.changeDate.emit( new ClassValueCalendar(this.toDate,this.fromDate) )
    }
  
    isHovered(date: NgbDate) {
      return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }
  
    
    isRange(date: NgbDate) {
      return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }
  
    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
      // this.changeDate.emit(value);
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }
  
    isInside(date: NgbDate) {
      return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    validLength(){
      console.log('e ', document.getElementById('txtInitDate')?.textContent);
    }

}
