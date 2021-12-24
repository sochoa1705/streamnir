import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

export class  ClassValueCalendar{
    constructor(
      public toDate:NgbDate| null,
      public fromDate:NgbDate| null
    ){}
  }