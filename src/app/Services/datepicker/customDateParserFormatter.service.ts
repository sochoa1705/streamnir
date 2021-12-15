import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DT_FORMAT = 'DD/MM/YYYY';


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
      console.log(date);
    if (!date) return '';
    let mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid()) return '';
    return mdt.format(this.DT_FORMAT);

    // return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}